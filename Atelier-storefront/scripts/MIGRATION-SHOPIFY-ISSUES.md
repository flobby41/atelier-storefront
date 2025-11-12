****# Migration Shopify : Problèmes rencontrés et solutions

## 📋 Contexte

Lors de la migration des produits vers Shopify via l'API Admin GraphQL, nous avons rencontré plusieurs problèmes liés à la création des variantes avec prix. Ce document explique les erreurs rencontrées, pourquoi elles se produisaient, et comment nous les avons résolues.

## 🎯 Objectif initial

Créer des produits dans Shopify avec leurs variantes et prix, de manière à ce que Shopify affiche correctement :
- `priceRange` au niveau du produit
- `variants.price` au niveau de chaque variante

## ❌ Problème 1 : Le prix au niveau du produit n'est pas lu par Shopify

### Erreur initiale

```javascript
// ❌ Approche incorrecte
{
  name: "Deconstructed Wool Blazer",
  price: 1850,  // Shopify ne lit pas ça
  ...
}
```

### Pourquoi ça ne fonctionnait pas

Shopify ne lit **jamais** le prix au niveau du produit. Le prix doit obligatoirement être défini au niveau des **variantes**. Même si un produit n'a qu'une seule variante, le prix doit être sur cette variante.

### Solution

```javascript
// ✅ Approche correcte
mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      variants {
        edges {
          node {
            price  // Le prix doit être ici
          }
        }
      }
    }
  }
}
```

---

## ❌ Problème 2 : `options` et `variants` non supportés dans `ProductInput` (API 2025-10)

### Erreur GraphQL

```
Variable $input of type ProductInput! was provided invalid value for 
options (Field is not defined on ProductInput), 
variants (Field is not defined on ProductInput)
```

### Pourquoi ça ne fonctionnait pas

Dans les versions récentes de l'API Shopify (2025-10 et suivantes), les champs `options` et `variants` ont été **retirés** de `ProductInput`. On ne peut plus créer les variantes directement lors de la création du produit via GraphQL.

### Tentative de solution 1 : Créer les variantes après avec `productVariantCreate`

```javascript
// ❌ Cette mutation n'existe plus dans l'API 2025-10
mutation productVariantCreate($input: ProductVariantInput!) {
  productVariantCreate(input: $input) {
    productVariant {
      id
      price
    }
  }
}
```

**Erreur obtenue :**
```
Field 'productVariantCreate' doesn't exist on type 'Mutation'
```

### Pourquoi ça ne fonctionnait pas

La mutation `productVariantCreate` a été **complètement supprimée** de l'API GraphQL Admin dans les versions récentes (2025-10).

---

## ❌ Problème 3 : `ProductVariantsBulkInput` ne supporte pas `sku` et `option1`

### Erreur GraphQL

```
Field is not defined on ProductVariantsBulkInput
```

### Pourquoi ça ne fonctionnait pas

La mutation `productVariantsBulkCreate` existe encore, mais le type `ProductVariantsBulkInput` a été **simplifié** et ne supporte plus :
- ❌ `sku`
- ❌ `option1`, `option2`, `option3`

Les champs acceptés sont maintenant très limités :
- ✅ `title`
- ✅ `price`
- ✅ `inventoryQuantity`
- ✅ `compareAtPrice`
- ✅ `barcode`
- ✅ `weight` / `weightUnit`

### Tentative de solution : Utiliser `productOptionsCreate` puis `productVariantsBulkCreate`

```javascript
// Étape 1: Créer les options
mutation productOptionsCreate($productId: ID!, $options: [ProductOptionInput!]!) {
  productOptionsCreate(productId: $productId, options: $options) {
    product { id }
  }
}

// Étape 2: Créer les variantes
mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants) {
    productVariants { id price }
  }
}
```

**Problème :** Même avec cette approche, on ne peut pas spécifier `option1` dans les variantes, donc Shopify ne sait pas quelle variante correspond à quelle taille.

