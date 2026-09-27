import type { Buyer, TokenPair } from './auth.types'

// Mock rejim ro'yxatdan o'tilmagan holatdan boshlanadi. Ro'yxatdan o'tilganda shu shablon asosida xaridor yaratiladi
export const buyerTemplateMock: Buyer = {
  id: 1,
  login: '',
  active: true,
  firstName: '',
  lastName: '',
  middleName: '',
  age: null,
  gender: null,
  city: '',
  avatarPhoto: null,
  createdAt: '2026-06-01T09:00:00Z',
  updatedAt: '2026-06-01T09:00:00Z',
}

export const tokenPairMock: TokenPair = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
}
