import { useEffect, useState } from 'react'
import { api, clearToken, getToken } from '../../api/client'
import { Logo } from '../Logo/Logo'
import { AdminLogin } from './AdminLogin'
import { AdminProducts } from './AdminProducts'
import './Admin.css'

type Status = 'checking' | 'guest' | 'admin'

export function Admin() {
  const [status, setStatus] = useState<Status>(() => (getToken() ? 'checking' : 'guest'))

  useEffect(() => {
    if (status !== 'checking') return
    let cancelled = false
    api
      .me()
      .then(() => !cancelled && setStatus('admin'))
      .catch(() => {
        clearToken()
        if (!cancelled) setStatus('guest')
      })
    return () => {
      cancelled = true
    }
  }, [status])

  const logout = () => {
    api.logout().catch(() => {})
    clearToken()
    setStatus('guest')
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <div className="admin__header-inner">
          <Logo />
          <span className="admin__badge">Админ-панель</span>
          <nav className="admin__nav">
            <a href="#top">На сайт</a>
            {status === 'admin' && (
              <button type="button" onClick={logout}>
                Выйти
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="admin__main">
        {status === 'guest' && <AdminLogin onLogin={() => setStatus('admin')} />}
        {status === 'admin' && <AdminProducts onUnauthorized={logout} />}
      </main>
    </div>
  )
}
