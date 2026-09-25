import { useQuery } from '@tanstack/react-query'
import { promotionsApi, promotionsKeys } from '@/api/routes/promotions/promotions.api'

export function useGetPromotions() {
  return useQuery({
    queryKey: promotionsKeys.list(),
    queryFn: promotionsApi.getAll,
  })
}
