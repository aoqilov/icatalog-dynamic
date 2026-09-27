import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId } from 'react'
import type { ReactNode } from 'react'
import { LuX } from 'react-icons/lu'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { fadeIn, slideInRight } from '@/lib/motion'

export type CusRightSheetWidth = 'full' | 'half' | 'quarter'

type CusRightSheetProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  // full: 100%, half: 50%, quarter: 25%
  width?: CusRightSheetWidth
  children: ReactNode
}

const widthClass: Record<CusRightSheetWidth, string> = {
  full: 'w-full',
  half: 'w-1/2',
  quarter: 'w-1/4',
}

// O'ngdan chiqadigan panel: fon yoki Escape bosilganda yopiladi, ochiq paytda sahifa scroll'i bloklanadi
export function CusRightSheet({ isOpen, onClose, title, width = 'half', children }: CusRightSheetProps) {
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
          key="right-sheet"
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-60 flex items-stretch justify-end"
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
            variants={slideInRight}
            className={`relative flex h-dvh min-w-60 flex-col bg-bg ${
              width === 'full' ? '' : 'rounded-l-md shadow-xl'
            } ${widthClass[width]}`}
          >
            <div className="flex items-center justify-between gap-3 py-2 pr-2 pl-4">
              <h2 id={titleId} className="truncate text-[17px] font-bold text-text">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Yopish"
                autoFocus
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-brand"
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
