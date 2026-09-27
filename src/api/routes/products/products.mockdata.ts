import { mockImage } from '@/lib/mockImage'
import { categoriesMock } from '../categories/categories.mockdata'
import type { Category, Subcategory } from '../categories/categories.types'
import type { Product, ProductDiscount, ProductPhoto, ProductSize, ProductVariant } from './products.types'

const NAMES = [
  'Chelsi', 'Shanel', 'Maryam', 'Amina', 'Laylo', 'Sabina', 'Dilnoza', 'Madina', 'Zarina', 'Nilufar',
  'Malika', 'Oydin', 'Sevara', 'Munisa', 'Kamola', 'Gulnora', 'Farida', 'Robiya', 'Yasmina', 'Durdona',
]

const BRANDS = ['Chelsi Bridal', 'Amira Couture', 'Zara', 'Oscar Fashion', 'Milano Style']
const MANUFACTURES = ["O'zbekiston", 'Turkiya', 'Italiya', 'Xitoy']

// Kategoriya bo'yicha asosiy narxlar (so'm). Mahsulotlar orasida 0–40% farq qo'shiladi
const BASE_PRICES: Record<number, { rent?: number; sale: number; tailoring?: number }> = {
  1: { rent: 2_000_000, sale: 8_000_000, tailoring: 9_500_000 },
  2: { sale: 180_000 },
  3: { sale: 450_000 },
  4: { rent: 300_000, sale: 900_000 },
  5: { sale: 120_000 },
  6: { rent: 250_000, sale: 650_000 },
  7: { sale: 150_000 },
  8: { sale: 350_000 },
  9: { rent: 200_000, sale: 550_000 },
  10: { sale: 180_000 },
}

const DRESS_SIZES = ['42 (S)', '44 (M)', '46 (L)', '48 (XL)', '50 (XXL)']
const SHOE_SIZES = ['36', '37', '38', '39', '40']

const roundPrice = (value: number) => Math.round(value / 10_000) * 10_000

// Faqat liboslar (1) va poyabzal (3) uchun o'lchamlar, qolgan kategoriyalarda bo'sh
function sizesFor(categoryId: number, id: number): ProductSize[] {
  const labels = categoryId === 1 ? DRESS_SIZES : categoryId === 3 ? SHOE_SIZES : []
  return labels.map((label, index) => ({ label, available: (index + id) % 4 !== 3 }))
}

const slugify = (name: string, id: number) =>
  `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`

// Har bir variant — alohida rasmlar to'plami (3–5 ta). Id'lar butun mock bo'ylab takrorlanmaydi
function photosFor(id: number, variantIndex: number): ProductPhoto[] {
  const count = 3 + ((id + variantIndex) % 3)
  return Array.from({ length: count }, (_, index) => ({
    id: id * 100 + variantIndex * 10 + index,
    image: mockImage(`product-${id}-${variantIndex}-${index}`, 600, 800),
  }))
}

// 1–3 ta variant (id=2 da 3 ta)
function variantsFor(id: number): ProductVariant[] {
  const count = 1 + (id % 3)
  return Array.from({ length: count }, (_, variantIndex) => ({
    id: id * 10 + variantIndex,
    photos: photosFor(id, variantIndex),
  }))
}

function discountsFor(id: number): ProductDiscount[] {
  if (id % 6 !== 0) return []
  return [
    {
      id,
      title: 'Mavsumiy chegirma',
      discountType: 'percentage',
      value: 10 + (id % 3) * 5,
      endsAt: new Date(Date.UTC(2026, 9, 30)).toISOString(),
    },
  ]
}

const DAY_MS = 86_400_000
const HOUR_MS = 3_600_000

// Sanalar bugundan orqaga (~2 oy): kuniga ~2 ta mahsulot, har 7-mahsulotda bir kun sakraydi (kalendarda bo'sh
// kunlar chiqadi). Bugunga nisbatan hisoblangani uchun "Yangi" belgisi (oxirgi 7 kun) doim bir nechtasida chiqadi
function createdAtFor(id: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayOffset = Math.floor((id - 1) / 2) + Math.floor(id / 7)
  return new Date(today.getTime() - dayOffset * DAY_MS + (9 + (id % 9)) * HOUR_MS).toISOString()
}

function buildProduct(id: number, category: Category, subcategory: Subcategory, createdAt: string): Product {
  const base = BASE_PRICES[category.id] ?? { sale: 200_000 }
  const factor = 1 + (id % 5) * 0.1
  const name = NAMES[(id - 1) % NAMES.length]

  return {
    id,
    storeId: 1,
    name,
    slug: slugify(name, id),
    description: `${subcategory.name}. Aniq tavsif va o'lchamlarni salonda aniqlashtiring.`,
    categoryId: category.id,
    subcategoryId: subcategory.id,
    brand: BRANDS[id % BRANDS.length],
    manufacture: MANUFACTURES[id % MANUFACTURES.length],
    materialIds: [1 + (id % 6)],
    tagIds: [1 + (id % 4)],
    colorId: 1 + (id % 8),
    sizes: sizesFor(category.id, id),
    variants: variantsFor(id),
    discounts: discountsFor(id),
    priceRental: base.rent ? roundPrice(base.rent * factor) : null,
    priceSale: roundPrice(base.sale * factor),
    priceTailoring: base.tailoring ? roundPrice(base.tailoring * factor) : null,
    isSellable: true,
    isRentable: Boolean(base.rent),
    views: (id * 37) % 500,
    favoritesCount: (id * 13) % 60,
    createdAt,
    updatedAt: createdAt,
  }
}

// Aniq sanada qo'shilgan mahsulotlar (ro'yxat oxiriga, mavjudlarining id va sanalari o'zgarmaydi).
// categoriesMock'dagi productCount ular bilan birga hisoblangan
const DATED_PRODUCTS = [
  { subcategoryId: 101, createdAt: '2026-09-26T10:00:00+05:00' },
  { subcategoryId: 101, createdAt: '2026-09-26T12:30:00+05:00' },
  { subcategoryId: 102, createdAt: '2026-09-26T15:00:00+05:00' },
  { subcategoryId: 103, createdAt: '2026-09-26T18:45:00+05:00' },
]

const datedCountIn = (subcategoryId: number) =>
  DATED_PRODUCTS.filter((item) => item.subcategoryId === subcategoryId).length

let nextId = 1

// categoriesMock'dagi har bir subkategoriya uchun productCount ta mahsulot (aniq sanalilari ayirib)
const generatedProducts = categoriesMock.flatMap((category) =>
  category.subcategories.flatMap((subcategory) =>
    Array.from({ length: subcategory.productCount - datedCountIn(subcategory.id) }, () => {
      const id = nextId++
      return buildProduct(id, category, subcategory, createdAtFor(id))
    }),
  ),
)

const datedProducts = DATED_PRODUCTS.map(({ subcategoryId, createdAt }) => {
  const category = categoriesMock.find((item) => item.subcategories.some((sub) => sub.id === subcategoryId))
  const subcategory = category?.subcategories.find((sub) => sub.id === subcategoryId)
  if (!category || !subcategory) throw new Error(`Mock: ${subcategoryId} subkategoriyasi topilmadi`)
  // toISOString: barcha sanalar bir xil formatda (UTC, "Z"), aks holda satr bo'yicha tartiblash buziladi
  return buildProduct(nextId++, category, subcategory, new Date(createdAt).toISOString())
})

export const productsMock: Product[] = [...generatedProducts, ...datedProducts]
