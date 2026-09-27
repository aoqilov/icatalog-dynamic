import { useCreateFavoriteProduct } from '../api-hooks/useCreateFavoriteProduct'
import { useDeleteFavoriteProduct } from '../api-hooks/useDeleteFavoriteProduct'
import { useGetFavoriteProducts } from '../api-hooks/useGetFavoriteProducts'

export function useFavoriteToggle(productId: number) {
  const favorites = useGetFavoriteProducts()
  const create = useCreateFavoriteProduct()
  const remove = useDeleteFavoriteProduct()

  const isFavorite = favorites.data?.items.some((item) => item.id === productId) ?? false

  const toggle = () => {
    if (isFavorite) remove.mutate(productId)
    else create.mutate(productId)
  }

  return { isFavorite, toggle }
}
