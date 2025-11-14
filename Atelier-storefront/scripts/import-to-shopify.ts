/**
 * Script d'import des produits vers Shopify via Admin GraphQL API
 * Usage: npx tsx scripts/import-to-shopify.ts
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
// Essayer d'abord .env.local (standard Next.js), puis env.local
dotenv.config({ path: join(process.cwd(), '.env.local') })
dotenv.config({ path: join(process.cwd(), 'env.local') })

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const API_VERSION = '2025-10'

if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
  throw new Error('Variables d\'environnement manquantes: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN et SHOPIFY_ADMIN_API_TOKEN sont requis')
}

const ADMIN_API_ENDPOINT = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/graphql.json`
const ADMIN_REST_API_ENDPOINT = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}`

interface Product {
  id: number
  name: string
  price: number
  category: string
  gender?: "women" | "men" | "unisex"
  description: string
  images: string[]
  sizes: string[]
  details: string[]
}

interface ExportData {
  exportedAt: string
  totalProducts: number
  products: Product[]
}

interface ShopifyResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: string[]
  }>
  extensions?: any
}

/**
 * Lire une image depuis le dossier public et la convertir en base64
 * Retourne l'objet avec les données base64 et le nom du fichier
 */
async function prepareImageForShopify(imageUrl: string): Promise<{ attachment: string; filename: string } | null> {
  // Si l'image est déjà une URL complète, on ne peut pas la lire localement
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    console.log(`   ⚠️  Image URL externe ignorée: ${imageUrl}`)
    return null
  }

  // Nettoyer le chemin de l'image (enlever le / initial si présent)
  const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl
  
  // Construire le chemin complet vers le fichier dans public
  const imagePath = join(process.cwd(), 'public', cleanPath)

  // Vérifier si le fichier existe
  if (!existsSync(imagePath)) {
    console.log(`   ⚠️  Fichier image introuvable: ${imagePath}`)
    return null
  }

  try {
    // Lire le fichier en base64
    const imageData = readFileSync(imagePath, { encoding: 'base64' })
    
    // Extraire le nom du fichier depuis le chemin
    const filename = cleanPath.split('/').pop() || cleanPath

    return {
      attachment: imageData,
      filename: filename,
    }
  } catch (error) {
    console.error(`   ⚠️  Erreur lors de la lecture de l'image ${imagePath}:`, error)
    return null
  }
}

/**
 * Créer un produit dans Shopify (approche en plusieurs étapes)
 */
