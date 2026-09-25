import { useCallback, useState } from 'react'
import type { News } from '@/api/routes/news/news.types'
import { formatDate } from '@/lib/formatDate'
import { Carousel } from '@/shared/ui/Carousel'
import { PostCard } from './PostCard'
import { PostSheet } from './PostSheet'
import { SectionHeader } from './SectionHeader'

type NewsSectionProps = {
  news: News[]
}

export function NewsSection({ news }: NewsSectionProps) {
  const [selected, setSelected] = useState<News | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section aria-labelledby="home-news" className="flex flex-col gap-3">
      <SectionHeader id="home-news" title="Yangiliklar" />

      <Carousel
        aria-label="Yangiliklar"
        items={news}
        getKey={(item) => item.id}
        renderItem={(item, index) => (
          <PostCard
            cover={item.cover}
            title={item.title}
            excerpt={item.excerpt}
            label={formatDate(item.publishedAt)}
            corner={`${index + 1} / ${news.length}`}
            actionLabel="O'qish"
            onOpen={() => setSelected(item)}
          />
        )}
      />

      <PostSheet
        post={
          selected && {
            title: selected.title,
            meta: formatDate(selected.publishedAt),
            body: selected.body,
            cover: selected.cover,
          }
        }
        onClose={close}
      />
    </section>
  )
}
