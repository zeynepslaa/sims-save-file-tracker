const GENDERS = ['', 'Female', 'Male', 'Non-binary', 'Other']

/**
 * One Sim on a lot — name, gender, career, traits & aspiration belong to this person.
 */
export function SimCard({ sim, onChange, onRemove }) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface-elevated/50 p-4">
      <div className="flex items-start justify-between gap-2">
        <label className="block flex-1 text-xs text-zinc-500">
          Name *
          <input
            value={sim.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm font-semibold text-white"
            placeholder="First & last name"
          />
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="mt-5 shrink-0 text-xs text-zinc-500 hover:text-rose-300"
        >
          Remove
        </button>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-zinc-500">
          Gender
          <select
            value={sim.gender}
            onChange={(e) => onChange({ gender: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
          >
            {GENDERS.map((g) => (
              <option key={g || 'unspecified'} value={g}>
                {g || '—'}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs text-zinc-500">
          Career / job
          <input
            value={sim.career}
            onChange={(e) => onChange({ career: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            placeholder="Astronaut, barista…"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Traits
          <input
            value={sim.traits}
            onChange={(e) => onChange({ traits: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            placeholder="Creative, Neat…"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Aspiration
          <input
            value={sim.aspiration}
            onChange={(e) => onChange({ aspiration: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            placeholder="Bestselling Author…"
          />
        </label>
      </div>
      <label className="mt-3 block text-xs text-zinc-500">
        Notes
        <textarea
          value={sim.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          rows={2}
          className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
          placeholder="Optional story bits…"
        />
      </label>
    </div>
  )
}
