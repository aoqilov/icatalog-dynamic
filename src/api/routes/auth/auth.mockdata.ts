import { mockImage } from '@/lib/mockImage'
import type { Buyer, TokenPair } from './auth.types'

// Mock rejimda doim tizimga kirgan holatda ishlaydi
export const buyerMock: Buyer = {
  id: 1,
  login: '+998901112233',
  active: true,
  firstName: 'Nozima',
  lastName: 'Karimova',
  middleName: '',
  age: 26,
  gender: 'female',
  city: 'Toshkent',
  avatarPhoto: mockImage('buyer-1', 200, 200),
  createdAt: '2026-06-01T09:00:00Z',
  updatedAt: '2026-06-01T09:00:00Z',
}

export const tokenPairMock: TokenPair = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
}
