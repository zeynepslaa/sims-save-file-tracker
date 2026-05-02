import { useState } from 'react'
import { WorldCard } from '../components/worlds/WorldCard'
import { useTracker } from '../context/SaveTrackerContext'

export function WorldsPage() {
  const { worlds, addCustomWorld } = useTracker()
  const [name, setName] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Worlds</h1>
        <p className="mt-2 text-zinc-400">
          Preloaded worlds are ready — add lots inside each. You can also create custom worlds for
          fan builds or legacy saves.
        </p>
      </div>
      <form
        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-surface-card p-5 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault()
          addCustomWorld(name)
          setName('')
        }}
      >
        <label className="flex-1 text-sm text-zinc-500">
          New custom world name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-white"
            placeholder="e.g. Zesira Forever Save"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-accent/25 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/35"
        >
          Add world
        </button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {worlds.map((w) => (
          <WorldCard key={w.id} world={w} />
        ))}
      </div>
    </div>
  )
}
