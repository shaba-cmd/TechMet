import type { FormEvent } from 'react'
import { CATEGORIES, MANUFACTURERS } from '../../data/catalog'
import type { Filters as FilterValues } from '../../utils/filter'
import { CheckList } from '../CheckList/CheckList'
import { SearchIcon } from '../Icons'
import { PriceRange } from '../PriceRange/PriceRange'
import './Filters.css'

interface Props {
  value: FilterValues
  onChange: (value: FilterValues) => void
  onApply: () => void
  onReset: () => void
  dirty: boolean
  open: boolean
}

export function Filters({ value, onChange, onApply, onReset, dirty, open }: Props) {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onApply()
  }

  return (
    <aside className={`filters${open ? ' filters--open' : ''}`} id="filters">
      <form onSubmit={submit}>
        <div className="filters__search">
          <input
            type="search"
            placeholder="Поиск"
            aria-label="Поиск по каталогу"
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
          />
          <button type="submit" aria-label="Найти">
            <SearchIcon />
          </button>
        </div>

        <section className="filters__block">
          <h2 className="filters__title">Регулировка цены</h2>
          <PriceRange value={value.price} onChange={(price) => onChange({ ...value, price })} />
        </section>

        <section className="filters__block">
          <CheckList
            title="Категория"
            options={CATEGORIES}
            selected={value.categories}
            onChange={(categories) => onChange({ ...value, categories })}
          />
        </section>

        <section className="filters__block">
          <CheckList
            title="Производитель"
            options={MANUFACTURERS}
            selected={value.manufacturers}
            onChange={(manufacturers) => onChange({ ...value, manufacturers })}
          />
        </section>

        <div className="filters__actions">
          <button type="submit" className="btn btn--accent">
            Сохранить
          </button>
          <button type="button" className="filters__reset" onClick={onReset}>
            Сбросить
          </button>
        </div>
        {dirty && <p className="filters__hint">Нажмите «Сохранить», чтобы применить фильтры</p>}
      </form>
    </aside>
  )
}
