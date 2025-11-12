/**
 * Script de publication des produits sur les canaux Shopify
 * Usage: npx tsx scripts/publish-products.ts
 * 
 * Ce script publie les produits importés sur 3 canaux :
 * 1. Online Store
 * 2. atelier-storefront
 * 3. Atelier Storefront Token
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: join(process.cwd(), '.env.local') })
dotenv.config({ path: join(process.cwd(), 'env.local') })

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN
const API_VERSION = '2025-10'

if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
  throw new Error('Variables d\'environnement manquantes: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN et SHOPIFY_ADMIN_API_TOKEN sont requis')
}

const ADMIN_API_ENDPOINT = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/graphql.json`

// Canaux cibles
const TARGET_CHANNELS = [
  'Online Store',
  'atelier-storefront',
  'Atelier Storefront Token'
]

interface ShopifyResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: string[]
  }>
  extensions?: any
}

interface Publication {
  id: string
  name: string
}

interface ImportResults {
  importedAt: string
  success: number
  failed: number
  productIds: string[]
}

/**
 * ÉTAPE 1: Récupérer la liste des publicationIds
 */
async function getPublications(): Promise<Map<string, string>> {
  console.log('📡 Récupération des publications...\n')

  const query = `
    query {
      publications(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `

  try {
    const response = await fetch(ADMIN_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ShopifyResponse<{
      publications: {
        edges: Array<{
          node: Publication
        }>
      }
    }> = await response.json()

    if (result.errors) {
      throw new Error(`Erreurs GraphQL: ${JSON.stringify(result.errors)}`)
    }

    const publications = result.data?.publications.edges || []
    const publicationMap = new Map<string, string>()

    console.log('📋 Publications disponibles:')
    publications.forEach(({ node }) => {
      console.log(`   - ${node.name} (${node.id})`)
      publicationMap.set(node.name, node.id)
    })
    console.log()

    return publicationMap
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des publications:', error)
    throw error
  }
}

/**
 * Vérifier si un produit existe avant de le publier
 */
async function checkProductExists(productId: string): Promise<boolean> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
      }
    }
  `

  try {
    const response = await fetch(ADMIN_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({
        query,
        variables: { id: productId },
      }),
    })

    if (!response.ok) {
      return false
    }

    const result: ShopifyResponse<{
      product: {
        id: string
        title: string
      } | null
    }> = await response.json()

    return !!result.data?.product
  } catch (error) {
    return false
  }
}

/**
 * ÉTAPE 2: Publier un produit sur les canaux spécifiés
 */
async function publishProduct(
  productId: string,
  publicationIds: string[]
): Promise<boolean> {
  const mutation = `
    mutation publishProduct($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        publishable {
          ... on Product {
            id
            title
            resourcePublications(first: 10) {
              nodes {
                publication {
                  id
                  name
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    id: productId,
    input: publicationIds.map((pubId) => ({
      publicationId: pubId,
    })),
  }

  try {
    const response = await fetch(ADMIN_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ShopifyResponse<{
      publishablePublish: {
        publishable: {
          id: string
          title: string
          resourcePublications: {
            nodes: Array<{
              publication: {
                id: string
                name: string
              }
            }>
          }
        } | null
        userErrors: Array<{
          field: string[]
          message: string
        }>
      }
    }> = await response.json()

    if (result.errors) {
      console.error(`   ❌ Erreurs GraphQL:`, result.errors)
      return false
    }

    if (result.data?.publishablePublish.userErrors && result.data.publishablePublish.userErrors.length > 0) {
      const errors = result.data.publishablePublish.userErrors
      console.error(`   ❌ Erreurs utilisateur:`)
      errors.forEach((error) => {
        console.error(`      - ${error.message} (field: ${error.field.join('.')})`)
      })
      return false
    }

    const published = result.data?.publishablePublish.publishable
    if (published) {
      const publishedChannels = published.resourcePublications.nodes.map(
        (node) => node.publication.name
      )
      console.log(`   ✅ Publié: ${published.title}`)
      console.log(`      Canaux: ${publishedChannels.join(', ')}`)
      return true
    }

    return false
  } catch (error) {
    console.error(`   ❌ Erreur lors de la publication:`, error)
    return false
  }
}

/**
 * Fonction principale
 */
async function publishProducts() {
  console.log('🚀 Début de la publication des produits...')
  console.log(`   Store: ${SHOP_DOMAIN}`)
  console.log(`   API Version: ${API_VERSION}`)
  console.log(`   Canaux cibles: ${TARGET_CHANNELS.join(', ')}\n`)

  // ÉTAPE 1: Récupérer les publications
  const publicationMap = await getPublications()

  // Vérifier que tous les canaux cibles existent
  const missingChannels: string[] = []
  const publicationIds: string[] = []

  for (const channelName of TARGET_CHANNELS) {
    const pubId = publicationMap.get(channelName)
    if (!pubId) {
      missingChannels.push(channelName)
    } else {
      publicationIds.push(pubId)
    }
  }

  if (missingChannels.length > 0) {
    console.error('❌ Canaux manquants:')
    missingChannels.forEach((channel) => {
      console.error(`   - ${channel}`)
    })
    console.error('\n   Canaux disponibles:')
    publicationMap.forEach((id, name) => {
      console.error(`   - ${name}`)
    })
    process.exit(1)
  }

  console.log(`✅ Tous les canaux trouvés (${publicationIds.length} canaux)\n`)

  // Lire les résultats d'import
  const resultsPath = join(process.cwd(), 'data', 'import-results.json')
  let importResults: ImportResults

  try {
    const fileContent = readFileSync(resultsPath, 'utf-8')
    importResults = JSON.parse(fileContent)
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier d\'import:', error)
    console.error('   Assurez-vous d\'avoir exécuté import-to-shopify.ts d\'abord')
    process.exit(1)
  }

  if (importResults.productIds.length === 0) {
    console.error('❌ Aucun produit à publier dans import-results.json')
    process.exit(1)
  }

  console.log(`📦 ${importResults.productIds.length} produits à publier\n`)

  const publishResults = {
    success: 0,
    failed: 0,
    publishedProducts: [] as string[],
  }

  // Publier chaque produit
  for (let i = 0; i < importResults.productIds.length; i++) {
    const productId = importResults.productIds[i]
    console.log(`[${i + 1}/${importResults.productIds.length}] Publication du produit ${productId}...`)

    // Vérifier que le produit existe avant de le publier
    const exists = await checkProductExists(productId)
    if (!exists) {
      console.error(`   ⚠️  Produit non trouvé dans Shopify (peut-être supprimé), ignoré`)
      publishResults.failed++
      // Pause avant le prochain produit
      if (i < importResults.productIds.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
      continue
    }

    const success = await publishProduct(productId, publicationIds)

    if (success) {
      publishResults.success++
      publishResults.publishedProducts.push(productId)
    } else {
      publishResults.failed++
    }

    // Pause pour éviter de surcharger l'API
    if (i < importResults.productIds.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Résultats de la publication:')
  console.log(`   ✅ Succès: ${publishResults.success}`)
  console.log(`   ❌ Échecs: ${publishResults.failed}`)
  console.log(`   📦 Total: ${importResults.productIds.length}`)
  console.log('='.repeat(50))

  // Sauvegarder les résultats
  const publishResultsPath = join(process.cwd(), 'data', 'publish-results.json')
  const publishResultsData = {
    publishedAt: new Date().toISOString(),
    channels: TARGET_CHANNELS,
    publicationIds: publicationIds,
    ...publishResults,
  }

  writeFileSync(
    publishResultsPath,
    JSON.stringify(publishResultsData, null, 2),
    'utf-8'
  )

  console.log(`\n💾 Résultats sauvegardés dans: data/publish-results.json`)
}

// Exécuter le script
publishProducts().catch((error) => {
  console.error('❌ Erreur fatale:', error)
  process.exit(1)
})

