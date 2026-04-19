import { LODGING, REGIONS } from '../data'
import { EditableText } from './EditableText'

const STATUS_STYLES = {
  saved:      { label: 'Saved ✓', bg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  booked:     { label: 'Booked ✓', bg: 'bg-pblue/10 text-pblue border-pblue/20' },
  searching:  { label: 'Need to Book', bg: 'bg-amber-100 text-amber-700 border-amber-200' },
}

export default function LodgingTab({ storage }) {
  const totalNights = LODGING.reduce((s, l) => s + l.nights, 0)
  const bookedNights = LODGING.filter(l => l.status === 'booked' || l.status === 'saved').reduce((s, l) => s + l.nights, 0)

  return (
    <div>
      <h2 className="section-header">Lodging</h2>
      <p className="section-sub">{totalNights} nights across 5 locations · {bookedNights} booked, {totalNights - bookedNights} still searching</p>

      <div className="grid gap-5">
        {LODGING.map(lodge => {
          const region = REGIONS[lodge.region] || {}
          const statusStyle = STATUS_STYLES[lodge.status] || STATUS_STYLES.searching
          const noteKey = `lodge_note_${lodge.id}`
          const savedNote = storage.get(noteKey, lodge.notes)

          return (
            <div key={lodge.id} className="card overflow-hidden">
              {/* Image header */}
              <div
                className="h-36 relative hero-img"
                style={{
                  backgroundImage: `linear-gradient(to right, #0D213780, #7D6B9E40), url(${lodge.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-serif font-semibold text-lg leading-tight drop-shadow">{lodge.name}</p>
                      <p className="text-white/80 text-sm">{lodge.location}</p>
                    </div>
                    <span className={`status-badge border ${statusStyle.bg}`}>{statusStyle.label}</span>
                  </div>
                </div>
              </div>

              {/* Info row */}
              <div className="px-5 py-3 flex flex-wrap gap-4 border-b border-pcream text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Check-in</p>
                  <p className="font-medium text-pnavy">{lodge.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Check-out</p>
                  <p className="font-medium text-pnavy">{lodge.checkOut}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Nights</p>
                  <p className="font-medium text-pnavy">{lodge.nights}</p>
                </div>
                {lodge.pricePerNight && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Per Night</p>
                    <p className="font-medium text-pnavy">€{lodge.pricePerNight}</p>
                  </div>
                )}
                {lodge.rating && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Rating</p>
                    <p className="font-medium text-pnavy">★ {lodge.rating} <span className="text-gray-400">({lodge.reviews} reviews)</span></p>
                  </div>
                )}
                {lodge.badge && (
                  <div className="self-end">
                    <span className="status-badge bg-pgold/20 text-pgold border border-pgold/30">{lodge.badge}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="px-5 py-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5 font-medium">Notes</p>
                <EditableText
                  value={savedNote}
                  onSave={v => storage.update(noteKey, v)}
                  multiline
                  className="text-sm text-gray-600 leading-relaxed w-full"
                  placeholder="Add notes, booking details…"
                />
              </div>

              {/* Link */}
              {lodge.link && (
                <div className="px-5 pb-4">
                  <a
                    href={lodge.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-pblue hover:text-plovender transition-colors font-medium"
                  >
                    🔗 View listing →
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
