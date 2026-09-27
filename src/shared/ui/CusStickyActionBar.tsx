import type { ReactNode } from 'react'

type CusStickyActionBarProps = {
  children: ReactNode
}

// BottomNav ko'rinsa uning ustida (--bottom-nav-h, MainLayout'dan), aks holda ekran pastida turadi.
// Safe area'ni BottomNav egallamasa, panel o'zi pastdan shuncha joy qoldiradi.
// Ostida kontent qolmasligi uchun sahifa oxiriga taxminan h-24 bo'sh joy qo'yiladi.
// Ichidagi ikkinchi darajali tugma glass emas (blur ichida blur bo'lmaydi)
export function CusStickyActionBar({ children }: CusStickyActionBarProps) {
  return (
    <div className="glass-bar fixed inset-x-0 bottom-(--bottom-nav-h) z-30 pb-[max(0px,calc(env(safe-area-inset-bottom)-var(--bottom-nav-h)))]">
      <div className="gline" />
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">{children}</div>
    </div>
  )
}
