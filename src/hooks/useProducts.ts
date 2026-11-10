import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { SEED_PRODUCTS, type Product } from '../data/catalog'

/**
 * Каталог с сервера. Пока ответ не пришёл, список пуст;
 * если сервера нет (статический хостинг), показывается исходный каталог.
 */
export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    let cancelled = false
    api
      .products()
      .catch(() => SEED_PRODUCTS)
      .then((list) => {
        if (!cancelled) setProducts(list)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return products
}
