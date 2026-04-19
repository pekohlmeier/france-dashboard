import { useState } from 'react'
import { useStorage } from './useStorage'
import Hero from './components/Hero'
import ItineraryTab from './components/ItineraryTab'
import FlightsTab from './components/FlightsTab'
import LodgingTab from './components/LodgingTab'
import AdventuresTab from './components/AdventuresTab'
import FoodTab from './components/FoodTab'
import BudgetTab from './components/BudgetTab'
import WeddingTab from './components/WeddingTab'

const TABS = [
  { id: 'itinerary',  label: '📅 Itinerary' },
  { id: 'flights',    label: '✈️ Flights' },
  { id: 'lodging',    label: '🏠 Lodging' },
  { id: 'adventures', label: '⛵ Adventures' },
  { id: 'food',       label: '🍷 Food' },
  { id: 'budget',     label: '💰 Budget' },
  { id: 'wedding',    label: '💍 Wedding' },
]

export default function App() {
  const [tab, setTab] = useState('itinerary')
  const storage = useStorage()

  return (
    <div className="min-h-screen bg-pcream">
      <Hero />

      {/* Sticky tab nav */}
      <nav className="sticky top-0 z-20 bg-gradient-provence shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`tab-btn flex-shrink-0 ${tab === t.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8 tab-content" key={tab}>
        {tab === 'itinerary'  && <ItineraryTab storage={storage} />}
        {tab === 'flights'    && <FlightsTab />}
        {tab === 'lodging'    && <LodgingTab storage={storage} />}
        {tab === 'adventures' && <AdventuresTab />}
        {tab === 'food'       && <FoodTab />}
        {tab === 'budget'     && <BudgetTab storage={storage} />}
        {tab === 'wedding'    && <WeddingTab />}
      </main>

      <footer className="text-center text-xs text-gray-400 py-6 border-t border-psand mt-4">
        France 2026 · Paul's Trip Dashboard · ☀️ South of France &amp; Munich
      </footer>
    </div>
  )
}
