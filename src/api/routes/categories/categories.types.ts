export type Subcategory = {
  id: number
  categoryId: number
  name: string
  image: string | null
  productCount: number
}

export type Category = {
  id: number
  name: string
  image: string | null
  productCount: number
  subcategories: Subcategory[]
}
