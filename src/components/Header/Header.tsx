import { useEffect, useState } from 'react'
import { Logo } from '../Logo/Logo'
import './Header.css'

const NAV = [
  { href: '#catalog', title: 'Аренда' },
  { href: '#company', title: 'Компания' },
  { href: '#faq', title: 'FAQ' },
  { href: '#about', title: 'О нас' },
  { href: '#request', title: 'Контакты' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const links = NAV.map((item) => (
    <li key={item.href}>
      <a href={item.href} onClick={() => setMenuOpen(false)}>
        {item.title}
      </a>
    </li>
  ))

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <nav className="header__nav" aria-label="Основное меню">
          <ul>{links}</ul>
        </nav>
        <button
          type="button"
          className={`burger${menuOpen ? ' burger--open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="drawer"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`drawer${menuOpen ? ' drawer--open' : ''}`} id="drawer" hidden={!menuOpen}>
        <div className="drawer__backdrop" onClick={() => setMenuOpen(false)} />
        <nav className="drawer__panel" aria-label="Мобильное меню">
          <ul>{links}</ul>
          <p className="drawer__contacts">
            <a href="tel:+78000000000">8 800 000-00-00</a>
            <a href="mailto:info@techmet.ru">info@techmet.ru</a>
          </p>
        </nav>
      </div>
    </header>
  )
}
