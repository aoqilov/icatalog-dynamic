import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { buyerTemplateMock, tokenPairMock } from './auth.mockdata'
import type { Buyer, BuyerUpdateRequest, LoginRequest, RegisterRequest, TokenPair } from './auth.types'

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

// Mock rejimda mutatsiya qilinadigan xoldagi nusxa. null: ro'yxatdan o'tilmagan
let currentBuyer: Buyer | null = null

export const authApi = {
  register: async (request: RegisterRequest): Promise<Buyer> => {
    if (env.useMock) {
      const now = new Date().toISOString()
      currentBuyer = { ...buyerTemplateMock, ...request, createdAt: now, updatedAt: now }
      return currentBuyer
    }

    const { data } = await api.post<Buyer>('/customers/register', request)
    return data
  },

  login: async (credentials: LoginRequest): Promise<TokenPair> => {
    if (env.useMock) return tokenPairMock

    const { data } = await api.post<TokenPair>('/customers/login', credentials)
    return data
  },

  // Ro'yxatdan o'tilmagan (token yo'q) bo'lsa null
  me: async (): Promise<Buyer | null> => {
    if (env.useMock) return currentBuyer

    const { data } = await api.get<Buyer>('/customers/me')
    return data
  },

  updateMe: async (patch: BuyerUpdateRequest): Promise<Buyer> => {
    if (env.useMock) {
      if (!currentBuyer) throw new Error("Ro'yxatdan o'tilmagan")
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
