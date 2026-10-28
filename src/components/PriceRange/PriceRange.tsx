import { PRICE_MAX, PRICE_MIN, PRICE_STEP } from '../../data/catalog'
import { formatPrice } from '../../utils/filter'
import './PriceRange.css'

interface Props {
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export function PriceRange({ value, onChange }: Props) {
  const [min, max] = value
  const percent = (v: number) => ((v - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

  return (
    <div className="price-range">
      <div className="price-range__track">
        <div
          className="price-range__fill"
          style={{ left: `${percent(min)}%`, right: `${100 - percent(max)}%` }}
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={min}
          aria-label="Минимальная цена"
          onChange={(e) => onChange([Math.min(Number(e.target.value), max), max])}
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={max}
          aria-label="Максимальная цена"
          onChange={(e) => onChange([min, Math.max(Number(e.target.value), min)])}
        />
      </div>
      <p className="price-range__label">
        Цена {formatPrice(min)}₽-{formatPrice(max)}₽ / час
      </p>
    </div>
  )
}
