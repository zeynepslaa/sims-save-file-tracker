import { InspirationGrid } from '../components/inspiration/InspirationGrid'

export function InspirationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Inspiration library</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Quick build prompts you can copy into your lot notes. These are examples only — tweak for
          your save’s story.
        </p>
      </div>
      <InspirationGrid />
    </div>
  )
}
