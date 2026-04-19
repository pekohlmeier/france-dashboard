import { useState, useCallback } from 'react'

const STORAGE_KEY = 'france2026'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useStorage() {
  const [overrides, setOverrides] = useState(loadState)

  const update = useCallback((key, value) => {
    setOverrides(prev => {
      const next = { ...prev, [key]: value }
      saveState(next)
      return next
    })
  }, [])

  // get(key, fallback) — returns saved value or fallback
  const get = useCallback((key, fallback) => {
    return overrides[key] !== undefined ? overrides[key] : fallback
  }, [overrides])

  return { get, update, overrides }
}
