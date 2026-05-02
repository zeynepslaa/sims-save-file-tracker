import { Link } from 'react-router-dom'

export function WorldCard({ world }) {
  const lotCount = world.lots.length
  const finished = world.lots.filter((l) => l.status === 'finished').length
  const simCount = world.lots.reduce((n, l) => n + (l.residents?.length ?? 0), 0)
  return (
    <Link
      to={`/worlds/${world.id}`}
      className="group block rounded-2xl border border-white/10 bg-surface-card p-5 transition hover:border-accent/30 hover:bg-surface-elevated"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-white group-hover:text-accent">
            {world.name}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {world.isCustom ? 'Custom world' : 'Preloaded world'}
          </p>
        </div>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-400">
          {lotCount} lot{lotCount === 1 ? '' : 's'}
        </span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        {finished} finished · {lotCount - finished} not finished
        {simCount > 0 && (
          <span className="text-zinc-500">
            {' '}
            · {simCount} Sim{simCount === 1 ? '' : 's'}
          </span>
        )}
      </p>
    </Link>
  )
}
