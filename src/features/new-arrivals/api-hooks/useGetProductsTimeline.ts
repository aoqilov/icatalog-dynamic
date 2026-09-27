import { useQuery } from '@tanstack/react-query'
import { productsApi, productsKeys } from '@/api/routes/products/products.api'

export function useGetProductsTimeline() {
  return useQuery({
    queryKey: productsKeys.timeline(),
    queryFn: productsApi.getTimeline,
  })
}
