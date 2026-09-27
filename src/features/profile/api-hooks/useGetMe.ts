import { useQuery } from '@tanstack/react-query'
import { authApi, authKeys } from '@/api/routes/auth/auth.api'

// data === null: ro'yxatdan o'tilmagan
export function useGetMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.me,
  })
}
