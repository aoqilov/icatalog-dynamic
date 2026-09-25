import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { servicesMock } from './services.mockdata'
import type { Service } from './services.types'

export const servicesKeys = {
  all: ['services'] as const,
  list: () => [...servicesKeys.all, 'list'] as const,
}

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    if (env.useMock) return servicesMock

    const { data } = await api.get<Service[]>('/services')
    return data
  },
}
