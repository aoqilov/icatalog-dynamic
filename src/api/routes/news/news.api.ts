import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { newsMock } from './news.mockdata'
import type { News } from './news.types'

export const newsKeys = {
  all: ['news'] as const,
  list: () => [...newsKeys.all, 'list'] as const,
}

export const newsApi = {
  getAll: async (): Promise<News[]> => {
    if (env.useMock) return newsMock

    const { data } = await api.get<News[]>('/news')
    return data
  },
}
