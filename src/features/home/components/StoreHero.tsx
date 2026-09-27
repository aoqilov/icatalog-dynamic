import { TbBrandInstagram } from 'react-icons/tb'
import type { Store } from '@/api/routes/store/store.types'
import { StoreStats } from './StoreStats'

type StoreHeroProps = {
  store: Store
}

// Instagram profili kabi: avatar (muqovaga chiqib turadi) va statistika bir qatorda, ostida nom va @instagram.
// Muqova pastga qarab fonga singib ketadi (mask), matn rasm ustida emas, fon ustida turadi
export function StoreHero({ store }: StoreHeroProps) {
  const instagram = store.socials.find((social) => social.platform === 'instagram')

  return (
    <section className="flex flex-col">
      <div className="h-56 w-full mask-b-from-60% mask-b-to-100% sm:h-64">
        {store.cover ? (
          <img src={store.cover} alt="" className="size-full object-cover" />
        ) : (
          <div className="size-full bg-placeholder bg-(image:--blobs)" />
        )}
      </div>

      {/* items-end: statistika avatarning muqovadan pastdagi yarmi bilan bir qatorda */}
      <div className="flex items-end gap-4 px-4">
        <div className="relative -mt-12 flex size-24 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-tile p-1 shadow-lg">
          {store.avatar ? (
            <img src={store.avatar} alt={store.name} className="size-full rounded-full object-cover" />
          ) : (
            <span aria-hidden="true" className="font-serif text-4xl text-text">
              {store.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <StoreStats store={store} />
        </div>
      </div>

      <div className="flex flex-col px-4 pt-2">
        <h1 className="truncate text-[17px] font-bold text-text">{store.name}</h1>
        {instagram && (
          <a
            href={instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-brand"
          >
            <TbBrandInstagram aria-hidden className="size-4" />
            {instagram.nickname}
          </a>
        )}
      </div>
    </section>
  )
}
