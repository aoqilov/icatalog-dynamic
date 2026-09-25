import { Button } from '@/shared/ui/Button'
import { LuArrowLeft, LuHeart } from 'react-icons/lu'
import { PlaygroundSection } from './PlaygroundSection'

export function ButtonsDemo() {
  return (
    <PlaygroundSection title="Button">
      {/* Ekranda yagona primary tugma */}
      <Button size="lg" fullWidth>
        Ko'rsatish: 24 ta mahsulot
      </Button>

      <div className="flex items-center gap-3">
        <Button variant="secondary" className="flex-1">
          Tozalash
        </Button>
        <Button variant="secondary" size="lg" className="flex-1">
          Katta (52px)
        </Button>
        <Button variant="icon" aria-label="Sevimlilarga qo'shish" icon={<LuHeart aria-hidden className="size-5" />} />
      </div>

      {/* Rasm o'rnida vaqtinchalik to'q fon: onImage tugmalar surat ustida turadi */}
      <div className="relative aspect-4/3 overflow-hidden rounded-tile bg-placeholder bg-(image:--blobs)">
        <div className="absolute inset-x-3 top-3 flex justify-between">
          <Button variant="onImage" aria-label="Orqaga" icon={<LuArrowLeft aria-hidden className="size-5" />} />
          <Button variant="onImage" aria-label="Sevimlilarga qo'shish" icon={<LuHeart aria-hidden className="size-5" />} />
        </div>
      </div>
    </PlaygroundSection>
  )
}
