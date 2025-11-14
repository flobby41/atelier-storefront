export interface Product {
  id: number
  name: string
  price: number
  category: string
  gender?: "women" | "men" | "unisex"
  description: string
  images: string[]
  sizes: string[]
  details: string[]
  colors?: { name: string; hex: string }[]
}

export const allProducts: Product[] = [
  // Original products (unisex/main collection)
  {
    id: 1,
    name: "Deconstructed Wool Blazer",
    price: 1850,
    category: "Outerwear",
    gender: "unisex",
    description:
      "An avant-garde interpretation of the classic blazer. Featuring asymmetric cuts, raw edges, and a draped silhouette that embodies the rebellious spirit of contemporary fashion. Crafted from premium Italian wool with an unstructured design.",
    images: [
      "/deconstructed-black-wool-blazer-avant-garde.jpg",
      "/deconstructed-blazer-detail-back-view.jpg",
      "/deconstructed-blazer-styling-editorial.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Italian Wool", "Unlined construction", "Asymmetric hem", "Raw edge detailing", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#1A1A2E" },
    ],
  },
  {
    id: 2,
    name: "Draped Leather Trousers",
    price: 2200,
    category: "Bottoms",
    gender: "unisex",
    description:
      "Sculptural leather trousers with an exaggerated drape and low-slung waist. The fluid silhouette contrasts with the structured material, creating a striking balance between soft and hard elements.",
    images: [
      "/draped-black-leather-trousers-avant-garde.jpg",
      "/leather-trousers-detail-draping.jpg",
      "/leather-trousers-back-view.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Lambskin Leather",
      "Low-rise waist",
      "Draped leg construction",
      "Side zip closure",
      "Made in France",
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#5C4033" },
    ],
  },
  {
    id: 3,
    name: "Oversized Linen Shirt",
    price: 680,
    category: "Tops",
    gender: "unisex",
    description:
      "Effortlessly cool oversized shirt in premium French linen. The relaxed fit and natural texture embody Parisian nonchalance with a modern edge.",
    images: [
      "/oversized-cream-linen-shirt-minimal.jpg",
      "/linen-shirt-detail-texture.jpg",
      "/oversized-shirt-styling.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% French Linen", "Oversized fit", "Mother of pearl buttons", "Dropped shoulders", "Made in Portugal"],
    colors: [
      { name: "Cream", hex: "#F5F5DC" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Sand", hex: "#C2B280" },
    ],
  },
  // Women's products
  {
    id: 5,
    name: "Oversized Cashmere Coat",
    price: 1850,
    category: "Outerwear",
    gender: "women",
    description:
      "Luxurious oversized cashmere coat with a relaxed silhouette. The soft, enveloping shape creates an effortless elegance while the premium cashmere provides unparalleled warmth and comfort.",
    images: [
      "/oversized-cashmere-coat-front-view-beige.jpg",
      "/oversized-cashmere-coat-back-view-beige.jpg",
      "/oversized-cashmere-coat-detail-texture-beige.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Cashmere", "Oversized fit", "Notched lapels", "Side pockets", "Made in Scotland"],
    colors: [
      { name: "Beige", hex: "#E8DCC4" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Grey", hex: "#808080" },
    ],
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    price: 540,
    category: "Bottoms",
    gender: "women",
    description:
      "Elegant pleated midi skirt with a fluid drape. The fine pleating creates beautiful movement while maintaining a refined silhouette.",
    images: [
      "/pleated-midi-skirt-front-view.jpg",
      "/pleated-midi-skirt-side-movement.jpg",
      "/pleated-midi-skirt-detail-pleats.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Silk", "Pleated construction", "Elastic waistband", "Midi length", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Burgundy", hex: "#800020" },
    ],
  },
  {
    id: 7,
    name: "Sculptural Knit Dress",
    price: 980,
    category: "Dresses",
    gender: "women",
    description:
      "Architectural knit dress with a sculptural silhouette. The innovative construction creates dimension and movement, blending comfort with avant-garde design.",
    images: [
      "/sculptural-knit-dress-front-view.jpg",
      "/sculptural-knit-dress-side-angle.jpg",
      "/sculptural-knit-dress-detail-knit.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Merino Wool Blend", "Sculptural construction", "Fitted silhouette", "Midi length", "Made in Japan"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Charcoal", hex: "#36454F" },
    ],
  },
  {
    id: 9,
    name: "Silk Slip Dress",
    price: 720,
    category: "Dresses",
    gender: "women",
    description:
      "Minimalist silk slip dress with delicate straps and a bias cut. The luxurious fabric drapes beautifully, creating an effortlessly elegant silhouette.",
    images: [
      "/silk-slip-dress-front-view.jpg",
      "/silk-slip-dress-back-detail.jpg",
      "/silk-slip-dress-fabric-drape.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Silk Charmeuse", "Bias cut", "Adjustable straps", "Midi length", "Made in France"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Sage", hex: "#9CAF88" },
    ],
  },
  {
    id: 10,
    name: "Tailored Wool Blazer",
    price: 1180,
    category: "Outerwear",
    gender: "women",
    description:
      "Oversized tailored blazer in premium wool. The relaxed fit and clean lines create a modern take on classic tailoring.",
    images: [
      "/tailored-wool-blazer-front-view-women.jpg",
      "/tailored-wool-blazer-back-view-women.jpg",
      "/tailored-wool-blazer-detail-lapel-women.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Virgin Wool", "Oversized fit", "Notched lapels", "Single button closure", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1A1A2E" },
      { name: "Cream", hex: "#F5F5DC" },
    ],
  },
  {
    id: 11,
    name: "Asymmetric Knit Top",
    price: 420,
    category: "Tops",
    gender: "women",
    description:
      "Avant-garde knit top with asymmetric hemline. The innovative cut creates visual interest while maintaining wearability.",
    images: [
      "/asymmetric-knit-top-avant-garde-fashion.jpg",
      "/asymmetric-knit-top-avant-garde-fashion.jpg",
      "/asymmetric-knit-top-avant-garde-fashion.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Cotton Blend", "Asymmetric hem", "Relaxed fit", "Long sleeves", "Made in Portugal"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Ecru", hex: "#C2B280" },
      { name: "Grey", hex: "#808080" },
    ],
  },
  {
    id: 12,
    name: "High-Waist Leather Pants",
    price: 890,
    category: "Bottoms",
    gender: "women",
    description:
      "Edgy high-waist leather pants with a slim fit. The structured material and tailored cut create a powerful, modern silhouette.",
    images: [
      "/high-waist-leather-pants-edgy-fashion.jpg",
      "/high-waist-leather-pants-edgy-fashion.jpg",
      "/high-waist-leather-pants-edgy-fashion.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Lambskin Leather", "High-rise waist", "Slim fit", "Side zip closure", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#5C4033" },
    ],
  },
  {
    id: 13,
    name: "Draped Jersey Dress",
    price: 650,
    category: "Dresses",
    gender: "women",
    description:
      "Elegant draped jersey dress with a fluid silhouette. The soft fabric and artful draping create effortless sophistication.",
    images: [
      "/draped-jersey-dress-elegant.jpg",
      "/draped-jersey-dress-elegant.jpg",
      "/draped-jersey-dress-elegant.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Viscose Jersey", "Draped construction", "Relaxed fit", "Midi length", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Terracotta", hex: "#E2725B" },
    ],
  },
  {
    id: 14,
    name: "Cropped Boucle Jacket",
    price: 980,
    category: "Outerwear",
    gender: "women",
    description:
      "Luxury cropped jacket in textured boucle fabric. The refined silhouette and premium material create timeless elegance.",
    images: [
      "/cropped-boucle-jacket-luxury-fashion.jpg",
      "/cropped-boucle-jacket-luxury-fashion.jpg",
      "/cropped-boucle-jacket-luxury-fashion.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Wool Boucle", "Cropped length", "Collarless design", "Hook closure", "Made in France"],
    colors: [
      { name: "Cream", hex: "#F5F5DC" },
      { name: "Navy", hex: "#1A1A2E" },
      { name: "Pink", hex: "#FFB6C1" },
    ],
  },
  {
    id: 15,
    name: "Wide-Leg Linen Trousers",
    price: 540,
    category: "Bottoms",
    gender: "women",
    description:
      "Relaxed wide-leg trousers in premium linen. The flowing silhouette and natural fabric create effortless summer elegance.",
    images: [
      "/wide-leg-linen-trousers-neutral-tones.jpg",
      "/wide-leg-linen-trousers-neutral-tones.jpg",
      "/wide-leg-linen-trousers-neutral-tones.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% European Linen", "Wide-leg fit", "High-rise waist", "Side pockets", "Made in Portugal"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Beige", hex: "#E8DCC4" },
      { name: "Black", hex: "#000000" },
    ],
  },
  // Men's products
  {
    id: 21,
    name: "Oversized Wool Coat",
    price: 1290,
    category: "Outerwear",
    gender: "men",
    description:
      "Dramatic oversized wool coat with an enveloping silhouette. The voluminous shape and premium wool create a powerful, avant-garde statement.",
    images: [
      "/oversized-wool-coat-front-view-men.jpg",
      "/oversized-wool-coat-back-view-men.jpg",
      "/oversized-wool-coat-detail-lapel-men.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Virgin Wool", "Oversized fit", "Notched lapels", "Double-breasted", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Camel", hex: "#C19A6B" },
    ],
  },
  {
    id: 22,
    name: "Deconstructed Blazer",
    price: 890,
    category: "Outerwear",
    gender: "men",
    description:
      "Avant-garde deconstructed blazer with raw edges and asymmetric details. The unstructured design challenges traditional tailoring conventions.",
    images: [
      "/deconstructed-blazer-front-view-men.jpg",
      "/deconstructed-blazer-back-raw-edges-men.jpg",
      "/deconstructed-blazer-detail-construction-men.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Wool Blend", "Unstructured", "Raw edge details", "Asymmetric cut", "Made in Japan"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#808080" },
    ],
  },
  {
    id: 23,
    name: "Asymmetric Leather Jacket",
    price: 1590,
    category: "Outerwear",
    gender: "men",
    description:
      "Edgy asymmetric leather jacket with an off-center zip and draped collar. The sculptural design creates a bold, rebellious aesthetic.",
    images: [
      "/asymmetric-leather-jacket-front-view-men.jpg",
      "/asymmetric-leather-jacket-side-zip-men.jpg",
      "/asymmetric-leather-jacket-detail-collar-men.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Lambskin Leather", "Asymmetric zip", "Draped collar", "Slim fit", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#5C4033" },
    ],
  },
  {
    id: 24,
    name: "Draped Cotton Shirt",
    price: 420,
    category: "Tops",
    gender: "men",
    description:
      "Minimal draped shirt in premium cotton. The fluid draping and clean lines create effortless sophistication.",
    images: [
      "/draped-cotton-shirt-front-view-men.jpg",
      "/draped-cotton-shirt-side-drape-men.jpg",
      "/draped-cotton-shirt-detail-fabric-men.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Cotton", "Draped construction", "Relaxed fit", "Button closure", "Made in Portugal"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#808080" },
    ],
  },
  {
    id: 25,
    name: "Oversized Knit Sweater",
    price: 580,
    category: "Tops",
    gender: "men",
    description:
      "Cozy oversized knit sweater with a relaxed silhouette. The chunky knit and soft texture create comfortable luxury.",
    images: [
      "/oversized-knit-sweater-front-view-men.jpg",
      "/oversized-knit-sweater-side-texture-men.jpg",
      "/oversized-knit-sweater-detail-knit-men.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Merino Wool", "Oversized fit", "Ribbed cuffs", "Crew neck", "Made in Scotland"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Cream", hex: "#F5F5DC" },
      { name: "Navy", hex: "#1A1A2E" },
    ],
  },
  {
    id: 26,
    name: "Asymmetric Hem Tee",
    price: 290,
    category: "Tops",
    gender: "men",
    description: "Avant-garde t-shirt with asymmetric hemline. The innovative cut adds edge to a wardrobe essential.",
    images: [
      "/asymmetric-hem-tee-men-avant-garde.jpg",
      "/asymmetric-hem-tee-men-avant-garde.jpg",
      "/asymmetric-hem-tee-men-avant-garde.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Cotton", "Asymmetric hem", "Relaxed fit", "Crew neck", "Made in Portugal"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Grey", hex: "#808080" },
    ],
  },
  {
    id: 27,
    name: "Wide Leg Trousers",
    price: 650,
    category: "Bottoms",
    gender: "men",
    description:
      "Tailored wide-leg trousers with a flowing silhouette. The elegant drape and refined cut create sophisticated ease.",
    images: [
      "/wide-leg-trousers-men-tailored.jpg",
      "/wide-leg-trousers-men-tailored.jpg",
      "/wide-leg-trousers-men-tailored.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Wool Blend", "Wide-leg fit", "Pleated front", "Side pockets", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#808080" },
      { name: "Navy", hex: "#1A1A2E" },
    ],
  },
  {
    id: 28,
    name: "Cargo Pants",
    price: 520,
    category: "Bottoms",
    gender: "men",
    description:
      "Utility-inspired cargo pants with multiple pockets. The functional design meets contemporary fashion in a versatile silhouette.",
    images: [
      "/cargo-pants-men-utility-fashion.jpg",
      "/cargo-pants-men-utility-fashion.jpg",
      "/cargo-pants-men-utility-fashion.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Cotton Twill", "Multiple pockets", "Relaxed fit", "Drawstring waist", "Made in Japan"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Khaki", hex: "#C3B091" },
    ],
  },
  {
    id: 29,
    name: "Leather Pants",
    price: 980,
    category: "Bottoms",
    gender: "men",
    description:
      "Edgy leather pants with a slim fit. The structured material and sleek silhouette create a bold, rock-inspired aesthetic.",
    images: [
      "/leather-pants-men-edgy-fashion.jpg",
      "/leather-pants-men-edgy-fashion.jpg",
      "/leather-pants-men-edgy-fashion.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Lambskin Leather", "Slim fit", "Zip fly", "Side pockets", "Made in Italy"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#5C4033" },
    ],
  },
  {
    id: 30,
    name: "Drop Crotch Pants",
    price: 720,
    category: "Bottoms",
    gender: "men",
    description:
      "Avant-garde drop crotch pants with an unconventional silhouette. The low-slung design creates a distinctive, rebellious look.",
    images: [
      "/drop-crotch-pants-men-avant-garde.jpg",
      "/drop-crotch-pants-men-avant-garde.jpg",
      "/drop-crotch-pants-men-avant-garde.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Cotton Blend", "Drop crotch", "Tapered leg", "Elastic waist", "Made in Japan"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Charcoal", hex: "#36454F" },
    ],
  },
]

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id)
}

export function getRelatedProducts(currentProductId: number, limit = 4): Product[] {
  const currentProduct = getProductById(currentProductId)
  if (!currentProduct) return []

  // Get products from the same category or gender, excluding current product
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProductId && (p.category === currentProduct.category || p.gender === currentProduct.gender),
    )
    .slice(0, limit)

  return related
}
