// api.yaml: customers-auth — login (POST /customers/login), joriy xaridor (GET/PATCH /customers/me),
// token yangilash (POST /customers/refresh)

export type Gender = 'male' | 'female'

// api.yaml'da hali yo'q: endpoint va maydonlar taxminiy, backend ulanganda tekshiriladi
export type RegisterRequest = {
  firstName: string
  login: string // telefon raqam, +998XXXXXXXXX
}

export type LoginRequest = {
  login: string
  password: string
}

export type TokenPair = {
  accessToken: string
  refreshToken: string
}

export type Buyer = {
  id: number
  login: string
  active: boolean
  firstName: string
  lastName: string
  middleName: string
  age: number | null
  gender: Gender | null
  city: string
  avatarPhoto: string | null
  createdAt: string // ISO sana-vaqt
  updatedAt: string // ISO sana-vaqt
}

export type BuyerUpdateRequest = Partial<{
  firstName: string
  lastName: string
  middleName: string
  age: number | null
  gender: Gender | null
  city: string
  avatarPhoto: string
}>
