import { useCallback, useState } from 'react'
import { useGetCategories } from './api-hooks/useGetCategories'
import { useGetNews } from './api-hooks/useGetNews'
import { useGetPromotions } from './api-hooks/useGetPromotions'
import { useGetServices } from './api-hooks/useGetServices'
import { useGetStore } from './api-hooks/useGetStore'
import { CategoryGrid } from './components/CategoryGrid'
import { ContactSheet } from './components/ContactSheet'
import { HomeSkeleton } from './components/HomeSkeleton'
import { NewsSection } from './components/NewsSection'
import { PromotionsSection } from './components/PromotionsSection'
import { QuickActions } from './components/QuickActions'
import { ServicesAccordion } from './components/ServicesAccordion'
import { StoreHero } from './components/StoreHero'
import { StoreStats } from './components/StoreStats'
import type { ContactKind } from './types'

const errorClass = 'py-6 text-center text-sm text-muted'

export function FeatureHome() {
  const store = useGetStore()
  const categories = useGetCategories()
  const services = useGetServices()
  const news = useGetNews()
  const promotions = useGetPromotions()
  const [contactKind, setContactKind] = useState<ContactKind | null>(null)

  const closeContacts = useCallback(() => setContactKind(null), [])
  const openPhones = useCallback(() => setContactKind('phones'), [])

  if (store.isPending) return <HomeSkeleton />

  if (store.isError) {
    return <p className={errorClass}>Do'kon ma'lumotlari yuklanmadi</p>
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col pb-8">
      <StoreHero store={store.data} />

      <div className="mt-4 flex flex-col gap-5 px-4">
        <StoreStats stats={store.data.stats} />
        <div className="gline" />
        <QuickActions store={store.data} onSelect={setContactKind} />
        <div className="gline" />

        {categories.isPending && <div className="h-40 animate-pulse rounded-md bg-fill" />}
        {categories.isError && <p className={errorClass}>Kategoriyalar yuklanmadi</p>}
        {categories.isSuccess && <CategoryGrid categories={categories.data} />}

        <div className="gline" />

        {services.isPending && <div className="h-56 animate-pulse rounded-md bg-fill" />}
        {services.isError && <p className={errorClass}>Xizmatlar yuklanmadi</p>}
        {services.isSuccess && <ServicesAccordion services={services.data} onMore={openPhones} />}

        {/* Bo'sh ro'yxat bo'lsa bo'lim umuman chiqmaydi */}
        {news.isPending && <div className="h-80 animate-pulse rounded-md bg-fill" />}
        {news.isError && <p className={errorClass}>Yangiliklar yuklanmadi</p>}
        {news.isSuccess && news.data.length > 0 && <NewsSection news={news.data} />}

        {promotions.isPending && <div className="h-80 animate-pulse rounded-md bg-fill" />}
        {promotions.isError && <p className={errorClass}>Aksiyalar yuklanmadi</p>}
        {promotions.isSuccess && promotions.data.length > 0 && (
          <PromotionsSection promotions={promotions.data} />
        )}
      </div>

      <ContactSheet kind={contactKind} store={store.data} onClose={closeContacts} />
    </div>
  )
}
