# Scripts de Migration Shopify

Ce dossier contient les scripts pour migrer les produits de l'application locale vers Shopify.

## Prérequis

1. **Variables d'environnement** dans `env.local` :
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` : Votre domaine Shopify (ex: `atelier-demo-3.myshopify.com`)
   - `SHOPIFY_ADMIN_API_TOKEN` : Token d'accès Admin API de Shopify
   - `IMAGE_BASE_URL` (optionnel) : URL de base pour les images (ex: `http://localhost:3000`)

2. **Installation des dépendances** :
   ```bash
   pnpm install
   # ou
   npm install
   ```

## Utilisation

### Étape 1 : Exporter les produits

Exporte les produits depuis `lib/products.ts` vers un fichier JSON :

```bash
npm run migrate:export
# ou
pnpm migrate:export
```

Cela crée le fichier `data/products-export.json` avec tous les produits.

### Étape 2 : Importer vers Shopify

Importe les produits exportés vers Shopify via l'Admin GraphQL API :

```bash
npm run migrate:import
# ou
pnpm migrate:import
```

### Étape 3 : Publier sur les canaux

Publie les produits importés sur les 3 canaux Shopify :
- Online Store
- atelier-storefront
- Atelier Storefront Token

```bash
npm run migrate:publish
# ou
pnpm migrate:publish
```

### Exécuter toutes les étapes en une fois

```bash
npm run migrate && npm run migrate:publish
# ou
pnpm migrate && pnpm migrate:publish
```

## Fonctionnalités

### Export (`export-products.ts`)
- ✅ Lit tous les produits depuis `lib/products.ts`
- ✅ Exporte vers JSON avec métadonnées (date, nombre de produits)
- ✅ Crée automatiquement le dossier `data/` si nécessaire

### Import (`import-to-shopify.ts`)
- ✅ Crée les produits dans Shopify avec toutes les informations
- ✅ Gère les variantes (tailles) automatiquement
- ✅ Gère les images (URLs locales ou complètes)
- ✅ Convertit les prix (centimes → dollars)
- ✅ Ajoute les tags (catégorie, genre, détails)
- ✅ Gère les erreurs et affiche un rapport détaillé
- ✅ Sauvegarde les résultats dans `data/import-results.json`

### Publication (`publish-products.ts`)
- ✅ Récupère automatiquement les publicationIds des canaux
- ✅ Publie les produits sur 3 canaux simultanément
- ✅ Gère les erreurs et affiche un rapport détaillé
- ✅ Sauvegarde les résultats dans `data/publish-results.json`

## Structure des données

### Format d'export
```json
{
  "exportedAt": "2025-01-XX...",
  "totalProducts": 30,
  "products": [
    {
      "id": 1,
      "name": "Deconstructed Wool Blazer",
      "price": 1850,
      "category": "Outerwear",
      "gender": "unisex",
      "description": "...",
      "images": ["/image1.jpg", ...],
      "sizes": ["XS", "S", "M", "L", "XL"],
      "details": ["100% Italian Wool", ...]
    }
  ]
}
```

### Résultats d'import
```json
{
  "importedAt": "2025-01-XX...",
  "success": 30,
  "failed": 0,
  "productIds": ["gid://shopify/Product/123", ...]
}
```

### Résultats de publication
```json
{
  "publishedAt": "2025-01-XX...",
  "channels": ["Online Store", "atelier-storefront", "Atelier Storefront Token"],
  "publicationIds": ["gid://shopify/Publication/123", ...],
  "success": 30,
  "failed": 0,
  "publishedProducts": ["gid://shopify/Product/123", ...]
}
```

## Notes importantes

1. **Images** : Les images locales doivent être accessibles via une URL publique pour que Shopify puisse les télécharger. Utilisez `IMAGE_BASE_URL` si vous servez les images depuis un serveur local.

2. **Prix** : Les prix dans `lib/products.ts` sont en centimes. Le script les convertit automatiquement en dollars pour Shopify.

3. **Stock** : Par défaut, chaque variante est créée avec un stock de 10 unités. Vous pouvez modifier cela dans le script.

4. **Rate Limiting** : Le script inclut une pause de 500ms entre chaque produit pour éviter de surcharger l'API Shopify.

5. **Erreurs** : En cas d'erreur, le script continue avec les autres produits et affiche un rapport à la fin.

## Dépannage

### Erreur : "Variables d'environnement manquantes"
- Vérifiez que `SHOPIFY_ADMIN_API_TOKEN` est présent dans `env.local`
- Vérifiez que `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` est correct

### Erreur : "Erreur lors de la lecture du fichier d'export"
- Exécutez d'abord `npm run migrate:export`

### Erreurs GraphQL
- Vérifiez que votre token Admin API a les permissions nécessaires
- Vérifiez que l'API version est correcte (actuellement `2025-10`)

### Images non importées
- Assurez-vous que les images sont accessibles publiquement
- Utilisez `IMAGE_BASE_URL` si vous servez depuis un serveur local
- Pour une migration complète, considérez uploader les images vers Shopify Files API

