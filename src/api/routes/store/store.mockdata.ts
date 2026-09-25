import { categoriesMock } from '../categories/categories.mockdata'
import { productsMock } from '../products/products.mockdata'
import type { Store } from './store.types'

export const storeMock: Store = {
  id: 1,
  name: 'Amira Bridal',
  avatar: null,
  cover: null,
  // Katalog mock'idan hisoblanadi, raqamlar bir-biriga mos bo'lishi uchun
  stats: {
    categories: categoriesMock.length,
    subcategories: categoriesMock.reduce((sum, category) => sum + category.subcategories.length, 0),
    products: productsMock.length,
  },
  socials: [
    { platform: 'instagram', handle: '@amira_bridal', url: 'https://www.instagram.com/' },
    { platform: 'telegram', handle: '@amira_bridal', url: 'https://t.me/' },
    { platform: 'tiktok', handle: '@amira.bridal', url: 'https://www.tiktok.com/' },
    { platform: 'youtube', handle: 'Amira Bridal', url: 'https://www.youtube.com/' },
    { platform: 'facebook', handle: 'Amira Bridal', url: 'https://www.facebook.com/' },
  ],
  addresses: [
    {
      id: 1,
      title: 'Chilonzor salon',
      address: "Toshkent, Chilonzor tumani, Bunyodkor ko'chasi, 12",
      workHours: 'Har kuni 10:00–20:00',
      mapUrl: 'https://yandex.uz/maps/',
    },
    {
      id: 2,
      title: 'Yunusobod salon',
      address: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi, 108",
      workHours: 'Du–Sha 10:00–19:00',
      mapUrl: 'https://yandex.uz/maps/',
    },
    {
      id: 3,
      title: 'Samarqand salon',
      address: "Samarqand, Registon ko'chasi, 5",
      workHours: 'Har kuni 09:00–18:00',
      mapUrl: 'https://yandex.uz/maps/',
    },
  ],
  phones: [
    { id: 1, label: 'Chilonzor salon', number: '+998 90 123 45 67' },
    { id: 2, label: 'Yunusobod salon', number: '+998 91 234 56 78' },
    { id: 3, label: 'Samarqand salon', number: '+998 93 345 67 89' },
  ],
}
