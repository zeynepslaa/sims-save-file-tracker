import { useEffect, useRef } from 'react'
import { useTracker } from '../../context/SaveTrackerContext'
import { BRIDGE_STORAGE_KEY, loadBridgeSettings } from '../../lib/bridgeSettings'

/**
 * Polls the local game-bridge server when enabled in Settings.
 */
export function BridgeConnector() {
  const { applyBridgeUpdates } = useTracker()
  const intervalRef = useRef(null)

  useEffect(() => {
    const pull = async () => {
      const cfg = loadBridgeSettings()
      if (!cfg.enabled) return
      const base = (cfg.url || 'http://localhost:3847').replace(/\/$/, '')
      try {
        const res = await fetch(`${base}/api/pull`)
        if (!res.ok) return
        const data = await res.json()
        if (data?.updates?.length) applyBridgeUpdates(data.updates)
      } catch {
        /* bridge offline */
      }
    }

    const schedule = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      const cfg = loadBridgeSettings()
      if (!cfg.enabled) return
      const ms = Math.max(500, cfg.intervalMs || 3000)
      intervalRef.current = window.setInterval(pull, ms)
      pull()
    }

    schedule()

    const onChange = () => schedule()
    const onStorage = (e) => {
      if (e.key === BRIDGE_STORAGE_KEY) schedule()
    }
    window.addEventListener('zesira-bridge-changed', onChange)
    window.addEventListener('storage', onStorage)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      window.removeEventListener('zesira-bridge-changed', onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [applyBridgeUpdates])

  return null
}
