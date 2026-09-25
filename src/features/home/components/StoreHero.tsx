import { TbBrandInstagram } from 'react-icons/tb'
import type { Store } from '@/api/routes/store/store.types'

type StoreHeroProps = {
  store: Store
}

// Muqova rasmi pastga qarab fonga singib ketadi (mask), matn rasm ustida emas, fon ustida turadi
export function StoreHero({ store }: StoreHeroProps) {
  const instagram = store.socials.find((social) => social.platform === 'instagram')

  return (
    <section className="flex flex-col items-center text-center">
      <div className="h-48 w-full mask-b-from-50% mask-b-to-100% sm:h-60">
        {store.cover ? (
          <img src={store.cover} alt="" className="size-full object-cover" />
        ) : (
          <div className="size-full bg-placeholder bg-(image:--blobs)" />
        )}
      </div>

      <div className="relative -mt-14 flex size-28 items-center justify-center rounded-full border-2 border-brand bg-tile p-1 shadow-lg">
        {store.avatar ? (
          <img src={store.avatar} alt={store.name} className="size-full rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="font-serif text-5xl text-text">
            {store.name.charAt(0)}
          </span>
        )}
      </div>

      <h1 className="mt-3 text-[22px] font-bold text-text">{store.name}</h1>

      {instagram && (
        <a
          href={instagram.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-brand"
        >
          <TbBrandInstagram aria-hidden className="size-4" />
          {instagram.handle}
        </a>
      )}
    </section>
  )
}