---

## ✅ Solution finale : Utiliser la REST API

### Pourquoi la REST API fonctionne

La **REST API** de Shopify est plus stable et supporte toujours tous les champs nécessaires pour créer des variantes :
- ✅ `title`
- ✅ `price`
- ✅ `option1`, `option2`, `option3`
- ✅ `sku`

### Implémentation finale

```javascript
// ÉTAPE 1: Créer le produit de base via GraphQL
const createMutation = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
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
    // ❌ Pas d'options ni variants ici
  },
}

// ÉTAPE 2: Créer les variantes avec prix via REST API
const variants = product.sizes.length > 0
  ? product.sizes.map((size) => ({
      title: size,
      price: priceInDollars,
      option1: size,  // ✅ Supporté en REST API
      sku: `${product.id}-${size}`,  // ✅ Supporté en REST API
    }))
  : [
      {
        title: 'Default Title',
        price: priceInDollars,
        sku: `${product.id}-DEFAULT`,
      },
    ]

// Mettre à jour le produit avec les variantes
await fetch(`${ADMIN_REST_API_ENDPOINT}/products/${productIdNumeric}.json`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': ADMIN_TOKEN!,
  },
  body: JSON.stringify({
    product: {
      id: parseInt(productIdNumeric),
      variants: variants,
    },
  }),
})
```

### Points importants

1. **Conversion d'ID** : L'API GraphQL retourne un ID au format `gid://shopify/Product/123456`, mais la REST API nécessite juste le nombre `123456`.

2. **Format du prix** : Le prix doit être une **string** avec 2 décimales (ex: `"1850.00"`), pas un nombre.

3. **Structure REST** : La REST API attend un objet `product` contenant les `variants`.

---

## 📊 Résumé des changements dans l'API Shopify

| Version API | `options` dans `ProductInput` | `variants` dans `ProductInput` | `productVariantCreate` | `sku`/`option1` dans Bulk |
|------------|-------------------------------|--------------------------------|----------------------|--------------------------|
| 2023-04    | ✅ Oui                        | ✅ Oui                         | ✅ Oui                | ✅ Oui                    |
| 2024-10    | ❌ Non                        | ❌ Non                         | ❌ Non                | ⚠️ Partiel                |
| 2025-10    | ❌ Non                        | ❌ Non                         | ❌ Non                | ❌ Non                    |

---

## 🎯 Leçons apprises

1. **Le prix doit toujours être sur les variantes**, jamais sur le produit
2. **L'API GraphQL Admin a été simplifiée** dans les versions récentes, certains champs ont été retirés
3. **La REST API est plus stable** pour les opérations complexes comme la création de variantes
4. **Mélanger GraphQL et REST** est une approche valide : GraphQL pour créer le produit, REST pour les variantes

---

## 📝 Structure finale du script

```
1. Créer le produit de base via GraphQL (productCreate)
   ↓
2. Extraire l'ID numérique depuis l'ID GraphQL
   ↓
3. Créer les variantes avec prix via REST API (PUT /products/{id}.json)
   ↓
4. Ajouter les images via GraphQL (productCreateMedia)
```

---

## 🔗 Références

- [Shopify Admin GraphQL API - productCreate](https://shopify.dev/docs/api/admin-graphql/2025-10/mutations/productcreate)
- [Shopify Admin REST API - Products](https://shopify.dev/docs/api/admin-rest/2025-10/resources/product)
- [Shopify Admin GraphQL API - productVariantsBulkCreate](https://shopify.dev/docs/api/admin-graphql/2025-10/mutations/productVariantsBulkCreate)

---****

## ✅ Résultat

Le script fonctionne maintenant correctement et crée les produits avec :
- ✅ Les variantes correctement configurées
- ✅ Le prix affiché dans `priceRange` et `variants.price`
- ✅ Les options (tailles) correctement associées
- ✅ Les SKU définis pour chaque variante

---