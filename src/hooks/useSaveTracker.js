import { useCallback, useEffect, useMemo, useState } from 'react'
import { PRELOADED_WORLD_NAMES } from '../data/preloadedWorlds'
import { createId } from '../lib/id'

const STORAGE_KEY = 'sims-save-file-tracker-v1'

/** @typedef {{ id: string, text: string, done: boolean }} ChecklistItem */
/** @typedef {{ id: string, name: string, gender: string, career: string, traits: string, aspiration: string, notes: string }} Resident */
/** @typedef {{ id: string, name: string, size: string, lotType: string, style: string, status: 'not_started'|'in_progress'|'finished', notes: string, screenshotUrl: string, checklist: ChecklistItem[], residents: Resident[] }} Lot */
/** @typedef {{ id: string, name: string, isCustom: boolean, lots: Lot[] }} World */

function normalizeResident(r) {
  return {
    id: r.id || createId('sim'),
    name: r.name ?? '',
    gender: r.gender ?? '',
    career: r.career ?? '',
    traits: r.traits ?? '',
    aspiration: r.aspiration ?? '',
    notes: r.notes ?? '',
  }
}

/**
 * Legacy lots had `households` with familyName + shared traits; migrate into per-person residents.
 */
function normalizeLot(lot) {
  const existing = Array.isArray(lot.residents) ? lot.residents.map(normalizeResident) : []
  const legacy = Array.isArray(lot.households)
    ? lot.households.map((h) =>
        normalizeResident({
          id: createId('sim'),
          name: h.familyName || 'Sim',
          gender: '',
          career: '',
          traits: h.traits || '',
          aspiration: h.aspiration || '',
          notes: h.storyNotes || '',
        })
      )
    : []
  const residents = [...existing, ...legacy]
  const { households: _drop, ...rest } = lot
  return {
    ...rest,
    residents,
    checklist: Array.isArray(lot.checklist) ? lot.checklist : [],
  }
}

function normalizeWorlds(worlds) {
  if (!Array.isArray(worlds)) return []
  return worlds.map((w) => ({
    ...w,
    lots: (w.lots || []).map(normalizeLot),
  }))
}

/** @returns {{ worlds: World[], version: number }} */
function buildInitialState() {
  const worlds = PRELOADED_WORLD_NAMES.map((w) => ({
    id: createId('world'),
    name: w.name,
    isCustom: false,
    lots: [],
  }))
  return { worlds, version: 1 }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildInitialState()
    const parsed = JSON.parse(raw)
    if (!parsed?.worlds || !Array.isArray(parsed.worlds)) return buildInitialState()
    return {
      worlds: normalizeWorlds(parsed.worlds),
      version: parsed.version || 1,
    }
  } catch {
    return buildInitialState()
  }
}

