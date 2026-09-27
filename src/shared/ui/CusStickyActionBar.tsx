import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'

type CusStickyActionBarProps = {
  children: ReactNode
}

// BottomNav ko'rinsa uning ustida (--bottom-nav-h, MainLayout'dan), aks holda ekran pastida turadi.
// Safe area'ni BottomNav egallamasa, panel o'zi pastdan shuncha joy qoldiradi.
// Panel fixed bo'lgani uchun joyida uning balandligicha bo'sh blok qoladi: sahifa oxiri panel ostida qolmaydi.
// Ichidagi ikkinchi darajali tugma glass emas (blur ichida blur bo'lmaydi)
export function CusStickyActionBar({ children }: CusStickyActionBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  // Balandlik kontentga (tugmalar, safe area) bog'liq, shuning uchun o'lchab olinadi
  useLayoutEffect(() => {
    const bar = barRef.current
    const spacer = spacerRef.current
    if (!bar || !spacer) return

    const observer = new ResizeObserver(() => {
      spacer.style.height = `${bar.offsetHeight}px`
    })
    observer.observe(bar, { box: 'border-box' })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={spacerRef} aria-hidden="true" />
      <div
        ref={barRef}
        className="glass-bar fixed inset-x-0 bottom-(--bottom-nav-h) z-30 pb-[max(0px,calc(env(safe-area-inset-bottom)-var(--bottom-nav-h)))]"
      >
        <div className="gline" />
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">{children}</div>
      </div>
    </>
  )
}
