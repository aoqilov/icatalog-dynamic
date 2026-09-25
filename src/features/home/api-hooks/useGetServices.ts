import { useQuery } from '@tanstack/react-query'
import { servicesApi, servicesKeys } from '@/api/routes/services/services.api'

export function useGetServices() {
  return useQuery({
    queryKey: servicesKeys.list(),
    queryFn: servicesApi.getAll,
  })
}
