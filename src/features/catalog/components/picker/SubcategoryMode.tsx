import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowLeft } from 'react-icons/lu'
import type { Category } from '@/api/routes/categories/categories.types'
import { fadeSwap } from '@/lib/motion'
import { CusButton } from '@/shared/ui/CusButton'
import { CusCategoryTile } from '@/shared/ui/CusCategoryTile'
import type { SelectionDraft } from '../../hooks/useSelectionDraft'
import { CategoryRail } from './CategoryRail'

type SubcategoryModeProps = {
  categories: Category[]
  activeCategory: Category
  selection: SelectionDraft
  onSelectCategory: (categoryId: number) => void
  onShowAll: () => void
}

// B rejim: chapda kategoriyalar tasmasi, o'ngda faol kategoriyaning subkategoriyalari
export function SubcategoryMode({
  categories,
  activeCategory,
  selection,
  onSelectCategory,
  onShowAll,
}: SubcategoryModeProps) {
  const categoryState = selection.categoryState(activeCategory)

  return (
    <div className="flex gap-3">
      <CategoryRail
        categories={categories}
        activeId={activeCategory.id}
        selection={selection}
        onSelect={onSelectCategory}
        onShowAll={onShowAll}
      />

      {/* Boshqa kategoriya tanlanganda faqat o'ng qism almashadi, tasma joyida qoladi */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={activeCategory.id}
          variants={fadeSwap}
          initial="enter"
          animate="center"
          exit="exit"
          aria-labelledby="picker-subcategories"
          className="flex min-w-0 flex-1 flex-col gap-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1">
              <CusButton
                variant="icon"
                aria-label="Kategoriyalarga qaytish"
                onClick={onShowAll}
                icon={<LuArrowLeft aria-hidden className="size-5" />}
              />
              <h2 id="picker-subcategories" className="truncate text-[17px] font-bold text-text">
                {activeCategory.name}
              </h2>
            </div>
            <span className="shrink-0 text-xs text-muted" aria-live="polite">
              Tanlandi: <span className="font-semibold text-text">{selection.selectedCount(activeCategory)}</span>
            </span>
          </div>

          <CusCategoryTile
            layout="banner"
            image={activeCategory.image}
            label="Barcha modellar"
            count={activeCategory.productCount}
            state={categoryState}
            onToggle={() => selection.toggleCategory(activeCategory)}
          />

          <ul className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-3">
            {activeCategory.subcategories.map((subcategory) => (
              <li key={subcategory.id}>
                <CusCategoryTile
                  image={subcategory.image}
                  label={subcategory.name}
                  count={subcategory.productCount}
                  state={selection.isSubcategorySelected(activeCategory, subcategory.id) ? 'all' : 'none'}
                  onToggle={() => selection.toggleSubcategory(activeCategory, subcategory.id)}
                />
              </li>
            ))}
          </ul>
        </motion.section>
      </AnimatePresence>
    </div>
  )
}
