import { ADVENTURES } from '../data'

const DIFF_COLOR = {
  Easy:     'bg-emerald-100 text-emerald-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Hard:     'bg-red-100 text-red-700',
}

export default function AdventuresTab() {
  return (
    <div>
      <h2 className="section-header">Adventures &amp; Activities</h2>
      <p className="section-sub">{ADVENTURES.length} experiences across South of France</p>

      <div className="grid md:grid-cols-2 gap-5">
        {ADVENTURES.map(adv => (
          <div key={adv.id} className="card overflow-hidden flex flex-col">
            {/* Image */}
            <div
              className="h-40 relative hero-img"
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent 40%, #0D213799), url(${adv.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                <p className="text-white font-serif font-semibold text-lg leading-tight drop-shadow">{adv.title}</p>
                <p className="text-white/80 text-xs">{adv.location}</p>
              </div>
              {adv.date && (
                <div className="absolute top-3 right-3 bg-pgold/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {adv.date}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col gap-3">
              <p className="text-sm text-gray-600 leading-relaxed">{adv.description}</p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-pblue/10 text-pblue rounded-full px-2.5 py-1 font-medium">
                  ⏱ {adv.duration}
                </span>
                <span className={`rounded-full px-2.5 py-1 font-medium ${DIFF_COLOR[adv.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                  {adv.difficulty}
                </span>
                <span className="bg-plovender/10 text-plovender rounded-full px-2.5 py-1 font-medium">
                  ☀️ {adv.bestTime}
                </span>
              </div>

              {adv.note && (
                <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  ⚠️ {adv.note}
                </div>
              )}

              {adv.bookingLink && (
                <a
                  href={adv.bookingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-sm text-pblue hover:text-plovender transition-colors font-medium flex items-center gap-1"
                >
                  🎫 Book tickets →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