function saveToStorage(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useSaveTracker() {
  const [state, setState] = useState(() => loadFromStorage())

  useEffect(() => {
    saveToStorage(state)
  }, [state])

  const stats = useMemo(() => {
    let totalLots = 0
    let completedLots = 0
    let totalResidents = 0
    for (const w of state.worlds) {
      for (const l of w.lots) {
        totalLots += 1
        if (l.status === 'finished') completedLots += 1
        totalResidents += l.residents?.length ?? 0
      }
    }
    const progress = totalLots === 0 ? 0 : Math.round((completedLots / totalLots) * 100)
    return {
      worldCount: state.worlds.length,
      totalLots,
      completedLots,
      totalResidents,
      progress,
    }
  }, [state.worlds])

  const addCustomWorld = useCallback((name) => {
    const trimmed = name?.trim()
    if (!trimmed) return
    setState((s) => ({
      ...s,
      worlds: [
        ...s.worlds,
        { id: createId('world'), name: trimmed, isCustom: true, lots: [] },
      ],
    }))
  }, [])

  const addLot = useCallback((worldId, lot) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) =>
        w.id === worldId
          ? {
              ...w,
              lots: [
                ...w.lots,
                {
                  id: createId('lot'),
                  name: lot.name || 'Untitled Lot',
                  size: lot.size || '',
                  lotType: lot.lotType || 'Residential',
                  style: lot.style || '',
                  status: lot.status || 'not_started',
                  notes: lot.notes || '',
                  screenshotUrl: lot.screenshotUrl || '',
                  checklist: [],
                  residents: [],
                },
              ],
            }
          : w
      ),
    }))
  }, [])

  const updateLot = useCallback((worldId, lotId, patch) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) =>
        w.id === worldId
          ? {
              ...w,
              lots: w.lots.map((l) => (l.id === lotId ? { ...l, ...patch } : l)),
            }
          : w
      ),
    }))
  }, [])

  const deleteLot = useCallback((worldId, lotId) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) =>
        w.id === worldId ? { ...w, lots: w.lots.filter((l) => l.id !== lotId) } : w
      ),
    }))
  }, [])

  const setChecklist = useCallback((worldId, lotId, checklist) => {
    updateLot(worldId, lotId, { checklist })
  }, [updateLot])

  const addChecklistItem = useCallback((worldId, lotId, text) => {
    const t = text?.trim()
    if (!t) return
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) => {
        if (w.id !== worldId) return w
        return {
          ...w,
          lots: w.lots.map((l) => {
            if (l.id !== lotId) return l
            return {
              ...l,
              checklist: [...l.checklist, { id: createId('chk'), text: t, done: false }],
            }
          }),
        }
      }),
    }))
  }, [])

  const toggleChecklistItem = useCallback((worldId, lotId, itemId) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) => {
        if (w.id !== worldId) return w
        return {
          ...w,
          lots: w.lots.map((l) => {
            if (l.id !== lotId) return l
            return {
              ...l,
              checklist: l.checklist.map((c) =>
                c.id === itemId ? { ...c, done: !c.done } : c
              ),
            }
          }),
        }
      }),
    }))
  }, [])

  const removeChecklistItem = useCallback((worldId, lotId, itemId) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) => {
        if (w.id !== worldId) return w
        return {
          ...w,
          lots: w.lots.map((l) => {
            if (l.id !== lotId) return l
            return {
              ...l,
              checklist: l.checklist.filter((c) => c.id !== itemId),
            }
          }),
        }
      }),
    }))
  }, [])

  const addResident = useCallback((worldId, lotId, resident) => {
    const row = normalizeResident({
      id: createId('sim'),
      name: resident.name || '',
      gender: resident.gender || '',
      career: resident.career || '',
      traits: resident.traits || '',
      aspiration: resident.aspiration || '',
      notes: resident.notes || '',
    })
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) => {
        if (w.id !== worldId) return w
        return {
          ...w,
          lots: w.lots.map((l) => {
            if (l.id !== lotId) return l
            return {
              ...l,
              residents: [...(l.residents || []), row],
            }
          }),
        }
      }),
    }))
  }, [])

  const updateResident = useCallback((worldId, lotId, residentId, patch) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) => {
        if (w.id !== worldId) return w
        return {
          ...w,
          lots: w.lots.map((l) => {
            if (l.id !== lotId) return l
            return {
              ...l,
              residents: (l.residents || []).map((r) =>
                r.id === residentId ? normalizeResident({ ...r, ...patch }) : r
              ),
            }
          }),
        }
      }),
    }))
  }, [])

  const removeResident = useCallback((worldId, lotId, residentId) => {
    setState((s) => ({
      ...s,
      worlds: s.worlds.map((w) => {
        if (w.id !== worldId) return w
        return {
          ...w,
          lots: w.lots.map((l) => {
            if (l.id !== lotId) return l
            return {
              ...l,
              residents: (l.residents || []).filter((r) => r.id !== residentId),
            }
          }),
        }
      }),
    }))
  }, [])

  const resetAll = useCallback(() => {
    const fresh = buildInitialState()
    setState(fresh)
    saveToStorage(fresh)
  }, [])

  /**
   * Replace entire app state from a JSON backup (same shape as localStorage).
   * @returns {boolean} success
   */
  const importFullState = useCallback((parsed) => {
    if (!parsed?.worlds || !Array.isArray(parsed.worlds)) return false
    const next = {
      worlds: normalizeWorlds(parsed.worlds),
      version: parsed.version || 1,
    }
    setState(next)
    saveToStorage(next)
    return true
  }, [])

  /**
   * Live bridge: merge lot updates by world name + lot name.
   * Each item: { worldName, lotName, ...optionalFields matching Lot }
   */
  const applyBridgeUpdates = useCallback((updates) => {
    if (!Array.isArray(updates) || updates.length === 0) return
    setState((s) => {
      const worlds = s.worlds.map((w) => ({
        ...w,
        lots: w.lots.map((l) => ({ ...l })),
      }))
      for (const raw of updates) {
        const worldName = raw.worldName
        const lotName = raw.lotName
        if (!worldName || !lotName) continue
        const { worldName: _w, lotName: _l, ...patch } = raw
        const wi = worlds.findIndex((x) => x.name === worldName)
        if (wi < 0) continue
        const w = worlds[wi]
        const li = w.lots.findIndex((l) => l.name === lotName)
        if (li >= 0) {
          const newLots = [...w.lots]
          newLots[li] = normalizeLot({ ...newLots[li], ...patch })
          worlds[wi] = { ...w, lots: newLots }
        } else {
          worlds[wi] = {
            ...w,
            lots: [
              ...w.lots,
              normalizeLot({
                id: createId('lot'),
                name: lotName,
                size: patch.size ?? '',
                lotType: patch.lotType || 'Residential',
                style: patch.style || '',
                status: patch.status || 'not_started',
                notes: patch.notes ?? '',
                screenshotUrl: patch.screenshotUrl ?? '',
                checklist: [],
                residents: [],
              }),
            ],
          }
        }
      }
      return { ...s, worlds }
    })
  }, [])

  return {
    state,
    worlds: state.worlds,
    stats,
    addCustomWorld,
    addLot,
    updateLot,
    deleteLot,
    setChecklist,
    addChecklistItem,
    toggleChecklistItem,
    removeChecklistItem,
    addResident,
    updateResident,
    removeResident,
    resetAll,
    importFullState,
    applyBridgeUpdates,
  }
}
