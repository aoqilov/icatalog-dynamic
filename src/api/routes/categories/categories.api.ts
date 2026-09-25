import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { categoriesMock } from './categories.mockdata'
import type { Category } from './categories.types'

export const categoriesKeys = {
  all: ['categories'] as const,
  list: () => [...categoriesKeys.all, 'list'] as const,
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    if (env.useMock) return categoriesMock

    const { data } = await api.get<Category[]>('/categories')
    return data
  },
}
