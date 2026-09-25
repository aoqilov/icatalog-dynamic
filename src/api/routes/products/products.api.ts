import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { productsMock } from './products.mockdata'
import type { Product } from './products.types'

export const productsKeys = {
  all: ['products'] as const,
  detail: (id: string) => [...productsKeys.all, id] as const,
}

export const productsApi = {
  getById: async (id: string): Promise<Product> => {
    if (env.useMock) {
      const product = productsMock.find((item) => String(item.id) === id)
      if (!product) throw new Error('Mahsulot topilmadi')
      return product
    }

    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },
}
