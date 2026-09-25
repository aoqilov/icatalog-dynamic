import { LuCheck, LuImage, LuMinus } from 'react-icons/lu'

// none: tanlanmagan, some: qisman (ichidagi bir qismi), all: to'liq tanlangan
export type CheckState = 'none' | 'some' | 'all'

type CategoryTileProps = {
  image: string | null
  label: string
  count: number
  state: CheckState
  onToggle: () => void
  // Berilsa, rasm bosilganda ichkariga kiriladi (masalan, subkategoriyalar), belgilash faqat doira orqali
  onOpen?: () => void
  // banner: keng plitka, nom va son rasm ustida ("Barcha mahsulotlar")
  layout?: 'square' | 'banner'
  countLabel?: string
}

// Ramka glass emas (bg-tile): plitkalar ko'p, blur qatlamlar soni cheklangan
export function CategoryTile({
  image,
  label,
  count,
  state,
  onToggle,
  onOpen,
  layout = 'square',
  countLabel = 'ta mahsulot',
}: CategoryTileProps) {
  const isBanner = layout === 'banner'
  const isChecked = state !== 'none'

  return (
    <div className="relative">
      <div
        className={`rounded-tile border bg-tile p-[3px] transition-colors ${
          isChecked ? 'border-brand' : 'border-line'
        }`}
      >
        <button
          type="button"
          onClick={onOpen ?? onToggle}
          // onOpen bo'lmasa bu faqat sichqoncha/barmoq uchun katta maydon, klaviatura doiradan foydalanadi
          {...(onOpen
            ? { 'aria-label': `${label}: ichini ochish` }
            : { tabIndex: -1, 'aria-hidden': true })}
          className={`relative flex w-full items-center justify-center overflow-hidden rounded-[2px] bg-fill focus-visible:outline-2 focus-visible:outline-brand ${
            isBanner ? 'aspect-[5/2] bg-placeholder bg-(image:--blobs)' : 'aspect-square'
          }`}
        >
          {image ? (
            <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            !isBanner && <LuImage aria-hidden className="size-6 text-muted" />
          )}

          {/* Rasm ustidagi oq matn o'qilishi uchun qoplama */}
          {isBanner && image && <span className="absolute inset-0 bg-black/40" />}

          {isBanner && (
            <span className="relative flex flex-col items-center">
              <span className="text-[17px] font-bold text-white">{label}</span>
              <span className="text-xs font-semibold text-accent-on-image">
                {count} {countLabel}
              </span>
            </span>
          )}
        </button>
      </div>

      {!isBanner && (
        <p
          className={`mt-1 truncate text-center text-xs ${
            isChecked ? 'font-semibold text-accent' : 'font-medium text-text'
          }`}
        >
          {label}
        </p>
      )}

      <button
        type="button"
        role="checkbox"
        aria-checked={state === 'some' ? 'mixed' : state === 'all'}
        aria-label={`${label}: tanlash`}
        onClick={onToggle}
        className="group absolute top-0 left-0 flex size-11 items-start justify-start p-2 focus-visible:outline-none"
      >
        <span
          className={`flex size-6 items-center justify-center rounded-full group-focus-visible:outline-2 group-focus-visible:outline-offset-1 group-focus-visible:outline-brand ${
            isChecked ? 'glass-brand' : 'glass-on-image'
          }`}
        >
          {state === 'all' && <LuCheck aria-hidden className="size-4" strokeWidth={3} />}
          {state === 'some' && <LuMinus aria-hidden className="size-4" strokeWidth={3} />}
        </span>
      </button>

      {!isBanner && (
        <span className="glass-on-image pointer-events-none absolute top-2 right-2 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold">
          {count}
        </span>
      )}
    </div>
  )
}
