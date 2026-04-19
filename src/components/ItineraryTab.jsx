import { ITINERARY, REGIONS } from '../data'
import { EditableText } from './EditableText'

const TYPE_ICON = {
  flight:    '✈️',
  transport: '🚂',
  activity:  '📍',
  food:      '🍷',
  wedding:   '💍',
  travel:    '🌙',
}

const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)

function getStatus(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  if (d < TODAY) return 'past'
  if (d.getTime() === TODAY.getTime()) return 'today'
  return 'future'
}

export default function ItineraryTab({ storage }) {
  return (
    <div>
      <h2 className="section-header">Day-by-Day Itinerary</h2>
      <p className="section-sub">20 days · July 14 – August 2, 2026</p>

      <div className="relative timeline-line pl-12 space-y-4">
        {ITINERARY.map((day, i) => {
          const region = REGIONS[day.region] || REGIONS.travel
          const status = getStatus(day.date)
          const noteKey = `note_${day.date}`
          const savedNote = storage.get(noteKey, day.notes)
          const isWedding = day.region === 'wedding'

          return (
            <div key={day.date} className="relative">
              {/* Timeline dot */}
              <div className={`
                absolute -left-12 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md z-10
                ${status === 'today' ? 'bg-pgold ring-4 ring-pgold/30' : status === 'past' ? 'bg-gray-400' : `bg-gradient-to-br from-pblue to-plovender`}
              `}>
                {status === 'past' ? '✓' : (i + 1)}
              </div>

              {/* Day card */}
              <div className={`card transition-all duration-200 ${status === 'today' ? 'ring-2 ring-pgold/50 shadow-md' : ''} ${status === 'past' ? 'opacity-70' : ''}`}>
                {/* Card header */}
                <div
                  className={`px-5 py-3 flex items-center justify-between ${isWedding ? 'bg-gradient-to-r from-pgold to-amber-400' : 'bg-gradient-to-r from-pblue/90 to-plovender/80'}`}
                >
                  <div>
                    <p className="text-xs font-medium text-white/70 uppercase tracking-wider">{day.label}</p>
                    <p className="text-white font-semibold">{day.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {status === 'today' && (
                      <span className="bg-white text-pgold text-xs font-bold px-2 py-0.5 rounded-full">TODAY</span>
                    )}
                    <span className={`region-pill bg-white/20 text-white/90`}>{region.label}</span>
                  </div>
                </div>

                {/* Activities */}
                <div className="px-5 py-3 divide-y divide-gray-100">
                  {day.activities.map((act, j) => (
                    <div key={j} className="py-2.5 flex gap-3">
                      <span className="text-lg flex-shrink-0 mt-0.5">{TYPE_ICON[act.type] || '•'}</span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{act.time}</span>
                          <span className="font-medium text-pnavy text-sm">{act.title}</span>
                        </div>
                        {act.detail && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{act.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="px-5 pb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-medium">Notes</p>
                  <EditableText
                    value={savedNote}
                    onSave={v => storage.update(noteKey, v)}
                    multiline
                    className="text-sm text-gray-600 leading-relaxed w-full"
                    placeholder="Add notes…"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
