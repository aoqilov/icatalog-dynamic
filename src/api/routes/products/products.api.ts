import { env } from '@/config/env'
import { api } from '../../api-config/axios'
import { productsMock } from './products.mockdata'
import type {
  Product,
  ProductFilter,
  ProductListParams,
  ProductListResponse,
} from './products.types'

export const productsKeys = {
  all: ['products'] as const,
  list: (filter: ProductFilter) => [...productsKeys.all, 'list', filter] as const,
  count: (filter: ProductFilter) => [...productsKeys.all, 'count', filter] as const,
  detail: (id: string) => [...productsKeys.all, id] as const,
}

function matchesFilter(product: Product, filter: ProductFilter) {
  if (filter.categoryIds.length === 0 && filter.subcategoryIds.length === 0) return true
  return (
    filter.categoryIds.includes(product.categoryId) ||
    filter.subcategoryIds.includes(product.subcategoryId)
  )
}

// Backend uchun: ?cat=1,3&sub=102 (taxminiy format)
function toQuery(filter: ProductFilter) {
  return {
    cat: filter.categoryIds.join(',') || undefined,
    sub: filter.subcategoryIds.join(',') || undefined,
  }
}

export const productsApi = {
  getById: async (id: string): Promise<Product> => {
    if (env.useMock) {
      const product = productsMock.find((item) => String(item.id) === id)
      if (!product) throw new Error('Mahsulot topilmadi')
      return product
    }

    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  getList: async ({ page, pageSize, ...filter }: ProductListParams): Promise<ProductListResponse> => {
    if (env.useMock) {
      const filtered = productsMock.filter((product) => matchesFilter(product, filter))
      const start = (page - 1) * pageSize
      return {
        items: filtered.slice(start, start + pageSize),
        total: filtered.length,
        page,
        hasMore: start + pageSize < filtered.length,
      }
    }

    const { data } = await api.get<ProductListResponse>('/products', {
      params: { ...toQuery(filter), page, pageSize },
    })
    return data
  },

  count: async (filter: ProductFilter): Promise<number> => {
    if (env.useMock) {
      return productsMock.filter((product) => matchesFilter(product, filter)).length
    }

    const { data } = await api.get<{ total: number }>('/products/count', { params: toQuery(filter) })
    return data.total
  },
}
