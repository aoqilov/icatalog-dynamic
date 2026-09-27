import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { productsMock } from '../products/products.mockdata'
import { storeMock } from '../store/store.mockdata'
import { favoriteProductIdsMock, favoriteStoreIdsMock } from './favorites.mockdata'
import type { FavoriteProduct, FavoriteStore, PageParams, PaginatedResponse } from './favorites.types'

export const favoritesKeys = {
  all: ['favorites'] as const,
  products: (page: number) => [...favoritesKeys.all, 'products', page] as const,
  stores: (page: number) => [...favoritesKeys.all, 'stores', page] as const,
}

// Mock rejimda mutatsiya qilinadigan xoldagi nusxalar
const favoriteProductIds = new Set(favoriteProductIdsMock)
const favoriteStoreIds = new Set(favoriteStoreIdsMock)

function paginate<T>(items: T[], { page, pageSize }: PageParams): PaginatedResponse<T> {
  const start = (page - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page,
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  }
}

function toFavoriteProduct(id: number): FavoriteProduct | undefined {
  const product = productsMock.find((item) => item.id === id)
  if (!product) return undefined
  return {
    id: product.id,
    storeId: product.storeId,
    name: product.name,
    slug: product.slug,
    categoryId: product.categoryId,
    priceSale: product.priceSale,
    priceRental: product.priceRental,
    isSellable: product.isSellable,
    isRentable: product.isRentable,
  }
}

export const favoritesApi = {
  addProduct: async (productId: number): Promise<void> => {
    if (env.useMock) {
      favoriteProductIds.add(productId)
      return
    }
    await api.post(`/customers/favorites/products/${productId}`)
  },

  removeProduct: async (productId: number): Promise<void> => {
    if (env.useMock) {
      favoriteProductIds.delete(productId)
      return
    }
    await api.delete(`/customers/favorites/products/${productId}`)
  },

  getProducts: async (params: PageParams): Promise<PaginatedResponse<FavoriteProduct>> => {
    if (env.useMock) {
      const items = [...favoriteProductIds].map(toFavoriteProduct).filter((item) => item !== undefined)
      return paginate(items, params)
    }

    const { data } = await api.post<PaginatedResponse<FavoriteProduct>>(
      '/customers/favorites/products/get-all',
      params,
    )
    return data
  },

  addStore: async (storeId: number): Promise<void> => {
    if (env.useMock) {
      favoriteStoreIds.add(storeId)
      return
    }
    await api.post(`/customers/favorites/stores/${storeId}`)
  },

  removeStore: async (storeId: number): Promise<void> => {
    if (env.useMock) {
      favoriteStoreIds.delete(storeId)
      return
    }
    await api.delete(`/customers/favorites/stores/${storeId}`)
  },

  getStores: async (params: PageParams): Promise<PaginatedResponse<FavoriteStore>> => {
    if (env.useMock) {
      const items: FavoriteStore[] = [...favoriteStoreIds]
        .filter((id) => id === storeMock.id)
        .map(() => ({ id: storeMock.id, name: storeMock.name, avatar: storeMock.avatar }))
      return paginate(items, params)
    }

    const { data } = await api.post<PaginatedResponse<FavoriteStore>>(
      '/customers/favorites/stores/get-all',
      params,
    )
    return data
  },
}
