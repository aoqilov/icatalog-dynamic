import { useCallback, useState } from 'react'
import type { Promotion } from '@/api/routes/promotions/promotions.types'
import { formatDate } from '@/lib/formatDate'
import { Carousel } from '@/shared/ui/Carousel'
import { PostCard } from './PostCard'
import { PostSheet } from './PostSheet'
import { SectionHeader } from './SectionHeader'

type PromotionsSectionProps = {
  promotions: Promotion[]
}

const untilLabel = (endsAt: string) => `${formatDate(endsAt, { year: false })} gacha`

export function PromotionsSection({ promotions }: PromotionsSectionProps) {
  const [selected, setSelected] = useState<Promotion | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section aria-labelledby="home-promotions" className="flex flex-col gap-3">
      <SectionHeader id="home-promotions" title="Aksiyalar" />

      <Carousel
        aria-label="Aksiyalar"
        items={promotions}
        getKey={(item) => item.id}
        renderItem={(item) => (
          <PostCard
            cover={item.cover}
            title={item.title}
            excerpt={item.excerpt}
            label={untilLabel(item.endsAt)}
            corner={item.discountPercent ? `−${item.discountPercent}%` : undefined}
            cornerSolid
            actionLabel="Batafsil"
            onOpen={() => setSelected(item)}
          />
        )}
      />

      <PostSheet
        post={
          selected && {
            title: selected.title,
            meta: `Aksiya ${untilLabel(selected.endsAt)} amal qiladi`,
            body: selected.body,
            cover: selected.cover,
          }
        }
        onClose={close}
      />
    </section>
  )
}
