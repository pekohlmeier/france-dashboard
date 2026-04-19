import { RESTAURANTS } from '../data'

const PRICE_COLOR = {
  '€':    'text-emerald-600',
  '€€':   'text-amber-600',
  '€€€':  'text-pterracotta',
  '€€€€': 'text-red-600',
}

export default function FoodTab() {
  const byRegion = RESTAURANTS.reduce((acc, r) => {
    if (!acc[r.city]) acc[r.city] = []
    acc[r.city].push(r)
    return acc
  }, {})

  return (
    <div>
      <h2 className="section-header">Food &amp; Drink</h2>
      <p className="section-sub">{RESTAURANTS.length} saved spots · Click to add more</p>

      <div className="space-y-8">
        {Object.entries(byRegion).map(([city, restaurants]) => (
          <div key={city}>
            <h3 className="text-lg font-serif font-semibold text-pnavy mb-3 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-pterracotta rounded-full" />
              {city}
            </h3>
            <div className="space-y-3">
              {restaurants.map(r => (
                <div key={r.id} className="card p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h4 className="font-semibold text-pnavy">{r.name}</h4>
                        {r.status === 'saved' && (
                          <span className="text-xs text-emerald-600 font-medium">★ saved</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{r.cuisine}</p>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.description}</p>
                    </div>
                    <span className={`text-lg font-semibold flex-shrink-0 ${PRICE_COLOR[r.price] || 'text-gray-500'}`}>
                      {r.price}
                    </span>
                  </div>
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 text-sm text-pblue hover:text-plovender transition-colors font-medium flex items-center gap-1"
                    >
                      🔗 View →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Food tips */}
      <div className="mt-8 card p-5 bg-pterracotta/5 border-pterracotta/20">
        <h3 className="font-semibold text-pterracotta mb-3">🍷 Provence Food Tips</h3>
        <ul className="space-y-1.5 text-sm text-gray-600">
          <li>• <strong>Bouillabaisse</strong> — the Marseille fish stew. Chez Fonfon is the classic. Book ahead.</li>
          <li>• <strong>Rosé wine</strong> — Provence is the home of dry rosé. Order local (Bandol AOC or Côtes de Provence).</li>
          <li>• <strong>Cassis AOC white wine</strong> — pairs perfectly with the calanques and the local seafood.</li>
          <li>• <strong>Calissons</strong> — Aix-en-Provence's almond-marzipan candy. Buy some to bring home.</li>
          <li>• <strong>Tapenade &amp; olive oil</strong> — pick some up at the Aix Sunday market.</li>
          <li>• <strong>Markets</strong> — best ones: Sunday Cours Mirabeau (Aix), Cours Lafayette (Toulon), Sanary harbor.</li>
        </ul>
      </div>
    </div>
  )
}
