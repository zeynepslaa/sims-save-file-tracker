import { Link } from 'react-router-dom'

const statusStyle = {
  not_started: 'bg-zinc-700/50 text-zinc-300',
  in_progress: 'bg-amber-500/20 text-amber-200',
  finished: 'bg-emerald-500/20 text-emerald-200',
}

const statusLabel = {
  not_started: 'Not started',
  in_progress: 'In progress',
  finished: 'Finished',
}

export function LotCard({ worldId, lot }) {
  const n = lot.residents?.length ?? 0
  const preview =
    n > 0 ? lot.residents.map((r) => r.name).filter(Boolean).slice(0, 2).join(', ') : null

  return (
    <Link
      to={`/worlds/${worldId}/lots/${lot.id}`}
      className="block rounded-xl border border-white/10 bg-surface-elevated/80 p-4 transition hover:border-accent/25"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="font-medium text-white">{lot.name}</h4>
          <p className="mt-0.5 text-xs text-zinc-500">
            {lot.size && `${lot.size} · `}
            {lot.lotType}
            {lot.style && ` · ${lot.style}`}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[lot.status]}`}
        >
          {statusLabel[lot.status]}
        </span>
      </div>
      {lot.notes && (
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{lot.notes}</p>
      )}
      <p className="mt-2 text-xs text-zinc-500">
        {n === 0 ? (
          <span>No Sims yet</span>
        ) : (
          <span>
            {n} Sim{n === 1 ? '' : 's'}
            {preview && <span className="text-zinc-400"> · {preview}{n > 2 ? '…' : ''}</span>}
          </span>
        )}
      </p>
    </Link>
  )
}
