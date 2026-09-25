import { LuGrid2X2, LuGrid3X3, LuShapes, LuSquare } from 'react-icons/lu'
import { SegmentedControl } from '@/shared/ui/SegmentedControl'
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

        {columns && (
          <SegmentedControl
            aria-label="Ko'rinish"
            size="sm"
            options={COLUMN_OPTIONS}
            value={columns}
            onChange={onColumnsChange}
            className="ml-auto w-fit"
          />
        )}
      </div>
      <div className="gline" />
    </div>
  )
}
