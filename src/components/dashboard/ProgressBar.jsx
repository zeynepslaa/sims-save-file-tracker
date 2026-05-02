export function ProgressBar({ value }) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-surface-elevated">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent-deep via-accent to-rose-soft transition-all duration-500 ease-out"
        style={{ width: `${v}%` }}
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
