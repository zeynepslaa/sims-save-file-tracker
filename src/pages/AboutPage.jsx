import { Link } from 'react-router-dom'

/**
 * Patreon / public deploy: what this app does and does not do.
 */
export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">About this app</h1>
        <p className="mt-2 text-zinc-400">
          Short notes before you rely on it — especially if you share the link with others.
        </p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-display text-lg font-semibold text-white">Your data</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          <li>
            Everything is stored in <strong className="text-zinc-300">this browser only</strong> (
            <code className="text-accent">localStorage</code>). No account, no server, no cloud sync.
          </li>
          <li>
            If you clear site data, use another browser, or another device, your tracker data is{' '}
            <strong className="text-zinc-300">not</strong> there unless you{' '}
            <Link to="/" className="text-accent hover:underline">
              export a backup JSON
            </Link>{' '}
            from the Dashboard and import it elsewhere.
          </li>
          <li>
            <strong className="text-zinc-300">Back up regularly</strong> if your save notes matter to
            you.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-display text-lg font-semibold text-white">The Sims 4 & “live” sync</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          <li>
            The game <strong className="text-zinc-300">does not</strong> talk to this website by
            itself. Opening the tracker while playing does{' '}
            <strong className="text-zinc-300">not</strong> auto-fill lots or Sims from your save file.
          </li>
          <li>
            Optional <strong className="text-zinc-300">game bridge</strong> (
            <Link to="/settings" className="text-accent hover:underline">
              Settings
            </Link>
            ): a tiny program on <em>your</em> computer can receive HTTP updates; the site polls it.
            That is for tests or a <strong className="text-zinc-300">future mod / script</strong> you
            might add — not included in the base web app.
          </li>
          <li>
            Patreon supporters using only the public URL: expect a{' '}
            <strong className="text-zinc-300">manual planner</strong>, not real-time game integration,
            unless you set up the bridge yourself.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
        <h2 className="font-display text-lg font-semibold text-amber-200/90">Türkçe özet</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          <li>
            Veriler <strong className="text-zinc-300">sadece bu tarayıcıda</strong> durur; hesap yok,
            sunucu yok.
          </li>
          <li>
            Yedek için Dashboard’dan <strong className="text-zinc-300">JSON indir</strong>; başka
            cihaz/tarayıcıda <strong className="text-zinc-300">içe aktar</strong>.
          </li>
          <li>
            Oyun bu siteye <strong className="text-zinc-300">otomatik bağlanmaz</strong>. Köprü (
            bridge) isteğe bağlı ve gelişmiş kullanım içindir.
          </li>
        </ul>
      </section>

      <p className="text-center text-sm text-zinc-600">
        <Link to="/" className="text-accent hover:underline">
          ← Dashboard
        </Link>
      </p>
    </div>
  )
}
