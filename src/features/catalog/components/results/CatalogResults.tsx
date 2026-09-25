import { useCallback } from 'react'
import { LuSearchX } from 'react-icons/lu'
import type { ProductFilter } from '@/api/routes/products/products.types'
import { Button } from '@/shared/ui/Button'
import { useGetProducts } from '../../api-hooks/useGetProducts'
import type { GridColumns } from '../../types'
import { LoadMoreTrigger } from './LoadMoreTrigger'
import { ProductGrid } from './ProductGrid'
import { ResultsSkeleton } from './ResultsSkeleton'

type CatalogResultsProps = {
  selection: ProductFilter
  columns: GridColumns
  onOpenPicker: () => void
}

export function CatalogResults({ selection, columns, onOpenPicker }: CatalogResultsProps) {
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetProducts(selection)

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage) fetchNextPage()
  }, [fetchNextPage, isFetchingNextPage])

  if (isPending) return <ResultsSkeleton columns={columns} />

  if (isError) {
    return <p className="py-10 text-center text-sm text-muted">Mahsulotlar yuklanmadi</p>
  }

  const products = data.pages.flatMap((page) => page.items)
  const total = data.pages[0]?.total ?? 0

  if (total === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <LuSearchX aria-hidden className="size-10 text-muted" />
        <p className="text-[15px] font-semibold text-text">Bu tanlov bo'yicha mahsulot topilmadi</p>
        <Button variant="secondary" onClick={onOpenPicker}>
          Kategoriyalarni o'zgartirish
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">
        Topildi: <span className="font-semibold text-text">{total}</span>
      </p>
      <ProductGrid products={products} columns={columns} />
      {hasNextPage && <LoadMoreTrigger onLoadMore={loadMore} isLoading={isFetchingNextPage} />}
    </div>
  )
}
