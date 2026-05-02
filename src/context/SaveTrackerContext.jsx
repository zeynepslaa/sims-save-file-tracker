import { createContext, useContext } from 'react'
import { useSaveTracker } from '../hooks/useSaveTracker'

const SaveTrackerContext = createContext(null)

export function SaveTrackerProvider({ children }) {
  const value = useSaveTracker()
  return (
    <SaveTrackerContext.Provider value={value}>{children}</SaveTrackerContext.Provider>
  )
}

export function useTracker() {
  const ctx = useContext(SaveTrackerContext)
  if (!ctx) throw new Error('useTracker must be used inside SaveTrackerProvider')
  return ctx
}
