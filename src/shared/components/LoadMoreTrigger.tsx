import { useEffect, useRef } from 'react'

type LoadMoreTriggerProps = {
  onLoadMore: () => void
  isLoading: boolean
}

// Ekranga yaqinlashganda keyingi sahifani o'zi yuklaydi. Tugma klaviatura va observer ishlamagan holat uchun
export function LoadMoreTrigger({ onLoadMore, isLoading }: LoadMoreTriggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || isLoading) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore()
      },
      { rootMargin: '400px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [onLoadMore, isLoading])

  return (
    <div ref={ref} className="flex justify-center py-2">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
        className="h-11 rounded-md border border-line px-5 text-sm font-semibold text-accent hover:bg-fill focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-60"
      >
        {isLoading ? 'Yuklanmoqda…' : "Yana ko'rsatish"}
      </button>
    </div>
  )
}
