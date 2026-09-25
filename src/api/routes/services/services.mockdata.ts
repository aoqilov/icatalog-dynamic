import type { Service } from './services.types'

export const servicesMock: Service[] = [
  {
    id: 1,
    title: 'Libos ijarasi',
    icon: 'rent',
    description:
      "Ijara muddati 3 kungacha. Garov sifatida pasport yoki libos narxining 30% qoldiriladi, kimyoviy tozalash narxga kiritilgan.",
  },
  {
    id: 2,
    title: 'Sotuv',
    icon: 'sale',
    description:
      "Barcha liboslarni sotib olish mumkin. O'lchamga moslash bepul, yetkazib berish Toshkent bo'ylab 1 kunda.",
  },
  {
    id: 3,
    title: 'Buyurtma asosida tikish',
    icon: 'tailoring',
    description:
      "Eskiz va mato birga tanlanadi, tikish 3–6 hafta davom etadi. Jarayonda 2–3 marta kiyib ko'riladi.",
  },
  {
    id: 4,
    title: "Bepul kiyib ko'rish",
    icon: 'fitting',
    description:
      "Salonda istalgan 5 ta libosni bepul kiyib ko'rish mumkin. Oldindan qo'ng'iroq qilib vaqt belgilang.",
  },
]
