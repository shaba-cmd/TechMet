import { useState, type FormEvent } from 'react'
import { api, setToken } from '../../api/client'

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await api.login(login, password)
      setToken(token)
      onLogin()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти')
      setBusy(false)
    }
  }

  return (
    <form className="admin-login" onSubmit={submit}>
      <h1 className="admin__title">Вход</h1>
      <label className="admin-field">
        <span>Логин</span>
        <input type="text" autoComplete="username" value={login} onChange={(e) => setLogin(e.target.value)} required autoFocus />
      </label>
      <label className="admin-field">
        <span>Пароль</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <p className="admin__error" role="alert">
        {error}
      </p>
      <button type="submit" className="btn btn--accent" disabled={busy}>
        {busy ? 'Вход…' : 'Войти'}
      </button>
    </form>
  )
}
