import { LuSparkles } from 'react-icons/lu'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/config/routes'
import { CusButton } from '@/shared/ui/CusButton'
import { useGetProductsTimeline } from './api-hooks/useGetProductsTimeline'
import { FeedSkeleton } from './components/FeedSkeleton'
import { NewArrivalsCalendar } from './components/NewArrivalsCalendar'
import { NewArrivalsFeed } from './components/NewArrivalsFeed'
import { NewArrivalsToolbar } from './components/NewArrivalsToolbar'
import { useNewArrivalsParams } from './hooks/useNewArrivalsParams'

// "Yangi": barcha mahsulotlar Telegram kanali kabi — qo'shilgan sanasi bo'yicha lenta yoki kalendar.
// Oxirgi 7 kundagilarida "Yangi" belgisi chiqadi. Holat URL query'da, shuning uchun sahifa props bermaydi
export function FeatureNewArrivals() {
  const navigate = useNavigate()
  const { view, columns, day, openCalendar, showFeed, showDay, setColumns } = useNewArrivalsParams()
  const products = useGetProductsTimeline()

  return (
    <>
      <h1 className="sr-only">Yangi kelganlar</h1>
      <NewArrivalsToolbar
        view={view}
        columns={columns}
        onColumnsChange={setColumns}
        onOpenCalendar={openCalendar}
        onBack={showFeed}
      />

      <div className="mx-auto max-w-2xl px-4 pt-2 pb-6">
        {products.isPending && <FeedSkeleton />}

        {products.isError && <p className="py-10 text-center text-sm text-muted">Mahsulotlar yuklanmadi</p>}

        {products.isSuccess && products.data.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <LuSparkles aria-hidden className="size-10 text-muted" />
            <p className="text-[15px] font-semibold text-text">Hali mahsulot qo'shilmagan</p>
            <CusButton variant="secondary" onClick={() => navigate(ROUTES.catalog)}>
              Katalogni ko'rish
            </CusButton>
          </div>
        )}

        {products.isSuccess &&
          products.data.length > 0 &&
          (view === 'calendar' ? (
            <NewArrivalsCalendar products={products.data} onSelectDay={showDay} />
          ) : (
            <NewArrivalsFeed products={products.data} columns={columns} focusDay={day} />
          ))}
      </div>
    </>
  )
}
