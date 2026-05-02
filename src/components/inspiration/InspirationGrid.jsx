import { INSPIRATION_IDEAS } from '../../data/inspirationIdeas'

export function InspirationGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {INSPIRATION_IDEAS.map((idea) => (
        <article
          key={idea.id}
          className="rounded-2xl border border-white/10 bg-surface-card p-6 shadow-lg shadow-black/15"
        >
          <h3 className="font-display text-lg font-semibold text-white">{idea.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{idea.description}</p>
        </article>
      ))}
    </div>
  )
}
