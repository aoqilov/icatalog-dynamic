import { categoriesMock } from '../categories/categories.mockdata'
import type { Product, ProductOffer, ProductSize } from './products.types'

const NAMES = [
  'Chelsi', 'Shanel', 'Maryam', 'Amina', 'Laylo', 'Sabina', 'Dilnoza', 'Madina', 'Zarina', 'Nilufar',
  'Malika', 'Oydin', 'Sevara', 'Munisa', 'Kamola', 'Gulnora', 'Farida', 'Robiya', 'Yasmina', 'Durdona',
]

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

function offersFor(categoryId: number, id: number): ProductOffer[] {
  const base = BASE_PRICES[categoryId] ?? { sale: 200_000 }
  const factor = 1 + (id % 5) * 0.1
  const offers: ProductOffer[] = []

  if (base.rent) {
    offers.push({ type: 'rent', price: roundPrice(base.rent * factor), deposit: roundPrice((base.rent * factor) / 2) })
  }
  offers.push({ type: 'sale', price: roundPrice(base.sale * factor), deposit: null })
  if (base.tailoring) {
    offers.push({ type: 'tailoring', price: roundPrice(base.tailoring * factor), deposit: null })
  }
  return offers
}

function sizesFor(categoryId: number, id: number): ProductSize[] {
  const labels = categoryId === 1 ? DRESS_SIZES : categoryId === 3 ? SHOE_SIZES : []
  return labels.map((label, index) => ({ label, available: (index + id) % 4 !== 3 }))
}

let nextId = 1

// categoriesMock'dagi har bir subkategoriya uchun productCount ta mahsulot
export const productsMock: Product[] = categoriesMock.flatMap((category) =>
  category.subcategories.flatMap((subcategory) =>
    Array.from({ length: subcategory.productCount }, (): Product => {
      const id = nextId++
      return {
        id,
        name: NAMES[(id - 1) % NAMES.length],
        description: `${subcategory.name}. Aniq tavsif va o'lchamlarni salonda aniqlashtiring.`,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        images: [],
        isNew: id % 4 === 1,
        offers: offersFor(category.id, id),
        sizes: sizesFor(category.id, id),
        createdAt: new Date(Date.UTC(2026, 7, 1) - id * 86_400_000).toISOString().slice(0, 10),
      }
    }),
  ),
)
