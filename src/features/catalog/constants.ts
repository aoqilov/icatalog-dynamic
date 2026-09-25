import type { OfferType, Product } from '@/api/routes/products/products.types'

export const OFFER_LABELS: Record<OfferType, string> = {
  rent: 'Ijara',
  sale: 'Sotuv',
  tailoring: 'Tikish',
}

// Kartada ko'rsatiladigan asosiy taklif: ijara bo'lsa ijara, bo'lmasa birinchisi
export function primaryOffer(product: Product) {
  return product.offers.find((offer) => offer.type === 'rent') ?? product.offers[0]
}

export const PRODUCTS_PAGE_SIZE = 12
