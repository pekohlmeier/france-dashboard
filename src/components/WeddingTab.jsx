import { WEDDING, IMAGES } from '../data'

function TimelineItem({ time, event, highlight }) {
  return (
    <div className={`flex gap-4 items-start py-2 ${highlight ? 'font-semibold' : ''}`}>
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className={`w-3 h-3 rounded-full border-2 ${highlight ? 'bg-pgold border-pgold' : 'bg-white border-plovender'} shadow-sm`} />
        {!highlight && <div className="w-0.5 h-4 bg-plovender/20 mt-1" />}
      </div>
      <div className="flex-1">
        <span className={`text-xs font-medium tabular-nums ${highlight ? 'text-pgold' : 'text-gray-400'}`}>{time}</span>
        <p className={`text-sm mt-0.5 ${highlight ? 'text-pnavy' : 'text-gray-700'}`}>{event}</p>
      </div>
    </div>
  )
}

export default function WeddingTab() {
  return (
    <div>
      <h2 className="section-header">The Wedding 💍</h2>
      <p className="section-sub">Paula &amp; Sébastien · July 19, 2026 · Toulon</p>

      {/* Hero card */}
      <div
        className="rounded-2xl overflow-hidden mb-6 relative h-48 hero-img"
        style={{
          backgroundImage: `linear-gradient(to bottom, #0D213750, #0D2137cc), url(${IMAGES.wedding})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-1">You're invited to celebrate</p>
          <h3 className="text-3xl font-serif font-bold mb-1">Paula &amp; Sébastien</h3>
          <p className="text-white/80">{WEDDING.date}</p>
          <a
            href={WEDDING.website}
            target="_blank"
            rel="noreferrer"
            className="mt-3 text-xs bg-white/20 border border-white/30 rounded-full px-4 py-1.5 hover:bg-white/30 transition-colors"
          >
            🌐 Wedding Website →
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Schedule */}
        <div className="card p-5">
          <h3 className="font-serif font-semibold text-pnavy mb-4 text-lg">Schedule</h3>
          <div>
            {WEDDING.schedule.map((item, i) => (
              <TimelineItem
                key={i}
                time={item.time}
                event={item.event}
                highlight={item.event.includes('Ceremony') || item.event.includes('Party ends')}
              />
            ))}
          </div>
        </div>

        {/* Venue + Dress Code */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-serif font-semibold text-pnavy mb-3 text-lg">Venue</h3>
            <p className="font-medium text-gray-800">{WEDDING.venue}</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{WEDDING.address}</p>
            <a
              href={`https://maps.google.com?q=${encodeURIComponent(WEDDING.address)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-sm text-pblue hover:text-plovender transition-colors font-medium flex items-center gap-1"
            >
              📍 Open in Maps →
            </a>
          </div>

          <div className="card p-5 bg-pgold/10 border-pgold/30">
            <h3 className="font-serif font-semibold text-pnavy mb-2 text-lg">Dress Code</h3>
            <p className="text-sm font-semibold text-pgold mb-1">Riviera Chic</p>
            <p className="text-sm text-gray-600 leading-relaxed">{WEDDING.dresscode}</p>
          </div>
        </div>
      </div>

      {/* Brunch */}
      <div className="card p-5 mb-5">
        <h3 className="font-serif font-semibold text-pnavy mb-3 text-lg">Post-Wedding Brunch 🥐</h3>
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Date</p>
            <p className="font-medium text-gray-800">{WEDDING.brunch.date}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Time</p>
            <p className="font-medium text-gray-800">{WEDDING.brunch.time}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Address</p>
            <p className="font-medium text-gray-800">{WEDDING.brunch.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Attire</p>
            <p className="font-medium text-gray-800">{WEDDING.brunch.attire}</p>
          </div>
        </div>
      </div>

      {/* Hotel options */}
      <div className="card p-5 mb-5">
        <h3 className="font-serif font-semibold text-pnavy mb-3 text-lg">Nearby Hotels</h3>
        <div className="space-y-2">
          {WEDDING.hotels.map((h, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-pcream last:border-0 gap-3">
              <span className="font-medium text-gray-800">{h.name}</span>
              <div className="flex items-center gap-3 flex-shrink-0">
                {h.note && <span className="text-xs text-plovender font-medium">{h.note}</span>}
                <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">~{h.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post-wedding plans */}
      <div className="card p-5">
        <h3 className="font-serif font-semibold text-pnavy mb-3 text-lg">Post-Wedding Plans</h3>
        <div className="space-y-2">
          {WEDDING.postWedding.map((p, i) => (
            <div key={i} className="flex gap-3 text-sm py-2 border-b border-pcream last:border-0">
              <span className="text-xs font-medium text-plovender bg-plovender/10 rounded-full px-2.5 py-1 flex-shrink-0 h-fit">{p.day}</span>
              <p className="text-gray-700 leading-relaxed">{p.plan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Big reminder */}
      <div className="mt-5 card p-5 bg-red-50 border-red-200">
        <p className="font-semibold text-red-700 flex items-center gap-2">
          🚕 Critical Reminder: Pre-book your 3:30 AM taxi home tonight (Jul 18) from Résidence du Cap Brun!
        </p>
        <p className="text-sm text-red-600 mt-1">Party ends at 3:30 AM. You already noted to pre-book the taxi the night before (Saturday Jul 18).</p>
      </div>
    </div>
  )
}
