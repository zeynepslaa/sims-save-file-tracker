import { useState } from 'react'
import { loadBridgeSettings, saveBridgeSettings } from '../lib/bridgeSettings'

export function SettingsPage() {
  const [cfg, setCfg] = useState(() => loadBridgeSettings())

  const persist = (next) => {
    setCfg(next)
    saveBridgeSettings(next)
    window.dispatchEvent(new Event('zesira-bridge-changed'))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-zinc-400">
          The Sims 4 cannot push data into a browser tab by itself. Use the optional{' '}
          <strong className="text-zinc-300">game bridge</strong>: a tiny program on your Mac that
          receives updates (from a future mod or a test script) and this app pulls them in near
          real-time.
        </p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-display text-lg font-semibold text-white">Game bridge (live sync)</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-400">
          <li>
            In a <strong className="text-zinc-300">second terminal</strong>, run:{' '}
            <code className="rounded bg-black/40 px-1.5 py-0.5 text-accent">npm run bridge</code>
          </li>
          <li>Leave it running. It listens on port 3847 by default.</li>
          <li>Enable polling below and keep this tab open while you play / test.</li>
        </ol>

        <label className="mt-6 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={cfg.enabled}
            onChange={(e) => persist({ ...cfg, enabled: e.target.checked })}
            className="h-4 w-4 rounded border-zinc-600 bg-surface text-accent"
          />
          <span className="text-sm text-zinc-200">Enable bridge polling</span>
        </label>

        <label className="mt-4 block text-xs text-zinc-500">
          Bridge URL
          <input
            value={cfg.url}
            onChange={(e) => persist({ ...cfg, url: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
            placeholder="http://localhost:3847"
          />
        </label>

        <label className="mt-4 block text-xs text-zinc-500">
          Poll every (ms)
          <input
            type="number"
            min={500}
            step={500}
            value={cfg.intervalMs}
            onChange={(e) => persist({ ...cfg, intervalMs: Number(e.target.value) || 3000 })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-white"
          />
        </label>

        <p className="mt-4 text-xs text-zinc-500">
          Test: run <code className="text-accent">npm run bridge</code>, enable polling above, then in
          another terminal:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-zinc-300">
          {`curl -X POST http://localhost:3847/api/push \\
  -H "Content-Type: application/json" \\
  -d '{"updates":[{"worldName":"Willow Creek","lotName":"Bridge Test","status":"finished"}]}'`}
        </pre>
      </section>

      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
        <h2 className="font-display text-lg font-semibold text-amber-200/90">About “real” game sync</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          A future <strong className="text-zinc-300">Sims 4 script mod</strong> (.ts4script) could
          send HTTP requests to <code className="text-accent">localhost:3847</code> when a lot loads
          or when you click a custom interaction. That is a separate project (Python 3.7 compile,
          EA APIs). This web app + bridge is the <strong className="text-zinc-300">receiver</strong>{' '}
          side — already wired.
        </p>
      </section>
    </div>
  )
}
