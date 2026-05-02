import { Link } from 'react-router-dom'
import { useState } from 'react'
import { SimCard } from '../residents/SimCard'
import { useTracker } from '../../context/SaveTrackerContext'

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

const emptyDraft = () => ({
  name: '',
  gender: '',
  career: '',
  traits: '',
  aspiration: '',
  notes: '',
})

/**
 * Lot summary + residents on the **world** page — who lives here, one Sim at a time.
 */
export function LotWorldBlock({ worldId, lot }) {
  const { addResident, updateResident, removeResident } = useTracker()
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState(emptyDraft)

  const residents = lot.residents ?? []

  const submitResident = (e) => {
    e.preventDefault()
    if (!draft.name.trim()) return
    addResident(worldId, lot.id, draft)
    setDraft(emptyDraft())
    setShowForm(false)
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/60">
      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              to={`/worlds/${worldId}/lots/${lot.id}`}
              className="font-display text-lg font-semibold text-white hover:text-accent"
            >
              {lot.name}
            </Link>
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
        {lot.notes && <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{lot.notes}</p>}
        <Link
          to={`/worlds/${worldId}/lots/${lot.id}`}
          className="mt-2 inline-block text-xs text-accent hover:underline"
        >
          Open full lot page (checklist, all fields) →
        </Link>
      </div>

      <div className="border-t border-white/10 bg-black/25 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-white">Who lives here</h3>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-accent/25 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/35"
          >
            {showForm ? 'Cancel' : '+ Add person'}
          </button>
        </div>

        {residents.length === 0 && !showForm && (
          <p className="mt-2 text-sm text-zinc-500">
            No Sims yet — add each person by name (then traits, job, aspiration on their card).
          </p>
        )}

        {showForm && (
          <form
            onSubmit={submitResident}
            className="mt-3 grid gap-3 rounded-xl border border-accent/20 bg-surface-card/80 p-4 sm:grid-cols-2"
          >
            <label className="sm:col-span-2 block text-xs text-zinc-500">
              Name *
              <input
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
                placeholder="e.g. Bella Goth"
              />
            </label>
            <label className="block text-xs text-zinc-500">
              Gender
              <select
                value={draft.gender}
                onChange={(e) => setDraft({ ...draft, gender: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              >
                <option value="">—</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="block text-xs text-zinc-500">
              Career / job
              <input
                value={draft.career}
                onChange={(e) => setDraft({ ...draft, career: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
                placeholder="Job or school"
              />
            </label>
            <label className="block text-xs text-zinc-500">
              Traits
              <input
                value={draft.traits}
                onChange={(e) => setDraft({ ...draft, traits: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block text-xs text-zinc-500">
              Aspiration
              <input
                value={draft.aspiration}
                onChange={(e) => setDraft({ ...draft, aspiration: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="sm:col-span-2 block text-xs text-zinc-500">
              Notes
              <textarea
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                rows={2}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-accent/30 px-4 py-2 text-sm font-semibold text-white hover:bg-accent/40"
              >
                Save this Sim
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 space-y-3">
          {residents.map((sim) => (
            <SimCard
              key={sim.id}
              sim={sim}
              onChange={(p) => updateResident(worldId, lot.id, sim.id, p)}
              onRemove={() => removeResident(worldId, lot.id, sim.id)}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
