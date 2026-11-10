import dictionaries from './dictionaries.json'
import seed from './products.json'

export type TabId = 'material' | 'rent' | 'tools' | 'parts' | 'uniform'

export interface Tab {
  id: TabId
  title: string
}

// Справочники общие для сайта и сервера: сервер проверяет по ним карточки.
export const TABS = dictionaries.tabs as Tab[]
export const CATEGORIES: readonly string[] = dictionaries.categories
export const MANUFACTURERS: readonly string[] = dictionaries.manufacturers

export type Category = string
export type Manufacturer = string

export interface Product {
  id: number
  tab: TabId
  title: string
  image: string
  category: Category
  manufacturer: Manufacturer
  pricePerHour: number
  minHours: number
  description: string
  specs: Record<string, string>
}

export const PRICE_MIN = 0
export const PRICE_MAX = 10000
export const PRICE_STEP = 100

// Исходный каталог: из него сервер создаёт базу при первом запуске,
// а сайт показывает его, если сервер недоступен (статический хостинг).
export const SEED_PRODUCTS = seed as unknown as Product[]
