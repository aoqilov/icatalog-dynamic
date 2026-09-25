import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { promotionsMock } from './promotions.mockdata'
import type { Promotion } from './promotions.types'

export const promotionsKeys = {
  all: ['promotions'] as const,
  list: () => [...promotionsKeys.all, 'list'] as const,
}

export const promotionsApi = {
  getAll: async (): Promise<Promotion[]> => {
    if (env.useMock) return promotionsMock

    const { data } = await api.get<Promotion[]>('/promotions')
    return data
  },
}
