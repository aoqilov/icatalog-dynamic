// Nisha saytning rang palitrasini belgilaydi. Faqat asosiy ranglar shu yerda,
// qolganlari (chiziqlar, glass gradient, soyalar, fon dog'lari) glass.css'da shulardan hisoblanadi.
export type Niche = {
  id: string
  name: string
  // light: och brand, ustida to'q matn (oltin). dark: to'q brand, ustida och matn (yashil, qizil)
  tone: 'light' | 'dark'
  colors: {
    brand: string // asosiy aksent: primary tugma va tanlangan holatlar
    brandInk: string // brand ustidagi matn, kamida 4.5:1 kontrast
    textLight: string // yorug' mavzuda aksent matn va havolalar
    textDark: string // qorong'i mavzuda aksent matn, nuqta va fokus halqasi
    blobA: string // fondagi o'ng-yuqori dog'
    blobB: string // fondagi chap-pastki dog'
  }
}

export const NICHES = {
  bridal: {
    id: 'bridal',
    name: 'Kelinlik liboslari',
    tone: 'light',
    colors: {
      brand: '#D8B238',
      brandInk: '#1F2A1C',
      textLight: '#7B6520',
      textDark: '#D8B238',
      blobA: '#136207',
      blobB: '#E89AAE',
    },
  },
  // Rolex uslubi: zumrad yashil + shampan oltin
  emerald: {
    id: 'emerald',
    name: 'Hashamatli klassika',
    tone: 'dark',
    colors: {
      brand: '#006039',
      brandInk: '#F4EBD0',
      textLight: '#006039',
      textDark: '#CBA85C',
      blobA: '#B8923A',
      blobB: '#0E3B2A',
    },
  },
  // Eron gilami uslubi: ro'yan qizili + lojuvard ko'k + za'faron
  persian: {
    id: 'persian',
    name: 'Sharqona naqsh',
    tone: 'dark',
    colors: {
      brand: '#9B1B30',
      brandInk: '#F7E9CC',
      textLight: '#8A1C2B',
      textDark: '#E3B574',
      blobA: '#1E3A6E',
      blobB: '#D9A441',
    },
  },
} satisfies Record<string, Niche>

// Nishani almashtirish uchun faqat shu qator o'zgaradi
export const NICHE: Niche = NICHES.emerald
