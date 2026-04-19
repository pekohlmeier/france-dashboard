import { IMAGES } from '../data'

function daysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((target - now) / 86_400_000)
}

export default function Hero() {
  const days = daysUntil('2026-07-14')

  return (
    <div
      className="relative h-64 md:h-80 hero-img flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, #0D213799 0%, #7D6B9E88 100%), url(${IMAGES.lavender})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }}
    >
      <div className="relative z-10 text-white text-center px-4">
        <p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-2 font-medium">
          July 14 – August 2, 2026
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-2 drop-shadow-lg tracking-tight">
          France 2026
        </h1>
        <p className="text-base md:text-lg text-white/80 font-light mb-5 tracking-wide">
          South of France · Munich · Paula &amp; Sébastien's Wedding
        </p>

        {days > 0 ? (
          <div className="inline-flex items-baseline gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-6 py-2.5">
            <span className="text-3xl font-bold tabular-nums">{days}</span>
            <span className="text-sm text-white/80">days to go</span>
          </div>
        ) : days === 0 ? (
          <div className="inline-flex items-center gap-2 bg-pgold/90 rounded-full px-6 py-2.5">
            <span className="text-sm font-semibold">Today's the day! 🎉</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-6 py-2.5">
            <span className="text-sm text-white/90">Trip complete ✓  Bon voyage!</span>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-pcream to-transparent" />
    </div>
  )
}
