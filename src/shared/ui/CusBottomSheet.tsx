import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { useEffect, useId } from 'react'
import type { ReactNode } from 'react'
import { LuX } from 'react-icons/lu'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { fadeIn, slideInUp } from '@/lib/motion'

// Shundan ko'p pastga surilsa yoki shu tezlikdan tez surilsa, panel yopiladi
const CLOSE_DISTANCE = 100
const CLOSE_VELOCITY = 500

type CusBottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Pastdan chiqadigan panel: fon yoki Escape bosilganda yopiladi, ochiq paytda sahifa scroll'i bloklanadi
export function CusBottomSheet({ isOpen, onClose, title, children }: CusBottomSheetProps) {
  const titleId = useId()
  const dragControls = useDragControls()
  useLockBodyScroll(isOpen)

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    if (info.offset.y > CLOSE_DISTANCE || info.velocity.y > CLOSE_VELOCITY) onClose()
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="bottom-sheet"
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-end justify-center"
        >
          <motion.div
            variants={fadeIn}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/40"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={slideInUp}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 1 }}
            onDragEnd={handleDragEnd}
            className="relative flex max-h-[85dvh] min-h-[50dvh] w-full max-w-md flex-col rounded-t-pill bg-bg pb-[env(safe-area-inset-bottom)] shadow-xl"
          >
            {/* Faqat shu tutqich orqali suriladi (dragListener={false}), ichkaridagi kontent scroll'i bilan
                to'qnashmasligi uchun */}
            <div
              onPointerDown={(event) => dragControls.start(event)}
              className="flex justify-center py-2 touch-none"
            >
              <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-line" />
            </div>

            <div className="flex items-center justify-between gap-3 py-2 pr-2 pl-4">
              <h2 id={titleId} className="text-[17px] font-bold text-text">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Yopish"
                autoFocus
                className="flex size-11 items-center justify-center rounded-full text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-brand"
              >
                <LuX aria-hidden className="size-6" />
              </button>
            </div>
            <div className="gline" />
            <div className="overflow-y-auto px-4 py-3">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
