import { useState } from 'react'
import { BUDGET } from '../data'

function fmt(usd) {
  return usd > 0 ? `$${usd.toLocaleString()}` : '—'
}

function BarRow({ cat, storage }) {
  const actualKey = `budget_actual_${cat.id}`
  const savedActual = storage.get(actualKey, cat.actualUsd)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const pct = cat.budgetUsd > 0 ? Math.min(100, (savedActual / cat.budgetUsd) * 100) : 0
  const over = savedActual > cat.budgetUsd

  function startEdit() { setDraft(String(savedActual)); setEditing(true) }
  function commit() {
    const val = parseFloat(draft.replace(/[^0-9.]/g, ''))
    if (!isNaN(val)) storage.update(actualKey, val)
    setEditing(false)
  }

  return (
    <div className="py-3 border-b border-pcream last:border-0">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl flex-shrink-0">{cat.icon}</span>
          <div className="min-w-0">
            <p className="font-medium text-pnavy text-sm">{cat.label}</p>
            <p className="text-xs text-gray-400 truncate">{cat.note}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 text-sm">
          {/* Actual — click to edit */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Actual</p>
            {editing ? (
              <input
                autoFocus
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') commit() }}
                className="w-20 text-right border border-plovender rounded px-1 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-plovender"
              />
            ) : (
              <button
                onClick={startEdit}
                className={`font-semibold hover:underline ${over ? 'text-red-600' : savedActual > 0 ? 'text-emerald-600' : 'text-gray-400'}`}
                title="Click to edit"
              >
                {fmt(savedActual)}
              </button>
            )}
          </div>
          {/* Budget */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Budget</p>
            <p className="font-semibold text-gray-600">{fmt(cat.budgetUsd)}</p>
          </div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${over ? 'bg-red-400' : cat.color || 'bg-pblue'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function BudgetTab({ storage }) {
  const totalBudget = BUDGET.categories.reduce((s, c) => s + c.budgetUsd, 0)
  const totalActual = BUDGET.categories.reduce((s, c) => {
    const v = storage.get(`budget_actual_${c.id}`, c.actualUsd)
    return s + (v || 0)
  }, 0)
  const pctSpent = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0

  return (
    <div>
      <h2 className="section-header">Budget Tracker</h2>
      <p className="section-sub">All amounts in USD · Click actual amounts to edit</p>

      {/* Summary card */}
      <div className="card p-5 mb-6 bg-gradient-to-r from-pblue/5 to-plovender/5 border-plovender/20">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Total Spent</p>
            <p className="text-3xl font-bold text-pnavy">${totalActual.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Total Budget</p>
            <p className="text-2xl font-semibold text-gray-500">${totalBudget.toLocaleString()}</p>
          </div>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${totalActual > totalBudget ? 'bg-red-400' : 'bg-gradient-provence'}`}
            style={{ width: `${Math.min(100, pctSpent)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">{pctSpent}% of budget used · ${(totalBudget - totalActual).toLocaleString()} remaining</p>
      </div>

      {/* Category rows */}
      <div className="card px-5">
        {BUDGET.categories.map(cat => (
          <BarRow key={cat.id} cat={cat} storage={storage} />
        ))}
      </div>

      {/* EUR note */}
      <p className="text-xs text-gray-400 mt-3 text-center">
        EUR/USD rate used for estimates: {BUDGET.eurUsdRate} · Rates fluctuate — check before departure
      </p>
    </div>
  )
}
