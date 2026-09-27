import type { News } from './news.types'

export const newsMock: News[] = [
  {
    id: 1,
    storeId: 1,
    title: '2026 kolleksiyasi salonda',
    newsType: 'event',
    slug: '2026-kolleksiyasi-salonda',
    description:
      "Yangi kolleksiyada o'n ikkita model bor: shleyfli hajmdor siluetlar, qo'lda tikilgan to'r va marvarid bezaklari. Barcha liboslarni Chilonzor va Yunusobod salonlarida kiyib ko'rish mumkin. Kiyib ko'rish uchun oldindan qo'ng'iroq qilib vaqt belgilang.",
    startsAt: '2026-08-01T00:00:00Z',
    endsAt: '2026-12-31T00:00:00Z',
  },
  {
    id: 2,
    storeId: 1,
    title: "Qaysi siluet sizga mos: qisqa qo'llanma",
    newsType: 'other',
    slug: 'qaysi-siluet-sizga-mos',
    description:
      "A-siluet deyarli barcha qomatlarga mos keladi va belni ajratib ko'rsatadi. «Suv parisi» bichimi baland bo'yli kelinlar uchun yaxshi tanlov. To'g'ri bichim esa minimalistik uslubni yoqtiradiganlarga mos. Maslahatchilarimiz salonda sizga mos siluetni tanlashda yordam beradi.",
    startsAt: '2026-07-20T00:00:00Z',
    endsAt: '2026-12-31T00:00:00Z',
  },
  {
    id: 3,
    storeId: 1,
    title: 'Samarqandda yangi salon ochildi',
    newsType: 'event',
    slug: 'samarqandda-yangi-salon-ochildi',
    description:
      "Samarqanddagi yangi salonimizda butun kolleksiya, fatalar va aksessuarlar bor. Ochilish munosabati bilan birinchi oy davomida kiyib ko'rish va o'lchamga moslash bepul.",
    startsAt: '2026-07-05T00:00:00Z',
    endsAt: '2026-12-31T00:00:00Z',
  },
  {
    id: 4,
    storeId: 1,
    title: "Kuzgi mavsumga −20% chegirma",
    newsType: 'discount',
    slug: 'kuzgi-mavsumga-chegirma',
    description:
      "Nikoh liboslari va kechki liboslar toifasidagi barcha mahsulotlarga −20% chegirma. Aksiya cheklangan miqdordagi modellar uchun amal qiladi.",
    startsAt: '2026-09-01T00:00:00Z',
    endsAt: '2026-10-15T00:00:00Z',
  },
  {
    id: 5,
    storeId: 1,
    title: 'Ijaraga −15%: hafta ichi kunlarda',
    newsType: 'discount',
    slug: 'ijaraga-chegirma',
    description:
      "Dushanbadan Payshanbagacha rasmiylashtirilgan ijara buyurtmalariga −15% chegirma. Chegirma garov summasiga tegishli emas.",
    startsAt: '2026-09-15T00:00:00Z',
    endsAt: '2026-11-30T00:00:00Z',
  },
]
