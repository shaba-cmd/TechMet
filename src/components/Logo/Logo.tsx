import { LogoIcon } from '../Icons'
import './Logo.css'

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="ТехМЕТ — на главную">
      <LogoIcon />
      <span className="logo__text">
        Тех<span className="logo__accent">МЕТ</span>
      </span>
    </a>
  )
}
