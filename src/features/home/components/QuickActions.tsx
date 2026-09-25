import { LuMapPin, LuPhone, LuShare2 } from 'react-icons/lu'
import type { Store } from '@/api/routes/store/store.types'
import type { ContactKind } from '../types'

type QuickActionsProps = {
  store: Store
  onSelect: (kind: ContactKind) => void
}

export function QuickActions({ store, onSelect }: QuickActionsProps) {
  const actions = [
    {
      kind: 'socials' as const,
      title: 'Tarmoqlar',
      caption: `${store.socials.length} ta sahifa`,
      icon: <LuShare2 aria-hidden className="size-6" />,
    },
    {
      kind: 'addresses' as const,
      title: 'Manzillar',
      caption: `${store.addresses.length} ta salon`,
      icon: <LuMapPin aria-hidden className="size-6" />,
    },
    {
      kind: 'phones' as const,
      title: 'Kontaktlar',
      caption: `${store.phones.length} ta raqam`,
      icon: <LuPhone aria-hidden className="size-6" />,
    },
  ]

  return (
    <ul className="grid grid-cols-3 gap-2">
      {actions.map((action) => (
        <li key={action.kind}>
          <button
            type="button"
            onClick={() => onSelect(action.kind)}
            aria-haspopup="dialog"
            className="glass flex min-h-24 w-full flex-col items-center justify-center gap-1 rounded-md px-1"
          >
            <span className="text-accent">{action.icon}</span>
            <span className="text-sm font-semibold text-text">{action.title}</span>
            <span className="text-xs text-muted">{action.caption}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
