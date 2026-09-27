import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi, authKeys } from '@/api/routes/auth/auth.api'
import { favoritesKeys } from '@/api/routes/favorites/favorites.api'

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.register,
    // Sevimlilar akkauntga bog'liq: ro'yxatdan o'tilgach ular ham qayta olinadi
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: authKeys.all }),
        queryClient.invalidateQueries({ queryKey: favoritesKeys.all }),
      ]),
  })
}
