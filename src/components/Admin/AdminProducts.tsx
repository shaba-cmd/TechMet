import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ProductData } from '../../api/client'
import { TABS, type Product } from '../../data/catalog'
import { formatPrice } from '../../utils/filter'
import { ProductForm } from './ProductForm'

interface Props {
  onUnauthorized: () => void
}

const tabTitle = (id: string) => TABS.find((t) => t.id === id)?.title ?? id

export function AdminProducts({ onUnauthorized }: Props) {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState('')
  // null — форма закрыта, 'new' — новая карточка, иначе редактируемая.
  const [editing, setEditing] = useState<Product | 'new' | null>(null)

  const fail = useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && err.status === 401) onUnauthorized()
      else setError(err instanceof Error ? err.message : 'Ошибка сервера')
    },
    [onUnauthorized],
  )

  useEffect(() => {
    api.products().then(setProducts).catch(fail)
  }, [fail])

  const save = async (data: ProductData) => {
    const saved = editing === 'new' || editing === null ? await api.create(data) : await api.update(editing.id, data)
    setProducts((list) => {
      const rest = (list ?? []).filter((p) => p.id !== saved.id)
      return [...rest, saved].sort((a, b) => a.id - b.id)
    })
    setEditing(null)
  }

  const remove = async (product: Product) => {
    if (!window.confirm(`Удалить карточку «${product.title}»?`)) return
    try {
      await api.remove(product.id)
      setProducts((list) => (list ?? []).filter((p) => p.id !== product.id))
    } catch (err) {
      fail(err)
    }
  }

  if (editing) {
    return (
      <ProductForm
        product={editing === 'new' ? null : editing}
        onSave={save}
        onCancel={() => setEditing(null)}
        onUnauthorized={onUnauthorized}
      />
    )
  }

  return (
    <section>
      <div className="admin__toolbar">
        <h1 className="admin__title">Карточки каталога{products && ` (${products.length})`}</h1>
        <a className="admin__link" href="/api/products" target="_blank" rel="noreferrer">
          Открыть базу данных (JSON)
        </a>
        <button type="button" className="btn btn--accent" onClick={() => setEditing('new')}>
          Добавить карточку
        </button>
      </div>

      <p className="admin__error" role="alert">
        {error}
      </p>

      {products && (
        <div className="admin-table__wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Фото</th>
                <th>Название</th>
                <th>Раздел</th>
                <th>Категория</th>
                <th>Производитель</th>
                <th>Цена, ₽/час</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} alt="" loading="lazy" />
                  </td>
                  <td>{p.title}</td>
                  <td>{tabTitle(p.tab)}</td>
                  <td>{p.category}</td>
                  <td>{p.manufacturer}</td>
                  <td>{formatPrice(p.pricePerHour)}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button type="button" onClick={() => setEditing(p)}>
                        Изменить
                      </button>
                      <button type="button" className="is-danger" onClick={() => remove(p)}>
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="admin__empty">Карточек пока нет</p>}
        </div>
      )}
    </section>
  )
}
