import { useRef } from 'react'
import type { PointerEvent } from 'react'

const SWIPE_DISTANCE = 60

type SwipeOptions = {
  // Kattalashtirilgan rasmda surish rasmni siljitadi, sahifani almashtirmaydi
  disabled: boolean
  onLeft: () => void
  onRight: () => void
  onDown: () => void
}

// Bir barmoq bilan surish: chapga/o'ngga yoki pastga. Ikki barmoqli ishora (pinch) hisobga olinmaydi.
// Capture bosqichida tinglanadi: ichidagi zoom kutubxonasi hodisalarni to'xtatsa ham yetib keladi
export function useSwipe({ disabled, onLeft, onRight, onDown }: SwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null)
  const activePointers = useRef(0)
  const isMultiTouch = useRef(false)

  const onPointerDownCapture = (event: PointerEvent<HTMLElement>) => {
    // isPrimary: birinchi barmoq yoki sichqoncha — hisoblagich har safar shu yerdan boshlanadi
    if (event.isPrimary) {
      activePointers.current = 1
      start.current = { x: event.clientX, y: event.clientY }
      isMultiTouch.current = false
    } else {
      activePointers.current += 1
      isMultiTouch.current = true
    }
  }

  const onPointerUpCapture = (event: PointerEvent<HTMLElement>) => {
    activePointers.current = Math.max(0, activePointers.current - 1)
    if (activePointers.current > 0 || !start.current) return

    const dx = event.clientX - start.current.x
    const dy = event.clientY - start.current.y
    start.current = null
    if (disabled || isMultiTouch.current) return

    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onLeft()
      else onRight()
    } else if (dy > SWIPE_DISTANCE && dy > Math.abs(dx)) {
      onDown()
    }
  }

  const onPointerCancelCapture = () => {
    activePointers.current = Math.max(0, activePointers.current - 1)
    isMultiTouch.current = true
  }

  return { onPointerDownCapture, onPointerUpCapture, onPointerCancelCapture }
}
