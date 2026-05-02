import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { useTracker } from '../context/SaveTrackerContext'

export function DashboardPage() {
  const { stats, resetAll, state, importFullState } = useTracker()
  const fileRef = useRef(null)

  const downloadBackup = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sims-save-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        if (importFullState(parsed)) {
          alert('Backup imported successfully.')
        } else {
          alert('Invalid backup file (missing worlds array).')
        }
      } catch {
        alert('Could not parse JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your save, at a glance
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Track worlds, lots, and who lives where for your Sims 4 save. Add each{' '}
          <strong className="text-zinc-300">Sim</strong> by name, with traits, job, and aspiration on
          their own card. Everything stays in your browser — no account, no server.
        </p>
      </div>
      <DashboardStats stats={stats} />
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/worlds"
          className="rounded-full bg-accent/25 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/35"
        >
          Go to worlds
        </Link>
        <Link
          to="/inspiration"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5"
        >
          Build ideas
        </Link>
        <button
          type="button"
          onClick={() => {
            if (
              confirm(
                'Clear ALL saved data in this browser? Worlds, lots, and Sims will reset to the default preload.'
              )
            ) {
              resetAll()
            }
          }}
          className="ml-auto text-sm text-zinc-600 hover:text-rose-300"
        >
          Clear saved data
        </button>
      </div>

      <section className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-display text-lg font-semibold text-white">Backup & restore</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Download a JSON file you can keep safe. Import replaces all data in this browser.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadBackup}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
          >
            Download backup (.json)
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
          >
            Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={onImportFile}
          />
          <Link
            to="/settings"
            className="rounded-lg border border-accent/30 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10"
          >
            Live sync (bridge) →
          </Link>
        </div>
      </section>
    </div>
  )
}
