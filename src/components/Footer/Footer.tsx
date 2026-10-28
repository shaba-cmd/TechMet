import { Logo } from '../Logo/Logo'
import { RequestForm } from '../RequestForm/RequestForm'
import './Footer.css'

const LINKS = ['О нас', 'Новости', 'Политика конфиденциальности', 'Правила продаж', 'Сервисные центры']

interface Props {
  subject: string | null
  onClearSubject: () => void
}

export function Footer({ subject, onClearSubject }: Props) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <Logo />
        </div>

        <nav className="footer__col" id="company" aria-labelledby="footer-company">
          <h2 className="footer__title" id="footer-company">
            Компания
          </h2>
          <ul>
            {LINKS.map((link) => (
              <li key={link} id={link === 'О нас' ? 'about' : undefined}>
                <a href="#top">{link}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col" id="request">
          <h2 className="footer__title">Оставить заявку</h2>
          <RequestForm subject={subject} onClearSubject={onClearSubject} />
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} ТехМЕТ — аренда спецтехники</p>
    </footer>
  )
}
