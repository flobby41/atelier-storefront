# Migration des Images vers Shopify via Base64

## 📋 Contexte

Le script de migration `import-to-shopify.ts` a été modifié pour uploader les images directement depuis le dossier `public` vers Shopify en utilisant l'API REST avec des données encodées en base64, au lieu d'utiliser des URLs ou l'API GraphQL.

## 🔄 Modifications Apportées

### 1. Import de `existsSync` depuis `fs`

**Avant :**
```typescript
import { readFileSync, writeFileSync } from 'fs'
```

**Après :**
```typescript
import { readFileSync, writeFileSync, existsSync } from 'fs'
```

**Pourquoi :** Ajout de `existsSync` pour vérifier l'existence des fichiers images avant de les lire, évitant ainsi les erreurs si un fichier est manquant.

---

### 2. Refonte de la fonction `prepareImageForShopify`

#### Avant
La fonction préparait des URLs pour les images :
- Construisait des URLs complètes si une `baseUrl` était fournie
- Retournait des URLs relatives sinon
- Shopify devait ensuite télécharger les images depuis ces URLs

#### Après
La fonction lit maintenant directement les fichiers depuis le dossier `public` et les convertit en base64 :

```typescript
async function prepareImageForShopify(imageUrl: string): Promise<{ attachment: string; filename: string } | null>
```

**Fonctionnement détaillé :**

1. **Vérification des URLs externes** (lignes 59-63)
   - Si l'image est une URL complète (`http://` ou `https://`), elle est ignorée car on ne peut pas la lire localement
   - Un message d'avertissement est affiché

2. **Nettoyage du chemin** (ligne 66)
   - Supprime le `/` initial si présent pour construire un chemin relatif correct
   - Exemple : `/image.jpg` → `image.jpg`

3. **Construction du chemin complet** (ligne 69)
   - Combine le chemin du projet avec `public/` et le nom du fichier
   - Exemple : `/Users/.../Atelier-storefront/public/deconstructed-black-wool-blazer.jpg`

4. **Vérification de l'existence** (lignes 72-75)
   - Utilise `existsSync()` pour vérifier que le fichier existe
   - Affiche un avertissement si le fichier est introuvable

5. **Lecture en base64** (ligne 79)
   - Lit le fichier avec `readFileSync()` en spécifiant `encoding: 'base64'`
   - Cela convertit automatiquement le contenu binaire en chaîne base64

6. **Extraction du nom de fichier** (ligne 82)
   - Extrait le nom du fichier depuis le chemin
   - Gère les cas avec ou sans sous-dossiers

7. **Retour des données** (lignes 84-87)
   - Retourne un objet avec :
     - `attachment` : les données de l'image en base64
     - `filename` : le nom du fichier

---

### 3. Modification de `createProductInShopify`

#### Suppression du paramètre `baseUrl`

**Avant :**
```typescript
async function createProductInShopify(product: Product, baseUrl?: string): Promise<string | null>
```

**Après :**
```typescript
async function createProductInShopify(product: Product): Promise<string | null>
```

**Pourquoi :** Plus besoin de `baseUrl` car on lit directement les fichiers locaux.

#### Préparation des images

**Avant :**
```typescript
const images = await Promise.all(
  product.images.map(async (img) => {
    const url = await prepareImageForShopify(img, baseUrl)
    return url ? { src: url } : null
  })
)
const validImages = images.filter((img): img is { src: string } => img !== null)
```

**Après :**
```typescript
const images = await Promise.all(
  product.images.map(async (img) => {
    return await prepareImageForShopify(img)
  })
)
const validImages = images.filter((img): img is { attachment: string; filename: string } => img !== null)
```

**Changements :**
- Plus besoin de passer `baseUrl`
- Le type de retour change de `{ src: string }` à `{ attachment: string; filename: string }`
- Les images contiennent maintenant les données base64 au lieu d'URLs

---

### 4. Remplacement de l'upload GraphQL par REST API

#### Avant : Upload via GraphQL

```typescript
// ÉTAPE 3: Ajouter les images si disponibles
if (validImages.length > 0) {
  for (const img of validImages) {
    const imageMutation = `
      mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
        productCreateMedia(productId: $productId, media: $media) {
          media { id }
          mediaUserErrors { field message }
        }
      }
    `
    await fetch(ADMIN_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({
        query: imageMutation,
        variables: {
          productId: productGid,
          media: [{ originalSource: img.src }],
        },
      }),
    })
  }
}
```

**Problèmes :**
- Nécessitait que Shopify télécharge les images depuis une URL
- Plus complexe avec GraphQL
- Dépendait d'un serveur accessible pour servir les images

#### Après : Upload via REST API avec base64

```typescript
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
```

**Avantages :**
- ✅ Upload direct depuis les fichiers locaux
- ✅ Pas besoin de serveur pour servir les images
- ✅ Plus simple et plus fiable
- ✅ Meilleure gestion des erreurs avec compteur de succès
- ✅ Logs détaillés pour chaque image

**Détails techniques :**

