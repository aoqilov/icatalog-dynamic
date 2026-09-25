import type { Category } from '@/api/routes/categories/categories.types'
import { CategoryTile } from '@/shared/ui/CategoryTile'
import type { SelectionDraft } from '../../hooks/useSelectionDraft'

type CategoryGridModeProps = {
  categories: Category[]
  selection: SelectionDraft
  totalCount: number
  onOpen: (categoryId: number) => void
}

// A rejim: doira — butun kategoriyani belgilash, rasm — subkategoriyalarni ochish (B rejim)
export function CategoryGridMode({ categories, selection, totalCount, onOpen }: CategoryGridModeProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Bo'sh tanlov = barcha mahsulotlar */}
      <CategoryTile
        layout="banner"
        image={null}
        label="Barcha mahsulotlar"
        count={totalCount}
        state={selection.isEmpty ? 'all' : 'none'}
        onToggle={selection.reset}
      />

      <ul className="grid grid-cols-3 gap-x-2 gap-y-3 sm:grid-cols-4">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryTile
              image={category.image}
              label={category.name}
              count={category.productCount}
              state={selection.categoryState(category)}
              onToggle={() => selection.toggleCategory(category)}
              onOpen={() => onOpen(category.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
