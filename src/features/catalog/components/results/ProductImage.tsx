import { LuImage } from 'react-icons/lu'
import type { Product } from '@/api/routes/products/products.types'

type ProductImageProps = {
  product: Product
  className?: string
}

// Mahsulotning birinchi rasmi, rasm bo'lmasa joy egasi. "YANGI" badge'i solid (o'qilishi uchun)
export function ProductImage({ product, className = '' }: ProductImageProps) {
  const [image] = product.images

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-fill ${className}`}>
      {image ? (
        <img src={image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
      ) : (
        <LuImage aria-hidden className="size-7 text-muted" />
      )}
      {product.isNew && <span className="badge-new absolute top-2 left-2">Yangi</span>}
    </div>
  )
}
