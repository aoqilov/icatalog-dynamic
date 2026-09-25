import { Link } from 'react-router'
import type { StoreStats as StoreStatsData } from '@/api/routes/store/store.types'
import { ROUTES } from '@/config/routes'

type StoreStatsProps = {
  stats: StoreStatsData
}

export function StoreStats({ stats }: StoreStatsProps) {
  const items = [
    { label: 'kategoriya', value: stats.categories },
    { label: 'subkategoriya', value: stats.subcategories },
    { label: 'mahsulot', value: stats.products },
  ]

  return (
    <ul className="grid grid-cols-3 divide-x divide-line">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={ROUTES.catalog}
            className="flex min-h-14 flex-col items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span className="text-[17px] font-bold text-text">{item.value}</span>
            <span className="text-xs text-muted">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
