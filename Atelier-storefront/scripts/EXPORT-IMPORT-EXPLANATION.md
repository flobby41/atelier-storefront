# Export et Import des Produits : Explication

## 📋 Vue d'ensemble

Le processus de migration des produits vers Shopify se fait en **deux étapes distinctes** via deux scripts séparés :

1. **`export-products.ts`** : Exporte les produits depuis le code source vers un fichier JSON
2. **`import-to-shopify.ts`** : Importe les produits depuis le fichier JSON vers Shopify

---

## 🔄 Script 1 : `export-products.ts`

### Rôle
**Exporter** les produits depuis le code TypeScript vers un fichier JSON intermédiaire.

### Ce qu'il fait

1. **Lit les données source** depuis `lib/products.ts`
   - Récupère tous les produits définis dans le code
   - Utilise l'interface `Product` existante

2. **Crée un fichier JSON** dans `data/products-export.json`
   - Structure les données avec métadonnées :
     - `exportedAt` : Date et heure de l'export
     - `totalProducts` : Nombre total de produits
     - `products` : Tableau de tous les produits

3. **Crée le dossier `data/`** s'il n'existe pas

### Caractéristiques

- ✅ **Opération locale uniquement**
- ✅ **Pas besoin de connexion Shopify**
- ✅ **Pas besoin de variables d'environnement**
- ✅ **Rapide et sûr** (pas de risque d'erreur réseau)

### Exemple de sortie

```json
{
  "exportedAt": "2025-01-15T10:30:00.000Z",
  "totalProducts": 25,
  "products": [
    {
      "id": 1,
      "name": "Deconstructed Wool Blazer",
      "price": 1850,
      "category": "Outerwear",
      "images": ["/image1.jpg", "/image2.jpg"],
      "sizes": ["XS", "S", "M", "L", "XL"],
      ...
    },
    ...
  ]
}
```

### Utilisation

```bash
npx tsx scripts/export-products.ts
```

---

## 🚀 Script 2 : `import-to-shopify.ts`

### Rôle
**Importer** les produits depuis le fichier JSON vers Shopify via l'API Admin.

### Ce qu'il fait

1. **Lit le fichier JSON** créé par l'export
   - Charge `data/products-export.json`
   - Vérifie que le fichier existe

2. **Se connecte à Shopify** via l'API Admin
   - Utilise GraphQL pour créer les produits de base
   - Utilise REST API pour créer les variantes et uploader les images

3. **Crée chaque produit** en plusieurs étapes :
   - **Étape 1** : Crée le produit de base (nom, description, catégorie, tags)
   - **Étape 2** : Crée les variantes (tailles) avec prix via REST API
   - **Étape 3** : Upload les images depuis `public/` en base64 via REST API

4. **Sauvegarde les résultats** dans `data/import-results.json`
   - Succès/échecs
   - Liste des IDs de produits créés

### Caractéristiques

- ⚠️ **Nécessite des variables d'environnement** :
  - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` ou `SHOPIFY_STORE_DOMAIN`
  - `SHOPIFY_ADMIN_API_TOKEN`
- ⚠️ **Nécessite une connexion à Shopify**
- ⚠️ **Modifie les données sur Shopify** (création de produits)

### Utilisation

```bash
npx tsx scripts/import-to-shopify.ts
```

---

## 🔄 Flux Complet

```
┌─────────────────────┐
│  lib/products.ts    │  ← Source de données (code TypeScript)
│  (code source)      │
└──────────┬──────────┘
           │
           │ export-products.ts
           │ (lecture locale)
           ↓
┌─────────────────────┐
│ products-export.json│  ← Fichier intermédiaire JSON
│  (data/)            │
└──────────┬──────────┘
           │
           │ import-to-shopify.ts
           │ (upload vers Shopify)
           ↓
┌─────────────────────┐
│   Shopify Store     │  ← Produits créés sur Shopify
│   (production)      │
└─────────────────────┘
```

---

## 🤔 Pourquoi Deux Scripts Séparés ?

### 1. **Séparation des responsabilités**

- **Export** = Préparation des données (lecture)
- **Import** = Envoi vers Shopify (écriture)

Chaque script a une responsabilité unique et claire.

### 2. **Réutilisabilité**

Le fichier JSON peut être :
- ✅ **Modifié manuellement** avant l'import
- ✅ **Vérifié** pour détecter des erreurs
- ✅ **Réutilisé** pour réimporter sans réexporter
- ✅ **Partagé** entre différents environnements

### 3. **Sécurité**

- L'export est **sans risque** (lecture seule)
- L'import peut être **exécuté séparément** après vérification
- Possibilité de **valider le JSON** avant de toucher à Shopify

### 4. **Debugging facilité**

- ✅ Vérification du JSON avant l'import
- ✅ Possibilité de corriger le JSON manuellement
- ✅ Réexécution de l'import sans réexporter
- ✅ Logs séparés pour chaque étape

### 5. **Flexibilité**

- Possibilité d'exporter une fois et d'importer plusieurs fois
- Possibilité de modifier le JSON entre export et import
- Possibilité d'exporter sans importer (backup)

---

## 📝 Workflow Recommandé

### Première migration

```bash
# 1. Exporter les produits
npx tsx scripts/export-products.ts

# 2. Vérifier le fichier JSON (optionnel)
cat data/products-export.json

# 3. Importer vers Shopify
npx tsx scripts/import-to-shopify.ts
```

### Migration après modification

```bash
# 1. Modifier lib/products.ts (ajouter/modifier des produits)

# 2. Réexporter
npx tsx scripts/export-products.ts

# 3. Réimporter (les produits existants seront mis à jour ou créés)
npx tsx scripts/import-to-shopify.ts
```

### Réimporter sans réexporter

Si vous avez déjà un fichier `products-export.json` valide :

```bash
# Pas besoin de réexporter, on peut directement importer
npx tsx scripts/import-to-shopify.ts
```

---

## 🔍 Comparaison Détaillée

| Aspect | `export-products.ts` | `import-to-shopify.ts` |
|--------|---------------------|------------------------|
| **Direction** | Code → JSON | JSON → Shopify |
| **Opération** | Lecture | Écriture |
| **Connexion** | Aucune | Shopify API |
| **Variables d'env** | Aucune | SHOP_DOMAIN, ADMIN_TOKEN |
| **Risque** | Aucun | Modifie Shopify |
| **Vitesse** | Très rapide | Plus lent (réseau) |
| **Fichier créé** | `products-export.json` | `import-results.json` |
| **Fichier lu** | `lib/products.ts` | `products-export.json` |

---

## ⚠️ Points d'Attention

### Pour l'export

- ✅ Toujours vérifier que `lib/products.ts` est à jour
- ✅ Le JSON est écrasé à chaque export (pas de merge)

### Pour l'import

- ⚠️ **Les produits existants** : Le script crée de nouveaux produits, il ne met pas à jour les existants
- ⚠️ **Rate limiting** : Shopify peut limiter le nombre de requêtes
- ⚠️ **Images** : Les images doivent exister dans `public/`
- ⚠️ **Erreurs** : Le script continue même si certains produits échouent

---

## 📚 Résumé

- **`export-products.ts`** = Préparation locale des données
- **`import-to-shopify.ts`** = Upload vers Shopify

Les deux scripts travaillent ensemble mais sont indépendants, ce qui offre flexibilité, sécurité et facilité de debugging.

