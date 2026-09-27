import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { LuGrid2X2, LuGrid3X3, LuSearch, LuShapes, LuSlidersHorizontal, LuSquare } from 'react-icons/lu'
import { CusButton } from '@/shared/ui/CusButton'
import { CusRightSheet } from '@/shared/ui/CusRightSheet'
import { CusSegment } from '@/shared/ui/CusSegment'
import type { GridColumns } from '../types'

type CatalogToolbarProps = {
  isPickerOpen: boolean
  onTogglePicker: () => void
  // Natijalarda tanlangan kategoriya/subkategoriyalar soni (tugmadagi badge)
  selectedCount: number
  // Faqat natijalarda beriladi
  columns?: GridColumns
  onColumnsChange: (columns: GridColumns) => void
}

const COLUMN_OPTIONS = [
  { value: 3 as const, icon: <LuGrid3X3 aria-hidden className="size-4.5" />, ariaLabel: '3 ustun' },
  { value: 2 as const, icon: <LuGrid2X2 aria-hidden className="size-4.5" />, ariaLabel: '2 ustun' },
  { value: 1 as const, icon: <LuSquare aria-hidden className="size-4.5" />, ariaLabel: '1 ustun' },
]

// Mobilda eng tepada (Header yashirilgan), md'dan kattada Header ostida qotib turadi
export function CatalogToolbar({
  isPickerOpen,
  onTogglePicker,
  selectedCount,
  columns,
  onColumnsChange,
}: CatalogToolbarProps) {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [isFilterOpen, setFilterOpen] = useState(false)

  return (
    <div className="glass-bar sticky top-0 z-30 md:top-[65px]">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-2 px-4">
        <button
          type="button"
          onClick={onTogglePicker}
          aria-pressed={isPickerOpen}
          className={`relative inline-flex h-10 items-center gap-2 rounded-pill px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
            isPickerOpen ? 'glass-brand' : 'border border-line text-text hover:bg-fill'
          }`}
        >
          <LuShapes aria-hidden className="size-4.5" />
          Kategoriyalar
          {!isPickerOpen && selectedCount > 0 && (
            <span className="glass-brand absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold">
              {selectedCount}
            </span>
          )}
        </button>

        {/* Ko'rinish, qidiruv, filtr — har doim o'ng chetda birga turadi */}
        <div className="ml-auto flex items-center gap-2">
          {columns && (
            <CusSegment
              aria-label="Ko'rinish"
              size="sm"
              options={COLUMN_OPTIONS}
              value={columns}
              onChange={onColumnsChange}
              className="w-fit"
            />
          )}
          <CusButton
            variant="icon"
            aria-label="Qidiruv"
            aria-pressed={isSearchOpen}
            onClick={() => setSearchOpen((open) => !open)}
            className={isSearchOpen ? 'text-accent' : ''}
            icon={<LuSearch aria-hidden className="size-4.5" />}
          />
          <CusButton
            variant="icon"
            aria-label="Filtr"
            aria-pressed={isFilterOpen}
            onClick={() => setFilterOpen(true)}
            icon={<LuSlidersHorizontal aria-hidden className="size-4.5" />}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isSearchOpen && (
          <motion.div
            key="search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 pb-3">
              <div className="flex h-11 flex-1 items-center gap-2 rounded-md border border-line bg-tile px-3">
                <LuSearch aria-hidden className="size-4.5 shrink-0 text-muted" />
                <input
                  type="search"
                  autoFocus
                  placeholder="Libos, fata, o'lcham, rang..."
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-text placeholder:text-muted focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gline" />

      {/* Filtr mazmuni hozircha funksiyasiz — keyinroq narx/rang/brend bo'yicha boshqaruvlar ulanadi */}
      <CusRightSheet isOpen={isFilterOpen} onClose={() => setFilterOpen(false)} title="Filtr" width="full">
        <p className="text-sm text-muted">Filtr paneli tez orada.</p>
      </CusRightSheet>
    </div>
  )
}
