import type { ReactNode } from 'react'

type CusStickyActionBarProps = {
  children: ReactNode
}

// Mobilda BottomNav ustida (4rem + safe area), md'dan kattada ekran pastida qotib turadi.
// Ostida kontent qolmasligi uchun sahifa oxiriga taxminan h-24 bo'sh joy qo'yiladi.
// Ichidagi ikkinchi darajali tugma glass emas (blur ichida blur bo'lmaydi)
export function CusStickyActionBar({ children }: CusStickyActionBarProps) {
  return (
    <div className="glass-bar fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 md:bottom-0">
      <div className="gline" />
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">{children}</div>
    </div>
  )
}
