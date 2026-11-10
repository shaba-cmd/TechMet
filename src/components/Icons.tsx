import logo from "../assets/logo.svg";

export function LogoIcon() {
  return <img src={logo} width={260} height={55} alt="ТехМЕТ" />;
}

export function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="m16 16 5.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({ up = false }: { up?: boolean }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      aria-hidden="true"
      style={{ transform: up ? "rotate(180deg)" : undefined }}
    >
      <path
        d="m1 1 3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
