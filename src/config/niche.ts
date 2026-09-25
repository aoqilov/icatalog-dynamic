// Nisha saytning rang palitrasini belgilaydi. Faqat asosiy ranglar shu yerda,
// qolganlari (chiziqlar, glass gradient, soyalar, fon dog'lari) glass.css'da shulardan hisoblanadi.
export type Niche = {
  id: string
  name: string
  // light: och brand, ustida to'q matn (oltin). dark: to'q brand, ustida och matn (yashil, qizil)
  tone: 'light' | 'dark'
  // Qorong'i mavzuda fon, kartochka va panellar qancha brand rangiga bo'yaladi (0–20, foiz). 0: sof neytral qora
  darkTint: number
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
    darkTint: 6,
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
    darkTint: 14,
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
    darkTint: 12,
    colors: {
      brand: '#9B1B30',
      brandInk: '#F7E9CC',
      textLight: '#8A1C2B',
      textDark: '#E3B574',
      blobA: '#1E3A6E',
      blobB: '#D9A441',
    },
  },
  // Ko'k: sapfir ko'k + osmon ko'k + kumush-kulrang
  blue: {
    id: 'blue',
    name: 'Sapfir',
    tone: 'dark',
    darkTint: 14,
    colors: {
      brand: '#1F4E9C',
      brandInk: '#F2F5FB',
      textLight: '#1F4E9C',
      textDark: '#8FB4F0',
      blobA: '#6FA8DC',
      blobB: '#B8C4D6',
    },
  },
  // Pushti: to'q malina-pushti + och pushti + lavanda
  pink: {
    id: 'pink',
    name: 'Atirgul',
    tone: 'dark',
    darkTint: 12,
    colors: {
      brand: '#B3164F',
      brandInk: '#FFF1F5',
      textLight: '#AD1457',
      textDark: '#F48FB1',
      blobA: '#9B8BD9',
      blobB: '#F6A5C0',
    },
  },
} satisfies Record<string, Niche>

// Nishani almashtirish uchun faqat shu qator o'zgaradi
export const NICHE: Niche = NICHES.bridal
