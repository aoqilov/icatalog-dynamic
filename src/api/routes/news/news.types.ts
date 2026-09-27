// api.yaml: PublicStoreNews (GET /public/news/{id}/, POST /public/news/get-all/)

export type NewsType = 'event' | 'discount' | 'holiday' | 'other'

export type News = {
  id: number
  storeId: number
  title: string
  newsType: NewsType
  slug: string
  description: string
  startsAt: string // ISO sana-vaqt
  endsAt: string // ISO sana-vaqt
}
