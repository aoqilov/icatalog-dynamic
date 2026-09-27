import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { productsMock } from '../products/products.mockdata'
import { ordersMock } from './orders.mockdata'
import type {
  Order,
  OrderCreateRequest,
  OrderItem,
  OrderListParams,
  OrderListResponse,
  PriceType,
} from './orders.types'

export const ordersKeys = {
  all: ['orders'] as const,
  list: (params: OrderListParams) => [...ordersKeys.all, 'list', params] as const,
  detail: (id: number) => [...ordersKeys.all, id] as const,
}

// Mock rejimda mutatsiya qilinadigan xoldagi nusxa
const orders: Order[] = [...ordersMock]
let nextOrderId = orders.length + 1
let nextItemId = orders.reduce((max, order) => Math.max(max, ...order.items.map((item) => item.id)), 0) + 1

function priceFor(productId: number, priceType: PriceType): number {
  const product = productsMock.find((item) => item.id === productId)
  if (!product) return 0
  if (priceType === 'rental') return product.priceRental ?? 0
  if (priceType === 'tailoring') return product.priceTailoring ?? 0
  return product.priceSale ?? 0
}

function buildItem(productId: number, quantity: number, priceType: PriceType): OrderItem {
  const product = productsMock.find((item) => item.id === productId)
  const basePrice = priceFor(productId, priceType)
  return {
    id: nextItemId++,
    productId,
    productName: product?.name ?? "O'chirilgan mahsulot",
    quantity,
    priceType,
    basePrice,
    finalPrice: basePrice * quantity,
  }
}

function matchesParams(order: Order, params: OrderListParams) {
  return !params.status || order.status === params.status
}

export const ordersApi = {
  create: async (request: OrderCreateRequest): Promise<Order> => {
    if (env.useMock) {
      const order: Order = {
        id: nextOrderId++,
        storeId: request.storeId,
        buyerId: 1,
        status: 'pending_confirmation',
        cancelledBy: null,
        cancellationReason: null,
        items: request.items.map((item) => buildItem(item.productId, item.quantity, item.priceType)),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      orders.unshift(order)
      return order
    }

    const { data } = await api.post<Order>('/customers/orders/', request)
    return data
  },

  getById: async (id: number): Promise<Order> => {
    if (env.useMock) {
      const order = orders.find((item) => item.id === id)
      if (!order) throw new Error('Buyurtma topilmadi')
      return order
    }

    const { data } = await api.get<Order>(`/customers/orders/${id}/`)
    return data
  },

  cancel: async (id: number, reason: Order['cancellationReason']): Promise<Order> => {
    if (env.useMock) {
      const order = orders.find((item) => item.id === id)
      if (!order) throw new Error('Buyurtma topilmadi')
      if (order.status !== 'pending_confirmation') {
        throw new Error("Faqat tasdiqlanmagan buyurtmani bekor qilish mumkin")
      }
      order.status = 'cancelled'
      order.cancelledBy = 'buyer'
      order.cancellationReason = reason
      order.updatedAt = new Date().toISOString()
      return order
    }

    const { data } = await api.patch<Order>(`/customers/orders/${id}/`, {
      status: 'cancelled',
      cancellation_reason: reason,
    })
    return data
  },

  getList: async (params: OrderListParams): Promise<OrderListResponse> => {
    if (env.useMock) {
      const filtered = orders.filter((order) => matchesParams(order, params))
      const start = (params.page - 1) * params.pageSize
      const items = filtered.slice(start, start + params.pageSize)
      return {
        items,
        page: params.page,
        total: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / params.pageSize)),
      }
    }

    const { data } = await api.post<OrderListResponse>('/customers/orders/get-all/', params)
    return data
  },
}
