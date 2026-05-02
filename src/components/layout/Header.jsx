import { Link, useLocation } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Dashboard' },
  { to: '/worlds', label: 'Worlds' },
  { to: '/inspiration', label: 'Inspiration' },
  { to: '/about', label: 'About' },
  { to: '/settings', label: 'Settings' },
]

export function Header() {
  const loc = useLocation()
  return (
    <header className="border-b border-white/10 bg-surface-card/80 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-white">
          Sims Save File <span className="text-accent">Tracker</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {nav.map((item) => {
            const active = loc.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'bg-accent/20 text-accent'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
