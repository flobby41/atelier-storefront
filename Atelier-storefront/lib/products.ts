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
      "/luxurious-oversized-cashmere-coat-beige.jpg",
      "/luxurious-oversized-cashmere-coat-beige.jpg",
      "/luxurious-oversized-cashmere-coat-beige.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Cashmere", "Oversized fit", "Notched lapels", "Side pockets", "Made in Scotland"],
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
      "/elegant-pleated-midi-skirt-fashion-photography.jpg",
      "/elegant-pleated-midi-skirt-fashion-photography.jpg",
      "/elegant-pleated-midi-skirt-fashion-photography.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Silk", "Pleated construction", "Elastic waistband", "Midi length", "Made in Italy"],
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
      "/architectural-knit-dress-avant-garde-fashion.jpg",
      "/architectural-knit-dress-avant-garde-fashion.jpg",
      "/architectural-knit-dress-avant-garde-fashion.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Merino Wool Blend", "Sculptural construction", "Fitted silhouette", "Midi length", "Made in Japan"],
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
      "/elegant-silk-slip-dress-minimal-fashion.jpg",
      "/elegant-silk-slip-dress-minimal-fashion.jpg",
      "/elegant-silk-slip-dress-minimal-fashion.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Silk Charmeuse", "Bias cut", "Adjustable straps", "Midi length", "Made in France"],
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
      "/oversized-tailored-wool-blazer-women-fashion.jpg",
      "/oversized-tailored-wool-blazer-women-fashion.jpg",
      "/oversized-tailored-wool-blazer-women-fashion.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% Virgin Wool", "Oversized fit", "Notched lapels", "Single button closure", "Made in Italy"],
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
      "/draped-jersey-dress-minimal-elegant.jpg",
      "/draped-jersey-dress-minimal-elegant.jpg",
      "/draped-jersey-dress-minimal-elegant.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Viscose Jersey", "Draped construction", "Relaxed fit", "Midi length", "Made in Italy"],
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
      "/oversized-black-wool-coat-men-fashion.jpg",
      "/oversized-black-wool-coat-men-fashion.jpg",
      "/oversized-black-wool-coat-men-fashion.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Virgin Wool", "Oversized fit", "Notched lapels", "Double-breasted", "Made in Italy"],
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
      "/deconstructed-blazer-men-avant-garde.jpg",
      "/deconstructed-blazer-men-avant-garde.jpg",
      "/deconstructed-blazer-men-avant-garde.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Wool Blend", "Unstructured", "Raw edge details", "Asymmetric cut", "Made in Japan"],
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
      "/asymmetric-leather-jacket-men-edgy.jpg",
      "/asymmetric-leather-jacket-men-edgy.jpg",
      "/asymmetric-leather-jacket-men-edgy.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Lambskin Leather", "Asymmetric zip", "Draped collar", "Slim fit", "Made in Italy"],
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
      "/draped-cotton-shirt-men-minimal.jpg",
      "/draped-cotton-shirt-men-minimal.jpg",
      "/draped-cotton-shirt-men-minimal.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% Cotton", "Draped construction", "Relaxed fit", "Button closure", "Made in Portugal"],
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
      "/oversized-knit-sweater-men-cozy.jpg",
      "/oversized-knit-sweater-men-cozy.jpg",
      "/oversized-knit-sweater-men-cozy.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Merino Wool", "Oversized fit", "Ribbed cuffs", "Crew neck", "Made in Scotland"],
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
  },
  {
    id: 31,
    name: "Longline Cardigan",
    price: 680,
    category: "Outerwear",
    gender: "men",
    description:
      "Minimal longline cardigan with a flowing silhouette. The extended length and soft drape create elegant layering.",
    images: [
      "/longline-cardigan-men-minimal.jpg",
      "/longline-cardigan-men-minimal.jpg",
      "/longline-cardigan-men-minimal.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Merino Wool", "Longline cut", "Open front", "Side pockets", "Made in Scotland"],
  },
  {
    id: 32,
    name: "Structured Vest",
    price: 490,
    category: "Outerwear",
    gender: "men",
    description:
      "Tailored structured vest with clean lines. The refined cut and premium fabric create sophisticated layering.",
    images: [
      "/structured-vest-men-tailored.jpg",
      "/structured-vest-men-tailored.jpg",
      "/structured-vest-men-tailored.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Wool Blend", "Structured fit", "V-neck", "Button closure", "Made in Italy"],
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
