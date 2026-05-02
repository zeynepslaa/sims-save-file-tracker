import { ProgressBar } from './ProgressBar'

export function DashboardStats({ stats }) {
  const cards = [
    { label: 'Worlds', value: stats.worldCount },
    { label: 'Total lots', value: stats.totalLots },
    { label: 'Sims tracked', value: stats.totalResidents },
    { label: 'Finished lots', value: stats.completedLots },
    { label: 'Progress', value: `${stats.progress}%` },
  ]
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/10 bg-surface-card p-5 shadow-lg shadow-black/20"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-white">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Overall progress</h2>
          <span className="text-sm text-accent">{stats.progress}%</span>
        </div>
        <ProgressBar value={stats.progress} />
        <p className="mt-3 text-sm text-zinc-500">
          Finished lots ÷ total lots. Add lots under <strong className="text-zinc-400">Worlds</strong>.
          Sims (residents) are saved per lot — add each person with a name on the world or lot page.
        </p>
      </div>
    </div>
  )
}
