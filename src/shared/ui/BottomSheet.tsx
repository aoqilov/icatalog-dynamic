import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId } from 'react'
import type { ReactNode } from 'react'
import { LuX } from 'react-icons/lu'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { fadeIn, slideInUp } from '@/lib/motion'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Pastdan chiqadigan panel: fon yoki Escape bosilganda yopiladi, ochiq paytda sahifa scroll'i bloklanadi
export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const titleId = useId()
  useLockBodyScroll(isOpen)

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
            className="relative flex max-h-[85dvh] min-h-[50dvh] w-full max-w-md flex-col rounded-t-pill bg-bg pb-[env(safe-area-inset-bottom)] shadow-xl"
          >
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
