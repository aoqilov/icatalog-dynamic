import type { Order } from './orders.types'

// Boshlang'ich holatda bitta namunaviy buyurtma
export const ordersMock: Order[] = [
  {
    id: 1,
    storeId: 1,
    buyerId: 1,
    status: 'confirmed',
    cancelledBy: null,
    cancellationReason: null,
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Chelsi',
        quantity: 1,
        priceType: 'rental',
        basePrice: 2_000_000,
        finalPrice: 2_000_000,
      },
    ],
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-10T10:00:00Z',
  },
]
