// api.yaml: PublicStoreDetail (GET /public/stores/{id}/) — bitta fixed storeId bilan olinadi.
// social_links/addresses/contacts/services shu javob ichida keladi (mustaqil public endpoint'lari yo'q).

export type SocialPlatform = 'instagram' | 'telegram' | 'whatsapp' | 'vk' | 'tiktok' | 'youtube' | 'facebook' | 'other'

export type StoreSocial = {
  id: number
  platform: SocialPlatform
  nickname: string
  url: string
}

export type StoreAddress = {
  id: number
  name: string
  address: string
  landmark: string
  workingHours: string
  phone: string
}

export type StoreContact = {
  id: number
  name: string
  role: string
  phone: string
  hours: string
  telegram: string
  hasTelegram: boolean
}

// icon: backendda alohida katalog (stores/icons) — bu yerda mock uchun shu katalogning raqamli id'si
export type StoreService = {
  id: number
  iconId: number
  title: string
  kicker: string
  description: string
}

export type Store = {
  id: number
  name: string
  description: string
  phone: string
  email: string
  // Backendda yo'q (PublicStoreDetail'da avatar/cover maydoni mavjud emas), mock-only: StoreHero logo/muqova uchun
  avatar: string | null
  cover: string | null
  totalProducts: number
  totalCategories: number
  totalSubcategories: number
  socials: StoreSocial[]
  addresses: StoreAddress[]
  contacts: StoreContact[]
  services: StoreService[]
}
