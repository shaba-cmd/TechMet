import { useState, type ChangeEvent, type FormEvent } from 'react'
import { api, ApiError, type ProductData } from '../../api/client'
import { CATEGORIES, MANUFACTURERS, PRICE_MAX, PRICE_STEP, TABS, type Product, type TabId } from '../../data/catalog'

interface Props {
  /** Редактируемая карточка или null для новой. */
  product: Product | null
  onSave: (data: ProductData) => Promise<void>
  onCancel: () => void
  onUnauthorized: () => void
}

// Характеристики редактируются текстом: одна строка — «Название: значение».
const specsToText = (specs: Record<string, string>) =>
  Object.entries(specs)
    .map(([name, value]) => `${name}: ${value}`)
    .join('\n')

function textToSpecs(text: string): Record<string, string> {
  const specs: Record<string, string> = {}
  for (const line of text.split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const name = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    if (name && value) specs[name] = value
  }
  return specs
}

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'))
    reader.readAsDataURL(file)
  })

export function ProductForm({ product, onSave, onCancel, onUnauthorized }: Props) {
  const [title, setTitle] = useState(product?.title ?? '')
  const [tab, setTab] = useState<TabId>(product?.tab ?? 'rent')
  const [category, setCategory] = useState(product?.category ?? CATEGORIES[0])
  const [manufacturer, setManufacturer] = useState(product?.manufacturer ?? MANUFACTURERS[0])
  const [pricePerHour, setPricePerHour] = useState(String(product?.pricePerHour ?? 1000))
  const [minHours, setMinHours] = useState(String(product?.minHours ?? 4))
  const [description, setDescription] = useState(product?.description ?? '')
  const [specs, setSpecs] = useState(specsToText(product?.specs ?? {}))
  const [image, setImage] = useState(product?.image ?? '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const fail = (err: unknown) => {
    if (err instanceof ApiError && err.status === 401) onUnauthorized()
    else setError(err instanceof Error ? err.message : 'Ошибка сервера')
  }

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const { url } = await api.upload(await readAsDataUrl(file))
      setImage(url)
    } catch (err) {
      fail(err)
    }
    setBusy(false)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await onSave({
        tab,
        title,
        image,
        category,
        manufacturer,
        pricePerHour: Number(pricePerHour),
        minHours: Number(minHours),
        description,
        specs: textToSpecs(specs),
      })
    } catch (err) {
      fail(err)
      setBusy(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <h1 className="admin__title">{product ? `Изменить карточку №${product.id}` : 'Новая карточка'}</h1>

      <div className="admin-form__grid">
        <div className="admin-form__fields">
          <label className="admin-field">
            <span>Название</span>
            <input type="text" value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} required />
          </label>

          <div className="admin-form__row">
            <label className="admin-field">
              <span>Раздел</span>
              <select value={tab} onChange={(e) => setTab(e.target.value as TabId)}>
                {TABS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Категория</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Производитель</span>
              <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
                {MANUFACTURERS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="admin-form__row">
            <label className="admin-field">
              <span>Цена, ₽/час</span>
              <input
                type="number"
                min={0}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                required
              />
            </label>
            <label className="admin-field">
              <span>Минимальный заказ, ч</span>
              <input type="number" min={1} max={24} value={minHours} onChange={(e) => setMinHours(e.target.value)} required />
            </label>
          </div>

          <label className="admin-field">
            <span>Описание</span>
            <textarea rows={3} maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>

          <label className="admin-field">
            <span>Характеристики — по одной в строке, «Название: значение»</span>
            <textarea
              rows={4}
              value={specs}
              placeholder={'Грузоподъёмность: 25 т\nДлина стрелы: 31 м'}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </label>
        </div>

        <div className="admin-form__image">
          <span>Фотография</span>
          <div className="admin-form__preview">{image ? <img src={image} alt="" /> : 'Нет фото'}</div>
          <label className="admin-form__upload">
            {image ? 'Заменить фото' : 'Загрузить фото'}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={busy} />
          </label>
        </div>
      </div>

      <p className="admin__error" role="alert">
        {error}
      </p>

      <div className="admin-form__actions">
        <button type="submit" className="btn btn--accent" disabled={busy}>
          Сохранить
        </button>
        <button type="button" className="admin__link" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}
