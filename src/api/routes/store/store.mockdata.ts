import { mockImage } from '@/lib/mockImage'
import { categoriesMock } from '../categories/categories.mockdata'
import { productsMock } from '../products/products.mockdata'
import type { Store } from './store.types'

export const storeMock: Store = {
  id: 1,
  name: 'Amira Bridal',
  description: "Toshkentdagi nikoh liboslari saloni: ijara, sotuv va buyurtma asosida tikish.",
  phone: '+998 97 723 60 23',
  email: 'info@amirabridal.uz',
  avatar: mockImage('store-avatar', 300, 300),
  cover: mockImage('store-cover', 1200, 480),
  // Katalog mock'idan hisoblanadi, raqamlar bir-biriga mos bo'lishi uchun
  totalProducts: productsMock.length,
  totalCategories: categoriesMock.length,
  totalSubcategories: categoriesMock.reduce((sum, category) => sum + category.subcategories.length, 0),
  socials: [
    { id: 1, platform: 'instagram', nickname: '@amira_bridal', url: 'https://www.instagram.com/' },
    { id: 2, platform: 'telegram', nickname: '@akiylov', url: 'https://t.me/akiylov' },
    { id: 3, platform: 'tiktok', nickname: '@amira.bridal', url: 'https://www.tiktok.com/' },
    { id: 4, platform: 'youtube', nickname: 'Amira Bridal', url: 'https://www.youtube.com/' },
    { id: 5, platform: 'facebook', nickname: 'Amira Bridal', url: 'https://www.facebook.com/' },
  ],
  addresses: [
    {
      id: 1,
      name: 'Chilonzor salon',
      address: "Toshkent, Chilonzor tumani, Bunyodkor ko'chasi, 12",
      landmark: "Chilonzor metrosi yaqinida",
      workingHours: 'Har kuni 10:00–20:00',
      phone: '+998 90 123 45 67',
    },
    {
      id: 2,
      name: 'Yunusobod salon',
      address: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi, 108",
      landmark: "Minor savdo majmuasi yaqinida",
      workingHours: 'Du–Sha 10:00–19:00',
      phone: '+998 91 234 56 78',
    },
    {
      id: 3,
      name: 'Samarqand salon',
      address: "Samarqand, Registon ko'chasi, 5",
      landmark: "Registon maydoni yaqinida",
      workingHours: 'Har kuni 09:00–18:00',
      phone: '+998 93 345 67 89',
    },
  ],
  contacts: [
    { id: 1, name: 'Chilonzor salon', role: 'Administrator', phone: '+998 90 123 45 67', hours: '10:00–20:00', telegram: '@amira_chilonzor', hasTelegram: true },
    { id: 2, name: 'Yunusobod salon', role: 'Administrator', phone: '+998 91 234 56 78', hours: '10:00–19:00', telegram: '@amira_yunusobod', hasTelegram: true },
    { id: 3, name: 'Samarqand salon', role: 'Administrator', phone: '+998 93 345 67 89', hours: '09:00–18:00', telegram: '', hasTelegram: false },
  ],
  services: [
    {
      id: 1,
      iconId: 1,
      title: 'Libos ijarasi',
      kicker: '3 kungacha',
      description:
        "Ijara muddati 3 kungacha. Garov sifatida pasport yoki libos narxining 30% qoldiriladi, kimyoviy tozalash narxga kiritilgan.",
    },
    {
      id: 2,
      iconId: 2,
      title: 'Sotuv',
      kicker: 'Yetkazib berish bilan',
      description:
        "Barcha liboslarni sotib olish mumkin. O'lchamga moslash bepul, yetkazib berish Toshkent bo'ylab 1 kunda.",
    },
    {
      id: 3,
      iconId: 3,
      title: 'Buyurtma asosida tikish',
      kicker: '3–6 hafta',
      description:
        "Eskiz va mato birga tanlanadi, tikish 3–6 hafta davom etadi. Jarayonda 2–3 marta kiyib ko'riladi.",
    },
    {
      id: 4,
      iconId: 4,
      title: "Bepul kiyib ko'rish",
      kicker: 'Oldindan yozilib',
      description:
        "Salonda istalgan 5 ta libosni bepul kiyib ko'rish mumkin. Oldindan qo'ng'iroq qilib vaqt belgilang.",
    },
  ],
}
