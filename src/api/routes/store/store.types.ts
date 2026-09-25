export type SocialPlatform = 'instagram' | 'telegram' | 'tiktok' | 'youtube' | 'facebook'

export type StoreSocial = {
  platform: SocialPlatform
  handle: string
  url: string
}

export type StoreAddress = {
  id: number
  title: string
  address: string
  workHours: string
  mapUrl: string
}

export type StorePhone = {
  id: number
  label: string
  number: string
}

export type StoreStats = {
  categories: number
  subcategories: number
  products: number
}

export type Store = {
  id: number
  name: string
  avatar: string | null
  cover: string | null
  stats: StoreStats
  socials: StoreSocial[]
  addresses: StoreAddress[]
  phones: StorePhone[]
}
