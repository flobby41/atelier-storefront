/**
 * Script d'import des produits vers Shopify via Admin GraphQL API
 * Usage: npx tsx scripts/import-to-shopify.ts
 */

import { readFileSync, writeFileSync } from 'fs'
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
 * Préparer l'URL de l'image pour Shopify
 * Note: Pour une vraie migration, il faudrait uploader les images vers Shopify Files API
 * Pour l'instant, on utilise les URLs complètes si disponibles, sinon on laisse Shopify gérer
 */
async function prepareImageForShopify(imageUrl: string, baseUrl?: string): Promise<string | null> {
  // Si l'image est déjà une URL complète, on la retourne
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Si on a une baseUrl (ex: localhost:3000), on construit l'URL complète
  if (baseUrl) {
    const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
    return `${baseUrl}${cleanPath}`
  }

  // Sinon, on retourne l'URL relative
  // Shopify pourra essayer de télécharger l'image depuis cette URL
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
}

/**
 * Créer un produit dans Shopify (approche en plusieurs étapes)
 */
async function createProductInShopify(product: Product, baseUrl?: string): Promise<string | null> {
  // Préparer les images
  const images = await Promise.all(
    product.images.map(async (img) => {
      const url = await prepareImageForShopify(img, baseUrl)
      return url ? { src: url } : null
    })
  )

  const validImages = images.filter((img): img is { src: string } => img !== null)

  // Les prix dans products.ts sont en centimes, on les convertit en dollars
  const priceInDollars = (product.price / 100).toFixed(2)

  // Tags: category, gender, details
  const tags = [
    product.category,
    product.gender || 'unisex',
    ...product.details,
  ].filter(Boolean)

  // ÉTAPE 1: Créer le produit de base
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

    const productId = createdProduct.id
    console.log(`   ✅ Produit créé: ${createdProduct.title}`)

    // ÉTAPE 2: Ajouter les images si disponibles
    if (validImages.length > 0) {
      for (const img of validImages) {
        const imageMutation = `
          mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
            productCreateMedia(productId: $productId, media: $media) {
              media {
                id
              }
              mediaUserErrors {
                field
                message
              }
            }
          }
        `
        
        try {
          await fetch(ADMIN_API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': ADMIN_TOKEN!,
            },
            body: JSON.stringify({
              query: imageMutation,
              variables: {
                productId: productId,
                media: [{ originalSource: img.src }],
              },
            }),
          })
        } catch (err) {
          console.log(`   ⚠️  Erreur lors de l'ajout de l'image: ${img.src}`)
        }
      }
    }

    // ÉTAPE 3: Configurer les options et variantes
    if (product.sizes.length > 0) {
      // D'abord, mettre à jour le produit pour ajouter les options
      const updateProductMutation = `
        mutation productUpdate($input: ProductInput!) {
          productUpdate(input: $input) {
            product {
              id
              options {
                id
                name
                values
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      
      try {
        await fetch(ADMIN_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': ADMIN_TOKEN!,
          },
          body: JSON.stringify({
            query: updateProductMutation,
            variables: {
              input: {
                id: productId,
                options: [{ name: 'Size', values: product.sizes }],
              },
            },
          }),
        })
      } catch (err) {
        // Ignorer les erreurs
      }

      // Ensuite, récupérer les variantes existantes et créer les manquantes
      const getVariantsQuery = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            variants(first: 10) {
              edges {
                node {
                  id
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `

      const variantsResponse = await fetch(ADMIN_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMIN_TOKEN!,
        },
        body: JSON.stringify({
          query: getVariantsQuery,
          variables: { id: productId },
        }),
      })

      if (variantsResponse.ok) {
        const variantsData = await variantsResponse.json()
        const existingVariants = variantsData.data?.product?.variants?.edges || []
        const existingSizes = existingVariants.map((v: any) => 
          v.node.selectedOptions.find((opt: any) => opt.name === 'Size')?.value
        ).filter(Boolean)
        
        // Créer les variantes manquantes pour chaque taille
        for (const size of product.sizes) {
          if (!existingSizes.includes(size)) {
            const variantMutation = `
              mutation productVariantCreate($productId: ID!, $variant: ProductVariantInput!) {
                productVariantCreate(productId: $productId, variant: $variant) {
                  productVariant {
                    id
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `
            
            try {
              await fetch(ADMIN_API_ENDPOINT, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Shopify-Access-Token': ADMIN_TOKEN!,
                },
                body: JSON.stringify({
                  query: variantMutation,
                  variables: {
                    productId: productId,
                    variant: {
                      price: priceInDollars,
                      option1: size,
                    },
                  },
                }),
              })
            } catch (err) {
              // Ignorer les erreurs
            }
          }
        }

        // Mettre à jour le prix de toutes les variantes existantes
        for (const variantEdge of existingVariants) {
          const variantId = variantEdge.node.id
          const updateVariantMutation = `
            mutation productVariantUpdate($variant: ProductVariantInput!) {
              productVariantUpdate(variant: $variant) {
                productVariant {
                  id
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `
          
          try {
            await fetch(ADMIN_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
              },
              body: JSON.stringify({
                query: updateVariantMutation,
                variables: {
                  variant: {
                    id: variantId,
                    price: priceInDollars,
                  },
                },
              }),
            })
          } catch (err) {
            // Ignorer les erreurs
          }
        }
      }
    } else {
      // Pas de tailles, juste mettre à jour le prix de la variante par défaut
      const getVariantsQuery = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      `

      const variantsResponse = await fetch(ADMIN_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMIN_TOKEN!,
        },
        body: JSON.stringify({
          query: getVariantsQuery,
          variables: { id: productId },
        }),
      })

      if (variantsResponse.ok) {
        const variantsData = await variantsResponse.json()
        const existingVariants = variantsData.data?.product?.variants?.edges || []
        
        for (const variantEdge of existingVariants) {
          const variantId = variantEdge.node.id
          const updateVariantMutation = `
            mutation productVariantUpdate($variant: ProductVariantInput!) {
              productVariantUpdate(variant: $variant) {
                productVariant {
                  id
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `
          
          try {
            await fetch(ADMIN_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': ADMIN_TOKEN!,
              },
              body: JSON.stringify({
                query: updateVariantMutation,
                variables: {
                  variant: {
                    id: variantId,
                    price: priceInDollars,
                  },
                },
              }),
            })
          } catch (err) {
            // Ignorer les erreurs
          }
        }
      }
    }

    return productId
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

  // Optionnel: URL de base pour les images (ex: http://localhost:3000)
  // Si vous avez un serveur qui sert les images, utilisez cette variable
  const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || undefined

  // Importer chaque produit
  for (let i = 0; i < exportData.products.length; i++) {
    const product = exportData.products[i]
    console.log(`[${i + 1}/${exportData.totalProducts}] Import: ${product.name}...`)

    const productId = await createProductInShopify(product, IMAGE_BASE_URL)
    
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

