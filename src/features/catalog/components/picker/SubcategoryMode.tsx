import { AnimatePresence, motion } from 'framer-motion'
import type { Category } from '@/api/routes/categories/categories.types'
import { fadeSwap } from '@/lib/motion'
import { CategoryTile } from '@/shared/ui/CategoryTile'
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
          <div className="flex items-baseline justify-between gap-2">
            <h2 id="picker-subcategories" className="truncate text-[17px] font-bold text-text">
              {activeCategory.name}
            </h2>
            <span className="shrink-0 text-xs text-muted" aria-live="polite">
              Tanlandi: <span className="font-semibold text-text">{selection.selectedCount(activeCategory)}</span>
            </span>
          </div>

          <CategoryTile
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
                <CategoryTile
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
