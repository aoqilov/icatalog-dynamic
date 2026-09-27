import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { buyerMock, tokenPairMock } from './auth.mockdata'
import type { Buyer, BuyerUpdateRequest, LoginRequest, TokenPair } from './auth.types'

export const authKeys = {
  me: ['auth', 'me'] as const,
}

// Mock rejimda mutatsiya qilinadigan xoldagi nusxa
let currentBuyer: Buyer = { ...buyerMock }

export const authApi = {
  login: async (credentials: LoginRequest): Promise<TokenPair> => {
    if (env.useMock) return tokenPairMock

    const { data } = await api.post<TokenPair>('/customers/login', credentials)
    return data
  },

  me: async (): Promise<Buyer> => {
    if (env.useMock) return currentBuyer

    const { data } = await api.get<Buyer>('/customers/me')
    return data
  },

  updateMe: async (patch: BuyerUpdateRequest): Promise<Buyer> => {
    if (env.useMock) {
      currentBuyer = { ...currentBuyer, ...patch, updatedAt: new Date().toISOString() }
      return currentBuyer
    }

    const { data } = await api.patch<Buyer>('/customers/me', patch)
    return data
  },

  refresh: async (refreshToken: string): Promise<TokenPair> => {
    if (env.useMock) return tokenPairMock

    const { data } = await api.post<TokenPair>('/customers/refresh', { refreshToken })
    return data
  },
}
