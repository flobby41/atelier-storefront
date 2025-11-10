/**
 * Script d'export des produits depuis lib/products.ts vers JSON
 * Usage: npx tsx scripts/export-products.ts
 */

import { allProducts, Product } from '../lib/products'
import { writeFileSync } from 'fs'
import { join } from 'path'

interface ExportProduct extends Product {
  // Format pour l'export
}

interface ExportData {
  exportedAt: string
  totalProducts: number
  products: ExportProduct[]
}

function exportProducts() {
  console.log('🚀 Début de l\'export des produits...')
  
  const exportData: ExportData = {
    exportedAt: new Date().toISOString(),
    totalProducts: allProducts.length,
    products: allProducts.map(product => ({
      ...product,
    })),
  }

  const outputPath = join(process.cwd(), 'data', 'products-export.json')
  
  // Créer le dossier data s'il n'existe pas
  const fs = require('fs')
  const dataDir = join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf-8')
  
  console.log(`✅ Export terminé !`)
  console.log(`   📦 ${exportData.totalProducts} produits exportés`)
  console.log(`   📁 Fichier: ${outputPath}`)
  
  return exportData
}

// Exécuter si appelé directement
if (require.main === module) {
  try {
    exportProducts()
  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error)
    process.exit(1)
  }
}

export { exportProducts }

