import { pageNumbers } from '../../utils/filter'
import './Pagination.css'

interface Props {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

export function Pagination({ page, pageCount, onChange }: Props) {
  if (pageCount <= 1) return null

  return (
    <nav className="pagination" aria-label="Страницы каталога">
      <button type="button" disabled={page === 1} aria-label="Предыдущая страница" onClick={() => onChange(page - 1)}>
        ‹
      </button>
      {pageNumbers(page, pageCount).map((n, i) =>
        n === '…' ? (
          <span key={`gap-${i}`} className="pagination__gap">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            className={n === page ? 'is-current' : undefined}
            aria-current={n === page ? 'page' : undefined}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={page === pageCount}
        aria-label="Следующая страница"
        onClick={() => onChange(page + 1)}
      >
        ›
      </button>
    </nav>
  )
}