async function createProductInShopify(product: Product): Promise<string | null> {
  // Préparer les images depuis le dossier public
  const images = await Promise.all(
    product.images.map(async (img) => {
      return await prepareImageForShopify(img)
    })
  )

  const validImages = images.filter((img): img is { attachment: string; filename: string } => img !== null)

  // Les prix dans products.ts sont déjà en dollars, on les convertit en string
  const priceInDollars = product.price.toFixed(2)

  // Tags: category, gender, details
  const tags = [
    product.category,
    product.gender || 'unisex',
    ...product.details,
  ].filter(Boolean)

  // ÉTAPE 1: Créer le produit de base (sans options ni variantes)
  const createMutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const createVariables = {
    input: {
      title: product.name,
      descriptionHtml: product.description,
      productType: product.category,
      tags: tags,
      vendor: 'Atelier',
      status: 'ACTIVE',
    },
  }

  try {
    // ÉTAPE 1: Créer le produit de base
    const createResponse = await fetch(ADMIN_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({
        query: createMutation,
        variables: createVariables,
      }),
    })

    if (!createResponse.ok) {
      throw new Error(`HTTP error! status: ${createResponse.status}`)
    }

    const createResult: ShopifyResponse<{
      productCreate: {
        product: {
          id: string
          title: string
          handle: string
        } | null
        userErrors: Array<{
          field: string[]
          message: string
        }>
      }
    }> = await createResponse.json()

    if (createResult.errors) {
      console.error(`   ❌ Erreurs GraphQL:`, createResult.errors)
      return null
    }

    if (createResult.data?.productCreate.userErrors && createResult.data.productCreate.userErrors.length > 0) {
      console.error(`   ❌ Erreurs utilisateur:`, createResult.data.productCreate.userErrors)
      return null
    }

    const createdProduct = createResult.data?.productCreate.product
    if (!createdProduct) {
      console.error(`   ❌ Produit non créé`)
      return null
    }

    // Extraire l'ID numérique du produit depuis l'ID GraphQL (format: gid://shopify/Product/123456)
    const productGid = createdProduct.id
    const productIdMatch = productGid.match(/\d+$/)
    const productIdNumeric = productIdMatch ? productIdMatch[0] : null

    if (!productIdNumeric) {
      console.error(`   ❌ Impossible d'extraire l'ID numérique du produit`)
      return null
    }

    console.log(`   ✅ Produit créé: ${createdProduct.title}`)

    // ÉTAPE 2: Créer les variantes avec le prix via REST API test
    // Préparer les variantes selon le format REST API
    const variants = product.sizes.length > 0
      ? product.sizes.map((size) => ({
          title: size,
          price: priceInDollars,
          option1: size,
          sku: `${product.id}-${size}`,
        }))
      : [
          {
            title: 'Default Title',
            price: priceInDollars,
            sku: `${product.id}-DEFAULT`,
          },
        ]

    try {
      // Préparer les options du produit
      // NOTE: Actuellement, tous les produits n'ont que des variantes de taille (sizes)
      // Si vous ajoutez d'autres types de variantes (couleur, matériau, etc.) à l'avenir,
      // vous devrez :
      // 1. Ajouter les champs dans l'interface Product (ex: colors: string[])
      // 2. Adapter cette partie pour créer plusieurs options :
      //    const productOptions = []
      //    if (product.sizes.length > 0) {
      //      productOptions.push({ name: 'Size', values: product.sizes })
      //    }
      //    if (product.colors?.length > 0) {
      //      productOptions.push({ name: 'Color', values: product.colors })
      //    }
      // 3. Adapter la création des variants pour gérer option1, option2, etc.
      const productOptions = product.sizes.length > 0
        ? [
            {
              name: 'Size',
              values: product.sizes,
            },
          ]
        : []

      // Mettre à jour le produit avec les variantes et options via REST API
      const updateResponse = await fetch(`${ADMIN_REST_API_ENDPOINT}/products/${productIdNumeric}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMIN_TOKEN!,
        },
        body: JSON.stringify({
          product: {
            id: parseInt(productIdNumeric),
            options: productOptions,
            variants: variants,
          },
        }),
      })

      if (updateResponse.ok) {
        const updateResult = await updateResponse.json()
        if (updateResult.errors) {
          console.error(`   ⚠️  Erreur lors de la création des variantes:`, updateResult.errors)
        } else {
          const variantsCount = product.sizes.length > 0 ? product.sizes.length : 1
          console.log(`   ✅ ${variantsCount} variante(s) créée(s) avec prix ${priceInDollars}$`)
        }
      } else {
        const errorText = await updateResponse.text()
        console.error(`   ⚠️  Erreur HTTP ${updateResponse.status} lors de la création des variantes:`, errorText)
      }
    } catch (err) {
      console.error(`   ⚠️  Erreur lors de la création des variantes:`, err)
    }

    // ÉTAPE 3: Ajouter les images via REST API avec base64
    if (validImages.length > 0) {
      let uploadedImagesCount = 0
      for (const img of validImages) {
        try {
          const imageResponse = await fetch(
            `${ADMIN_REST_API_ENDPOINT}/products/${productIdNumeric}/images.json`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
              },
              body: JSON.stringify({
                image: {
                  attachment: img.attachment,
                  filename: img.filename,
                },
              }),
            }
          )

          if (imageResponse.ok) {
            uploadedImagesCount++
          } else {
            const errorText = await imageResponse.text()
            console.error(`   ⚠️  Erreur HTTP ${imageResponse.status} lors de l'upload de l'image ${img.filename}:`, errorText)
          }
        } catch (err) {
          console.error(`   ⚠️  Erreur lors de l'upload de l'image ${img.filename}:`, err)
        }
      }
      
      if (uploadedImagesCount > 0) {
        console.log(`   ✅ ${uploadedImagesCount}/${validImages.length} image(s) uploadée(s)`)
      }
    }

    return productGid
  } catch (error) {
    console.error(`   ❌ Erreur lors de la création du produit:`, error)
    return null
  }
}

/**
 * Fonction principale d'import
 */
async function importToShopify() {
  console.log('🚀 Début de l\'import vers Shopify...')
  console.log(`   Store: ${SHOP_DOMAIN}`)
  console.log(`   API Version: ${API_VERSION}\n`)

  // Lire le fichier d'export
  const exportPath = join(process.cwd(), 'data', 'products-export.json')
  
  let exportData: ExportData
  try {
    const fileContent = readFileSync(exportPath, 'utf-8')
    exportData = JSON.parse(fileContent)
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier d\'export:', error)
    console.error('   Assurez-vous d\'avoir exécuté export-products.ts d\'abord')
    process.exit(1)
  }

  console.log(`📦 ${exportData.totalProducts} produits à importer\n`)

  const results = {
    success: 0,
    failed: 0,
    productIds: [] as string[],
  }

  // Importer chaque produit
  for (let i = 0; i < exportData.products.length; i++) {
    const product = exportData.products[i]
    console.log(`[${i + 1}/${exportData.totalProducts}] Import: ${product.name}...`)

    const productId = await createProductInShopify(product)
    
    if (productId) {
      results.success++
      results.productIds.push(productId)
    } else {
      results.failed++
    }

    // Pause pour éviter de surcharger l'API
    if (i < exportData.products.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Résultats de l\'import:')
  console.log(`   ✅ Succès: ${results.success}`)
  console.log(`   ❌ Échecs: ${results.failed}`)
  console.log(`   📦 Total: ${exportData.totalProducts}`)
  console.log('='.repeat(50))

  // Sauvegarder les résultats
  const resultsPath = join(process.cwd(), 'data', 'import-results.json')
  writeFileSync(
    resultsPath,
    JSON.stringify(
      {
        importedAt: new Date().toISOString(),
        ...results,
      },
      null,
      2
    ),
    'utf-8'
  )
  console.log(`\n💾 Résultats sauvegardés dans: ${resultsPath}`)
}

// Exécuter si appelé directement
if (require.main === module) {
  importToShopify().catch((error) => {
    console.error('❌ Erreur fatale:', error)
    process.exit(1)
  })
}

export { importToShopify }

