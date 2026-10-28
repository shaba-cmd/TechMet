import type { Product } from '../../data/catalog'
import { formatPrice } from '../../utils/filter'
import './ProductCard.css'

interface Props {
  product: Product
  onMore: (product: Product) => void
}

export function ProductCard({ product, onMore }: Props) {
  return (
    <article className="card">
      <h3 className="card__title">{product.title}</h3>
      <img className="card__image" src={product.image} alt={product.title} loading="lazy" />
      <p className="card__price">От {formatPrice(product.pricePerHour)}р/час</p>
      <button type="button" className="card__more" onClick={() => onMore(product)}>
        Узнать
      </button>
    </article>
  )
}
