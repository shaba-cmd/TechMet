import { useState } from 'react'
import { ChevronIcon } from '../Icons'
import './CheckList.css'

interface Props<T extends string> {
  title: string
  options: readonly T[]
  selected: T[]
  onChange: (selected: T[]) => void
  visible?: number
}

export function CheckList<T extends string>({ title, options, selected, onChange, visible = 6 }: Props<T>) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? options : options.slice(0, visible)

  const toggle = (option: T) =>
    onChange(selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option])

  return (
    <fieldset className="checklist">
      <legend className="filters__title">{title}</legend>
      <ul>
        {shown.map((option) => {
          const checked = selected.includes(option)
          return (
            <li key={option} className={checked ? 'is-checked' : undefined}>
              <label>
                <span>{option}</span>
                <input type="checkbox" checked={checked} onChange={() => toggle(option)} />
              </label>
            </li>
          )
        })}
      </ul>
      {options.length > visible && (
        <button type="button" className="checklist__more" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Скрыть' : 'Показать всё'} <ChevronIcon up={expanded} />
        </button>
      )}
    </fieldset>
  )
}
