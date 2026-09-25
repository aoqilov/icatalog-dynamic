import type { Promotion } from './promotions.types'

export const promotionsMock: Promotion[] = [
  {
    id: 1,
    title: "Kuzgi to'ylar uchun ijara",
    excerpt: "Sentyabr–oktyabr to'ylari uchun barcha liboslar ijarasiga chegirma.",
    body: "Sentyabr va oktyabr oylaridagi to'ylar uchun barcha liboslar ijarasiga 20% chegirma. Chegirma fata va aksessuarlarga ham tegishli. Band qilish uchun salonga qo'ng'iroq qiling.",
    cover: null,
    discountPercent: 20,
    endsAt: '2026-10-31',
  },
  {
    id: 2,
    title: "Libos + fata to'plami",
    excerpt: 'Libos sotib olganlarga fata va soch bezagi sovg\'a.',
    body: "Istalgan libosni sotib olsangiz, fata va soch bezagini sovg'a qilamiz. Aksiya barcha salonlarda amal qiladi.",
    cover: null,
    discountPercent: null,
    endsAt: '2026-09-30',
  },
  {
    id: 3,
    title: 'Buyurtma tikish: 2-kiyib ko\'rish bepul',
    excerpt: "Buyurtma asosida tikishda ikkinchi kiyib ko'rish va o'zgartirish bepul.",
    body: "Buyurtma asosida tikiladigan liboslarda ikkinchi kiyib ko'rish va unga bog'liq o'zgartirishlar bepul. Buyurtma avans to'lovidan keyin rasmiylashtiriladi.",
    cover: null,
    discountPercent: 15,
    endsAt: '2026-12-31',
  },
]