1. **Endpoint REST** : `POST /admin/api/2025-10/products/{productId}/images.json`
   - Utilise l'ID numérique du produit (extrait depuis l'ID GraphQL)
   - Format REST standard de Shopify

2. **Structure du body** :
   ```json
   {
     "image": {
       "attachment": "base64_encoded_string",
       "filename": "image.jpg"
     }
   }
   ```

3. **Gestion des erreurs** :
   - Vérifie le statut HTTP de la réponse
   - Affiche les erreurs détaillées si l'upload échoue
   - Continue avec les autres images même si une échoue

4. **Compteur de succès** :
   - Suit le nombre d'images uploadées avec succès
   - Affiche un résumé à la fin : `✅ X/Y image(s) uploadée(s)`

---

### 5. Suppression de `IMAGE_BASE_URL` dans la fonction principale

**Avant :**
```typescript
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || undefined
// ...
const productId = await createProductInShopify(product, IMAGE_BASE_URL)
```

**Après :**
```typescript
// Plus besoin de IMAGE_BASE_URL
// ...
const productId = await createProductInShopify(product)
```

**Pourquoi :** Cette variable n'est plus nécessaire car on lit directement les fichiers locaux.

---

## 🔍 Flux de Données Complet

### Avant (avec URLs)

```
products.ts (images: ["/image.jpg"])
    ↓
prepareImageForShopify() → Construit URL complète
    ↓
GraphQL productCreateMedia → Shopify télécharge depuis URL
    ↓
Image sur Shopify
```

### Après (avec base64)

```
products.ts (images: ["/image.jpg"])
    ↓
prepareImageForShopify() → Lit fichier depuis public/
    ↓
readFileSync() avec encoding: 'base64'
    ↓
REST API POST /products/{id}/images.json avec attachment
    ↓
Image sur Shopify
```

---

## 📝 Exemple Concret

### Produit dans `products.ts`
```typescript
{
  id: 1,
  name: "Deconstructed Wool Blazer",
  images: [
    "/deconstructed-black-wool-blazer-avant-garde.jpg",
    "/deconstructed-blazer-detail-back-view.jpg",
  ],
  // ...
}
```

### Traitement

1. **Image 1** : `/deconstructed-black-wool-blazer-avant-garde.jpg`
   - Chemin nettoyé : `deconstructed-black-wool-blazer-avant-garde.jpg`
   - Chemin complet : `{project}/public/deconstructed-black-wool-blazer-avant-garde.jpg`
   - Lecture en base64 : `iVBORw0KGgoAAAANSUhEUgAA...` (exemple)
   - Upload vers : `POST /products/123456/images.json`

2. **Image 2** : `/deconstructed-blazer-detail-back-view.jpg`
   - Même processus...

### Requête REST envoyée

```http
POST https://atelier-demo-3.myshopify.com/admin/api/2025-10/products/123456/images.json
Content-Type: application/json
X-Shopify-Access-Token: shpat_xxxxx

{
  "image": {
    "attachment": "iVBORw0KGgoAAAANSUhEUgAA...",
    "filename": "deconstructed-black-wool-blazer-avant-garde.jpg"
  }
}
```

---

## ✅ Avantages de cette Approche

1. **Indépendance** : Pas besoin d'un serveur qui sert les images
2. **Fiabilité** : Les images sont uploadées directement, pas de dépendance réseau
3. **Simplicité** : Une seule API REST, plus simple que GraphQL pour ce cas
4. **Performance** : Pas de téléchargement intermédiaire par Shopify
5. **Sécurité** : Les images restent locales jusqu'à l'upload

---

## ⚠️ Points d'Attention

1. **Taille des fichiers** : Les grandes images en base64 peuvent créer de gros payloads JSON
   - Shopify a des limites de taille pour les uploads
   - Les images dans `public/` semblent être de taille raisonnable (quelques dizaines de KB)

2. **Fichiers manquants** : Le script vérifie l'existence des fichiers et continue même si certains sont manquants
   - Les erreurs sont loggées mais n'empêchent pas la migration du produit

3. **Format des images** : Shopify accepte les formats standards (JPG, PNG, etc.)
   - Les fichiers dans `public/` sont principalement des `.jpg`

4. **Rate limiting** : Shopify peut limiter le nombre de requêtes par seconde
   - Le script inclut déjà une pause de 500ms entre les produits
   - Les images sont uploadées séquentiellement pour chaque produit

---

## 🚀 Utilisation

Le script fonctionne exactement comme avant :

```bash
npx tsx scripts/import-to-shopify.ts
```

**Différence** : Les images sont maintenant lues depuis `public/` et uploadées directement, sans avoir besoin de configurer `IMAGE_BASE_URL`.

---

## 📚 Références

- [Shopify REST Admin API - Product Images](https://shopify.dev/docs/api/admin-rest/2025-10/resources/product#resource_object)
- [Uploading Images with Base64](https://shopify.dev/docs/api/admin-rest/2025-10/resources/product#post-products-product-id-images)

