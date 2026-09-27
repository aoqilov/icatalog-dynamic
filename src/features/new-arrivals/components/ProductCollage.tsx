import { LuImage } from 'react-icons/lu'
import type { Product } from '@/api/routes/products/products.types'
import { isNewProduct } from '@/lib/productDisplay'

type ProductCollageProps = {
  product: Product
  // O'lcham va nisbat (masalan, aspect-3/4) tashqaridan beriladi
  className?: string
}

// Telegram albomi kabi: chapda katta rasm, o'ngda ikkita kichik. Rasmlar birinchi variantdan
export function ProductCollage({ product, className = '' }: ProductCollageProps) {
  const [main, ...rest] = product.variants[0]?.photos ?? []
  const side = rest.slice(0, 2)

  return (
    <div className={`relative grid grid-cols-3 grid-rows-2 gap-0.5 overflow-hidden bg-fill ${className}`}>
      {main ? (
        <img
          src={main.image}
          alt=""
          loading="lazy"
          className={`size-full min-h-0 object-cover ${side.length > 0 ? 'col-span-2 row-span-2' : 'col-span-3 row-span-2'}`}
        />
      ) : (
        <div className="col-span-3 row-span-2 flex items-center justify-center">
          <LuImage aria-hidden className="size-7 text-muted" />
        </div>
      )}
      {side.map((photo) => (
        <img
          key={photo.id}
          src={photo.image}
          alt=""
          loading="lazy"
          className={`size-full min-h-0 object-cover ${side.length === 1 ? 'row-span-2' : ''}`}
        />
      ))}
      {isNewProduct(product) && <span className="badge-new absolute top-2 left-2">Yangi</span>}
    </div>
  )
}
