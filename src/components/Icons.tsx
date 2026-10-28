export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path
        fill="#FF9501"
        d="M33.6 3.1a8.5 8.5 0 0 0-10.9 10.4L5.3 30.9a3.2 3.2 0 0 0 4.5 4.5l17.4-17.4A8.5 8.5 0 0 0 37.6 7.1l-4.9 4.9-4-.7-.7-4 4.9-4.9-.3.7Z"
      />
      <circle cx="29" cy="31" r="6.2" fill="#FF9501" />
      <circle cx="29" cy="31" r="2.6" fill="#222" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x="27.6"
          y="22.6"
          width="2.8"
          height="3.2"
          rx="0.6"
          fill="#FF9501"
          transform={`rotate(${i * 45} 29 31)`}
        />
      ))}
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="m16 16 5.5 5.5" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronIcon({ up = false }: { up?: boolean }) {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true" style={{ transform: up ? 'rotate(180deg)' : undefined }}>
      <path d="m1 1 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
