export type OfferType = 'rent' | 'sale' | 'tailoring'

export type ProductOffer = {
  type: OfferType
  price: number
  // Ijarada qaytariladigan garov, boshqa turlarda null
  deposit: number | null
}

export type ProductSize = {
  label: string
  available: boolean
}

export type Product = {
  id: number
  name: string
  description: string
  categoryId: number
  subcategoryId: number
  images: string[]
  isNew: boolean
  offers: ProductOffer[]
  sizes: ProductSize[]
  createdAt: string // ISO sana
}

// Katalog filtri: to'liq tanlangan kategoriyalar va alohida tanlangan subkategoriyalar.
// Ikkalasi bo'sh bo'lsa, barcha mahsulotlar
export type ProductFilter = {
  categoryIds: number[]
  subcategoryIds: number[]
}

export type ProductListParams = ProductFilter & {
  page: number
  pageSize: number
}

export type ProductListResponse = {
  items: Product[]
  total: number
  page: number
  hasMore: boolean
}
