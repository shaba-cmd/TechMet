import { useEffect, useRef } from 'react'
import type { Product } from '../../data/catalog'
import { formatPrice } from '../../utils/filter'
import './ProductModal.css'

interface Props {
  product: Product | null
  onClose: () => void
  onRequest: (product: Product) => void
}

export function ProductModal({ product, onClose, onRequest }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (product && !dialog.open) dialog.showModal()
    if (!product && dialog.open) dialog.close()
  }, [product])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {product && (
        <div className="modal__body">
          <button type="button" className="modal__close" aria-label="Закрыть" onClick={onClose}>
            ×
          </button>
          <img className="modal__image" src={product.image} alt="" />
          <div className="modal__info">
            <h2 id="modal-title">{product.title}</h2>
            <p className="modal__meta">
              {product.category} · {product.manufacturer}
            </p>
            <p>{product.description}</p>
            <dl className="modal__specs">
              {Object.entries(product.specs).map(([name, value]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div>
                <dt>Минимальный заказ</dt>
                <dd>{product.minHours} ч</dd>
              </div>
            </dl>
            <p className="modal__price">
              от <strong>{formatPrice(product.pricePerHour)} ₽</strong> / час
            </p>
            <button type="button" className="btn btn--accent" onClick={() => onRequest(product)}>
              Оставить заявку
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
