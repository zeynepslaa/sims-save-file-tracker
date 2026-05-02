export const BRIDGE_STORAGE_KEY = 'zesira-bridge-settings-v1'

const defaultSettings = {
  enabled: false,
  url: 'http://localhost:3847',
  intervalMs: 3000,
}

export function loadBridgeSettings() {
  try {
    const raw = localStorage.getItem(BRIDGE_STORAGE_KEY)
    if (!raw) return { ...defaultSettings }
    return { ...defaultSettings, ...JSON.parse(raw) }
  } catch {
    return { ...defaultSettings }
  }
}

export function saveBridgeSettings(s) {
  localStorage.setItem(BRIDGE_STORAGE_KEY, JSON.stringify(s))
}
