/**
 * TypeScript types for Shopify Storefront API responses
 */

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyPrice {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyPrice
  selectedOptions: Array<{
    name: string
    value: string
  }>
  image: ShopifyImage | null
}

export interface ShopifyProductOption {
  name: string
  values: string[]
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  images: {
    edges: Array<{
      node: ShopifyImage
    }>
  }
  priceRange: {
    minVariantPrice: ShopifyPrice
    maxVariantPrice: ShopifyPrice
  }
  variants: {
    edges: Array<{
      node: ShopifyProductVariant
    }>
  }
  options: ShopifyProductOption[]
  tags: string[]
  productType: string
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  cost: {
    totalAmount: ShopifyPrice
  }
  merchandise: {
    id: string
    title: string
    price: ShopifyPrice
    product: {
      title: string
      featuredImage: ShopifyImage | null
    }
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: ShopifyPrice
  }
  lines: {
    edges: Array<{
      node: ShopifyCartLine
    }>
  }
}

/**
 * Convert Shopify product to app format
 */
export function normalizeProduct(shopifyProduct: ShopifyProduct) {
  const images = shopifyProduct.images.edges.map((edge) => edge.node.url)
  const featuredImage = shopifyProduct.featuredImage?.url || images[0] || '/placeholder.svg'
  
  // Extract sizes from options - only look for actual size options
  // Exclude price-related options (Price, Amount, Value, etc.)
  const priceRelatedKeywords = ['price', 'amount', 'value', 'cost', 'dollar', '$']
  const sizeOption = shopifyProduct.options.find((opt) => {
    const optName = opt.name.toLowerCase()
    // Must contain "size" and NOT contain price-related keywords
    return optName.includes('size') && 
           !priceRelatedKeywords.some(keyword => optName.includes(keyword))
  })
  
  // Only use size option if found, otherwise empty array (one size product)
  const sizes = sizeOption?.values || []

  // Get price from first variant
  const firstVariant = shopifyProduct.variants.edges[0]?.node
  const price = firstVariant ? parseFloat(firstVariant.price.amount) : parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    name: shopifyProduct.title,
    price,
    category: shopifyProduct.productType || 'Uncategorized',
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    images: [featuredImage, ...images.filter(img => img !== featuredImage)],
    sizes,
    details: shopifyProduct.tags,
    variants: shopifyProduct.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: parseFloat(edge.node.price.amount),
      available: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions,
      image: edge.node.image?.url || featuredImage,
    })),
  } as {
    id: string
    handle: string
    name: string
    price: number
    category: string
    description: string
    descriptionHtml: string
    images: string[]
    sizes: string[]
    details: string[]
    variants: Array<{
      id: string
      title: string
      price: number
      available: boolean
      selectedOptions: Array<{ name: string; value: string }>
      image: string
    }>
  }
}

/**
 * Convert Shopify cart to app format
 */
export function normalizeCart(shopifyCart: ShopifyCart) {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    total: parseFloat(shopifyCart.cost.totalAmount.amount),
    currencyCode: shopifyCart.cost.totalAmount.currencyCode,
    items: shopifyCart.lines.edges.map((edge) => {
      const line = edge.node
      const variant = line.merchandise
      return {
        id: line.id,
        variantId: variant.id,
        name: variant.product.title,
        price: parseFloat(variant.price.amount),
        image: variant.product.featuredImage?.url || '/placeholder.svg',
        quantity: line.quantity,
        total: parseFloat(line.cost.totalAmount.amount),
      }
    }),
  }
}

