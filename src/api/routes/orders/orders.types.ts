// api.yaml: customers-orders — checkout (create), ro'yxat, bekor qilish (faqat pending_confirmation holatda)

export type PriceType = 'sale' | 'rental' | 'tailoring'

export type OrderStatus = 'pending_confirmation' | 'confirmed' | 'delivered' | 'closed' | 'cancelled' | 'returned'

export type CancelledBy = 'buyer' | 'store'

export type CancellationReason =
  | 'changed_mind'
  | 'found_better_price'
  | 'ordered_by_mistake'
  | 'delivery_too_slow'
  | 'out_of_stock'
  | 'cannot_fulfill'
  | 'buyer_unreachable'
  | 'suspected_fraud'
  | 'other'

export type OrderItemCreate = {
  productId: number
  quantity: number
  priceType: PriceType
}

export type OrderCreateRequest = {
  storeId: number
  items: OrderItemCreate[]
}

export type OrderItem = {
  id: number
  productId: number | null
  productName: string
  quantity: number
  priceType: PriceType
  basePrice: number
  finalPrice: number
}

export type Order = {
  id: number
  storeId: number
  buyerId: number
  status: OrderStatus
  cancelledBy: CancelledBy | null
  cancellationReason: CancellationReason | null
  items: OrderItem[]
  createdAt: string // ISO sana-vaqt
  updatedAt: string // ISO sana-vaqt
}

export type OrderListParams = {
  page: number
  pageSize: number
  status?: OrderStatus
}

export type OrderListResponse = {
  items: Order[]
  page: number
  totalPages: number
  total: number
}
