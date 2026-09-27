import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { materialsMock } from './materials.mockdata'
import type { Material } from './materials.types'

export const materialsKeys = {
  all: ['materials'] as const,
  list: () => [...materialsKeys.all, 'list'] as const,
}

export const materialsApi = {
  getAll: async (): Promise<Material[]> => {
    if (env.useMock) return materialsMock

    // Taxminiy: public endpoint yo'q, backend qo'shganda tekshiriladi
    const { data } = await api.post<{ items: Material[] }>('/stores/product-materials/get-all/', {
      page: 1,
      pageSize: 100,
    })
    return data.items
  },
}
