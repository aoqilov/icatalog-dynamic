import { useState } from 'react'
import { GridOneIcon, GridThreeIcon, GridTwoIcon } from '@/shared/ui/Icons'
import { SegmentedControl } from '@/shared/ui/SegmentedControl'
import { PlaygroundSection } from './PlaygroundSection'

const gridOptions = [
  { value: 3, icon: <GridThreeIcon className="size-5" />, ariaLabel: '3 ustun' },
  { value: 2, icon: <GridTwoIcon className="size-5" />, ariaLabel: '2 ustun' },
  { value: 1, icon: <GridOneIcon className="size-5" />, ariaLabel: '1 ustun' },
]

const tabOptions = [
  { value: 'generate', label: 'Generatsiya' },
  { value: 'images', label: 'Rasmlar' },
  { value: 'payment', label: "To'lov" },
]

const dealOptions = [
  { value: 'rent', label: 'Ijara' },
  { value: 'buy', label: 'Sotib olish' },
  { value: 'tailor', label: 'Tikish' },
]

export function SegmentedDemo() {
  const [columns, setColumns] = useState(2)
  const [tab, setTab] = useState('generate')
  const [deal, setDeal] = useState('rent')

  return (
    <PlaygroundSection title="SegmentedControl">
      <SegmentedControl
        aria-label="Katalog ko'rinishi"
        options={gridOptions}
        value={columns}
        onChange={setColumns}
        size="sm"
        className="w-fit"
      />
      <SegmentedControl aria-label="Bo'lim" options={tabOptions} value={tab} onChange={setTab} />
      <SegmentedControl aria-label="Xizmat turi" options={dealOptions} value={deal} onChange={setDeal} />
    </PlaygroundSection>
  )
}
