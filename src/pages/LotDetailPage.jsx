import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LotChecklist } from '../components/lots/LotChecklist'
import { SimCard } from '../components/residents/SimCard'
import { LOT_TYPES, STYLE_OPTIONS } from '../constants/lotOptions'
import { useTracker } from '../context/SaveTrackerContext'

export function LotDetailPage() {
  const navigate = useNavigate()
  const { worldId, lotId } = useParams()
  const {
    worlds,
    updateLot,
    deleteLot,
    addChecklistItem,
    toggleChecklistItem,
    removeChecklistItem,
    addResident,
    updateResident,
    removeResident,
  } = useTracker()
  const [chkNew, setChkNew] = useState('')
  /** details | checklist | residents */
  const [tab, setTab] = useState('details')

  const world = worlds.find((w) => w.id === worldId)
  const lot = world?.lots.find((l) => l.id === lotId)
  const residents = lot?.residents ?? []

  if (!world || !lot) {
    return (
      <p className="text-zinc-400">
        Lot not found.{' '}
        <Link to="/worlds" className="text-accent hover:underline">
          Worlds
        </Link>
      </p>
    )
  }

  const patch = (p) => updateLot(world.id, lot.id, p)

  const handleAddChecklist = () => {
    addChecklistItem(world.id, lot.id, chkNew)
    setChkNew('')
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to={`/worlds/${world.id}`} className="text-sm text-accent hover:underline">
          ← {world.name}
        </Link>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">{lot.name}</h1>
            <p className="mt-1 text-sm text-zinc-500">
              {lot.size && `${lot.size} · `}
              {lot.lotType}
              {lot.style && ` · ${lot.style}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (confirm('Delete this lot? This cannot be undone.')) {
                deleteLot(world.id, lot.id)
                navigate(`/worlds/${world.id}`)
              }
            }}
            className="rounded-lg border border-rose-500/30 px-3 py-1.5 text-sm text-rose-300 hover:bg-rose-500/10"
          >
            Delete lot
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-1">
        {[
          { id: 'details', label: 'Lot details' },
          { id: 'checklist', label: 'Checklist' },
          { id: 'residents', label: 'Residents' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? 'bg-surface-card text-accent border border-b-0 border-white/10'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {t.label}
            {t.id === 'residents' && residents.length > 0 && (
              <span className="ml-1.5 rounded-full bg-accent/20 px-1.5 text-xs text-accent">
                {residents.length}
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        Add each Sim with a <strong className="text-zinc-400">name</strong>, then gender, career, traits &
        aspiration on their card. Use <strong className="text-zinc-400">+ Add person</strong> for the next
        household member.
      </p>

      {tab === 'details' && (
      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <div className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-white">Lot details</h2>
          <label className="block text-xs text-zinc-500">
            Name
            <input
              value={lot.name}
              onChange={(e) => patch({ name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs text-zinc-500">
            Lot size
            <input
              value={lot.size}
              onChange={(e) => patch({ size: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              placeholder="30×20"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs text-zinc-500">
              Lot type
              <select
                value={lot.lotType}
                onChange={(e) => patch({ lotType: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              >
                {LOT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-zinc-500">
              Style
              <select
                value={lot.style}
                onChange={(e) => patch({ style: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-xs text-zinc-500">
            Status
            <select
              value={lot.status}
              onChange={(e) => patch({ status: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="finished">Finished</option>
            </select>
          </label>
          <label className="block text-xs text-zinc-500">
            Notes
            <textarea
              value={lot.notes}
              onChange={(e) => patch({ notes: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs text-zinc-500">
            Screenshot URL
            <input
              value={lot.screenshotUrl}
              onChange={(e) => patch({ screenshotUrl: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              placeholder="https://…"
            />
          </label>
          {lot.screenshotUrl && (
            <a
              href={lot.screenshotUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm text-accent hover:underline"
            >
              Open screenshot link
            </a>
          )}
        </div>
      </section>
      )}

      {tab === 'checklist' && (
      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-display text-lg font-semibold text-white">Build checklist</h2>
        <div className="mt-4">
        <LotChecklist
          items={lot.checklist}
          newItem={chkNew}
          setNewItem={setChkNew}
          onAdd={handleAddChecklist}
          onToggle={(id) => toggleChecklistItem(world.id, lot.id, id)}
          onRemove={(id) => removeChecklistItem(world.id, lot.id, id)}
        />
        </div>
      </section>
      )}

      {tab === 'residents' && (
      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-white">Residents</h2>
          <button
            type="button"
            onClick={() =>
              addResident(world.id, lot.id, {
                name: '',
                gender: '',
                career: '',
                traits: '',
                aspiration: '',
                notes: '',
              })
            }
            className="rounded-lg bg-accent/25 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/35"
          >
            Add person
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {residents.length === 0 && (
            <p className="text-sm text-zinc-500">
              No Sims yet. Click <strong className="text-zinc-400">Add person</strong> and fill in each card
              (name first).
            </p>
          )}
          {residents.map((sim) => (
            <SimCard
              key={sim.id}
              sim={sim}
              onChange={(p) => updateResident(world.id, lot.id, sim.id, p)}
              onRemove={() => removeResident(world.id, lot.id, sim.id)}
            />
          ))}
        </div>
      </section>
      )}
    </div>
  )
}
