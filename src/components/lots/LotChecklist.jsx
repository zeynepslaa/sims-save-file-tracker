export function LotChecklist({
  items,
  onToggle,
  onAdd,
  onRemove,
  newItem,
  setNewItem,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface-elevated/50 p-4">
      <h3 className="font-display text-sm font-semibold text-white">Checklist</h3>
      <ul className="mt-3 space-y-2">
        {items.length === 0 && (
          <li className="text-sm text-zinc-500">No tasks yet. Add build steps below.</li>
        )}
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-lg bg-black/20 px-3 py-2"
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => onToggle(item.id)}
              className="mt-1 h-4 w-4 rounded border-zinc-600 bg-surface text-accent focus:ring-accent"
            />
            <span
              className={`flex-1 text-sm ${item.done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}
            >
              {item.text}
            </span>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-xs text-zinc-500 hover:text-rose-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder="e.g. Place kitchen counters"
          className="flex-1 rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-accent/25 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/35"
        >
          Add
        </button>
      </div>
    </div>
  )
}
