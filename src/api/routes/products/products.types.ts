// api.yaml: PublicProduct (GET /public/products/{id}/, POST /public/products/get-all/)

export type ProductPhoto = {
  id: number
  image: string
}

export type ProductVariant = {
  id: number
  photos: ProductPhoto[]
}

export type DiscountType = 'fixed_amount' | 'percentage'

export type ProductDiscount = {
  id: number
  title: string
  discountType: DiscountType
  value: number
  endsAt: string // ISO sana-vaqt
}

// Backendda yo'q (PublicProduct'da faqat bitta `size` bor), mock-only: mahsulot sahifasidagi o'lcham tanlovi uchun
export type ProductSize = {
  label: string
  available: boolean
}

export type Product = {
  id: number
  storeId: number
  name: string
  slug: string
  description: string
  categoryId: number
  subcategoryId: number | null
  brand: string
  manufacture: string
  materialIds: number[]
  tagIds: number[]
  colorId: number | null
  sizes: ProductSize[]
  variants: ProductVariant[]
  discounts: ProductDiscount[]
  priceSale: number | null
  priceRental: number | null
  priceTailoring: number | null
  isSellable: boolean
  isRentable: boolean
  views: number
  favoritesCount: number
  createdAt: string // ISO sana-vaqt
  updatedAt: string // ISO sana-vaqt
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
