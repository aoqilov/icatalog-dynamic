import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { storeMock } from './store.mockdata'
import type { Store } from './store.types'

export const storeKeys = {
  all: ['store'] as const,
}

export const storeApi = {
  get: async (): Promise<Store> => {
    if (env.useMock) return storeMock

    const { data } = await api.get<Store>('/store')
    return data
  },
}
