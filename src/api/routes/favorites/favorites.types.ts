// api.yaml: customers-favorites — sevimli mahsulotlar va do'konlar (add/remove/get-all)

export type FavoriteProduct = {
  id: number
  storeId: number
  name: string
  slug: string
  categoryId: number
  priceSale: number | null
  priceRental: number | null
  isSellable: boolean
  isRentable: boolean
}

export type FavoriteStore = {
  id: number
  name: string
  avatar: string | null
}

export type PaginatedResponse<T> = {
  items: T[]
  page: number
  totalPages: number
  total: number
}

export type PageParams = {
  page: number
  pageSize: number
}
