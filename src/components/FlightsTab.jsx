import { FLIGHTS } from '../data'

function FlightLeg({ leg, isLast }) {
  return (
    <div className="flex gap-4">
      {/* Left timeline */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-pblue border-2 border-white shadow mt-1 flex-shrink-0" />
        {!isLast && <div className="w-0.5 flex-1 bg-pblue/20 my-1" />}
      </div>

      {/* Content */}
      <div className="pb-5 flex-1 min-w-0">
        {leg.layover && (
          <div className="mb-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 inline-flex items-center gap-1">
            ⏱ {leg.layover}
          </div>
        )}
        <div className="card p-4">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{leg.flight}</p>
              <div className="flex items-center gap-2 text-pnavy font-semibold">
                <span className="text-lg">{leg.fromCode}</span>
                <span className="text-gray-300">→</span>
                <span className="text-lg">{leg.toCode}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{leg.from} → {leg.to}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{leg.duration}</p>
              <p className="text-xs text-gray-500 mt-0.5">{leg.departs}</p>
              <p className="text-xs text-gray-500">→ {leg.arrives}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlightCard({ data, title, emoji }) {
  return (
    <div className="card overflow-visible mb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pblue to-plovender px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-white/70 text-xs uppercase tracking-wider font-medium">{title}</p>
          <p className="text-white text-xl font-serif font-semibold mt-0.5">{emoji} {data.route}</p>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-xs">{data.date}</p>
          <p className="text-white text-sm font-medium mt-0.5">{data.totalDuration} · {data.stops}</p>
          <p className="text-white/60 text-xs mt-0.5">{data.class}</p>
        </div>
      </div>

      {/* Confirmation numbers */}
      {(data.capitalOneConf || data.lufthansaConf) && (
        <div className="px-6 py-3 bg-psand/50 border-b border-pcream flex gap-6 flex-wrap">
          {data.lufthansaConf && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Lufthansa Conf</p>
              <p className="font-mono font-bold text-pblue tracking-widest text-sm">{data.lufthansaConf}</p>
            </div>
          )}
          {data.capitalOneConf && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Capital One Conf</p>
              <p className="font-mono font-bold text-plovender tracking-widest text-sm">{data.capitalOneConf}</p>
            </div>
          )}
        </div>
      )}

      {/* Legs */}
      <div className="p-6">
        {data.legs.map((leg, i) => (
          <FlightLeg key={i} leg={leg} isLast={i === data.legs.length - 1} />
        ))}
      </div>
    </div>
  )
}

export default function FlightsTab() {
  return (
    <div>
      <h2 className="section-header">Flights</h2>
      <p className="section-sub">Lufthansa · Economy Light · Booking ref: A6GLFR</p>

      <FlightCard data={FLIGHTS.outbound} title="Outbound" emoji="🌍" />
      <FlightCard data={FLIGHTS.return} title="Return" emoji="🏠" />

      <div className="card p-5 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-pblue mb-2 flex items-center gap-2">
          ✅ Check-in Reminders
        </h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Online check-in opens 23h before departure via <span className="font-medium">Lufthansa app</span> or lufthansa.com</li>
          <li>• LH 467 outbound — check in from <span className="font-medium">Jul 13 ~5:15 PM</span></li>
          <li>• LH 466 return — check in opens <span className="font-medium">Aug 1 ~12:40 PM</span> (same day as the note in your pack reminder)</li>
          <li>• Munich Terminal 2 for both Lufthansa flights</li>
        </ul>
      </div>
    </div>
  )
}
