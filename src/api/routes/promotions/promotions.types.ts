export type Promotion = {
  id: number
  title: string
  excerpt: string
  body: string
  cover: string | null
  discountPercent: number | null
  endsAt: string // ISO sana, aksiya shu kungacha amal qiladi
}
