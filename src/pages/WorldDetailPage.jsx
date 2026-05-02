import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LotWorldBlock } from '../components/lots/LotWorldBlock'
import { LOT_TYPES, STYLE_OPTIONS } from '../constants/lotOptions'
import { useTracker } from '../context/SaveTrackerContext'

export function WorldDetailPage() {
  const { worldId } = useParams()
  const { worlds, addLot } = useTracker()
  const world = worlds.find((w) => w.id === worldId)
  const [form, setForm] = useState({
    name: '',
    size: '',
    lotType: 'Residential',
    style: 'Suburban',
    status: 'not_started',
    notes: '',
    screenshotUrl: '',
  })

  if (!world) {
    return (
      <p className="text-zinc-400">
        World not found. <Link to="/worlds" className="text-accent hover:underline">Back to worlds</Link>
      </p>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/worlds" className="text-sm text-accent hover:underline">
          ← Worlds
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold text-white">{world.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {world.isCustom ? 'Custom world' : 'Preloaded world'} · {world.lots.length} lot
          {world.lots.length === 1 ? '' : 's'}
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Each lot below lists <strong className="text-zinc-400">who lives there</strong> — add Sims by
          name. Full lot page has tabs: <strong className="text-zinc-400">Lot details</strong>,{' '}
          <strong className="text-zinc-400">Checklist</strong>, <strong className="text-zinc-400">Residents</strong>.
        </p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-display text-lg font-semibold text-white">Add a lot</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            addLot(world.id, form)
            setForm({
              name: '',
              size: '',
              lotType: form.lotType,
              style: form.style,
              status: 'not_started',
              notes: '',
              screenshotUrl: '',
            })
          }}
        >
          <label className="text-xs text-zinc-500 sm:col-span-2">
            Lot name *
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              placeholder="Riverside starter"
            />
          </label>
          <label className="text-xs text-zinc-500">
            Lot size
            <input
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              placeholder="40×30"
            />
          </label>
          <label className="text-xs text-zinc-500">
            Lot type
            <select
              value={form.lotType}
              onChange={(e) => setForm({ ...form, lotType: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            >
              {LOT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-zinc-500">
            Style
            <select
              value={form.style}
              onChange={(e) => setForm({ ...form, style: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            >
              {STYLE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-zinc-500">
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="finished">Finished</option>
            </select>
          </label>
          <label className="text-xs text-zinc-500 sm:col-span-2">
            Notes
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="text-xs text-zinc-500 sm:col-span-2">
            Screenshot URL (paste link)
            <input
              value={form.screenshotUrl}
              onChange={(e) => setForm({ ...form, screenshotUrl: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
              placeholder="https://…"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-accent/25 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/35"
            >
              Add lot
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-white">Lots in this world</h2>
        {world.lots.length === 0 ? (
          <div className="mt-4 rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm text-zinc-300">
            <p className="font-medium text-white">Add lots, then Sims by name</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-zinc-400">
              <li>
                Click <strong className="text-zinc-300">Add lot</strong> above — submit the form.
              </li>
              <li>
                Your lot appears below with <strong className="text-zinc-300">Who lives here</strong> — use{' '}
                <strong className="text-zinc-300">+ Add person</strong> for each Sim (name, traits, job…).
              </li>
              <li>
                Or open the lot page → <strong className="text-zinc-300">Residents</strong> tab for the same
                cards.
              </li>
            </ol>
          </div>
        ) : (
          <div className="mt-4 grid gap-6">
            {world.lots.map((lot) => (
              <LotWorldBlock key={lot.id} worldId={world.id} lot={lot} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
