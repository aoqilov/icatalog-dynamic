import type { Product } from '@/api/routes/products/products.types'

type ProductDetailsProps = {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <article className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-tile object-cover"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-[22px] font-bold text-text">{product.name}</h1>
        <p className="text-text">{product.description}</p>
      </div>
    </article>
  )
}
