import { useState, type FormEvent } from 'react'
import { validateRequest, type RequestErrors, type RequestForm as Values } from '../../utils/validation'
import './RequestForm.css'

interface Props {
  subject: string | null
  onClearSubject: () => void
}

const EMPTY: Values = { name: '', email: '' }

export function RequestForm({ subject, onClearSubject }: Props) {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<RequestErrors>({})
  const [sent, setSent] = useState(false)

  const update = (field: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
    setSent(false)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateRequest(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    try {
      const saved = JSON.parse(localStorage.getItem('techmet:requests') ?? '[]') as unknown[]
      saved.push({ ...values, subject, date: new Date().toISOString() })
      localStorage.setItem('techmet:requests', JSON.stringify(saved))
    } catch {
      //
    }
    setValues(EMPTY)
    setSent(true)
    onClearSubject()
  }

  return (
    <form className="request" onSubmit={submit} noValidate>
      {subject && (
        <p className="request__subject">
          Техника: {subject}
          <button type="button" aria-label="Убрать технику из заявки" onClick={onClearSubject}>
            ×
          </button>
        </p>
      )}
      <label className="request__field">
        <span className="visually-hidden">ФИО</span>
        <input
          type="text"
          name="name"
          placeholder="ФИО"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'request-name-error' : undefined}
          onChange={(e) => update('name', e.target.value)}
        />
        {errors.name && (
          <span className="request__error" id="request-name-error">
            {errors.name}
          </span>
        )}
      </label>
      <label className="request__field">
        <span className="visually-hidden">Почта</span>
        <input
          type="email"
          name="email"
          placeholder="Почта"
          autoComplete="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'request-email-error' : undefined}
          onChange={(e) => update('email', e.target.value)}
        />
        {errors.email && (
          <span className="request__error" id="request-email-error">
            {errors.email}
          </span>
        )}
      </label>
      <button type="submit" className="btn btn--accent request__submit">
        Отправить
      </button>
      <p className="request__success" role="status">
        {sent ? 'Спасибо! Менеджер свяжется с вами в течение рабочего дня.' : ''}
      </p>
    </form>
  )
}
