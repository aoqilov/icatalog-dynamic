import type { Category, Subcategory } from './categories.types'

// [id, nom, mahsulot soni]. products.mockdata har bir subkategoriya uchun aynan shuncha mahsulot yaratadi
type SubcategorySeed = [id: number, name: string, productCount: number]

const tree: { id: number; name: string; subcategories: SubcategorySeed[] }[] = [
  {
    id: 1,
    name: 'Liboslar',
    subcategories: [
      [101, 'Nikoh liboslari', 8],
      [102, 'Yopiq liboslar', 6],
      [103, 'Kechki liboslar', 5],
      [104, 'Milliy uslub', 4],
    ],
  },
  { id: 2, name: 'Hijoblar', subcategories: [[201, 'Ipak hijoblar', 6], [202, "To'rli hijoblar", 4]] },
  {
    id: 3,
    name: 'Poyabzal',
    subcategories: [
      [301, 'Klassik tuflilar', 4],
      [302, 'Gulli tuflilar', 3],
      [303, 'Kristalli tuflilar', 3],
      [304, 'Past poshnali', 2],
    ],
  },
  { id: 4, name: 'Fatalar', subcategories: [[401, 'Uzun fatalar', 5], [402, 'Qisqa fatalar', 3]] },
  { id: 5, name: 'Soch bezaklari', subcategories: [[501, 'Marvaridli', 4], [502, 'Gulli', 3]] },
  { id: 6, name: 'Tojlar', subcategories: [[601, 'Diademalar', 3], [602, 'Tojlar', 3]] },
  { id: 7, name: "Qo'lqoplar", subcategories: [[701, "To'rli", 3], [702, 'Atlas', 2]] },
  { id: 8, name: 'Sumkalar', subcategories: [[801, 'Klatchlar', 3], [802, 'Mini sumkalar', 3]] },
  {
    id: 9,
    name: 'Taqinchoqlar',
    subcategories: [
      [901, "Sirg'alar", 4],
      [902, 'Marjonlar', 3],
      [903, 'Bilaguzuklar', 3],
    ],
  },
  { id: 10, name: 'Aksessuarlar', subcategories: [[1001, 'Kamarlar', 2], [1002, 'Broshlar', 3]] },
]

export const categoriesMock: Category[] = tree.map((category) => {
  const subcategories: Subcategory[] = category.subcategories.map(([id, name, productCount]) => ({
    id,
    categoryId: category.id,
    name,
    image: null,
    productCount,
  }))

  return {
    id: category.id,
    name: category.name,
    image: null,
    productCount: subcategories.reduce((sum, item) => sum + item.productCount, 0),
    subcategories,
  }
})
