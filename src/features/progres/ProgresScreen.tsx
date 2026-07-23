import { useWeightEntries } from '../../hooks/useWeightEntries'
import { getTodayDateKey } from '../../lib/date'
import { computeWeightStats } from '../../lib/weightStats'
import type { Profile } from '../../types'
import { WeightChart } from './WeightChart'
import { WeightForm } from './WeightForm'

function formatSigned(value: number, decimals: number): string {
  const rounded = value.toFixed(decimals)
  return value > 0 ? `+${rounded}` : rounded
}

export function ProgresScreen({ profile }: { profile: Profile }) {
  const { entries, addEntry } = useWeightEntries()

  if (entries === null) return null

  const stats = computeWeightStats(entries, profile.targetWeightKg)

  function handleAdd(weightKg: number) {
    addEntry({ id: crypto.randomUUID(), date: getTodayDateKey(), weightKg })
  }

  return (
    <div className="app-content">
      <span className="section-label">Courbe de poids</span>

      {stats === null ? (
        <div className="card">
          <div className="food-log-empty">
            Aucune pesée enregistrée pour l'instant. Ajoute ta première pesée ci-dessous pour démarrer ta courbe.
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <WeightChart entries={entries} targetWeightKg={profile.targetWeightKg} />
            <div className="weight-chart-legend">
              <span>
                <span className="legend-dot" /> Poids
              </span>
              <span>
                <span className="legend-dash" /> Objectif ({profile.targetWeightKg} kg)
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Bilan</div>
            <div className="macro-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="macro-item">
                <div className="macro-label">Poids actuel</div>
                <div className="macro-value mono-num">{stats.currentWeightKg} kg</div>
              </div>
              <div className="macro-item">
                <div className="macro-label">Écart à l'objectif</div>
                <div className="macro-value mono-num">{formatSigned(stats.gapToTargetKg, 1)} kg</div>
              </div>
            </div>

            {stats.observedRateKgPerWeek !== null && (
              <div className="macro-item" style={{ marginTop: 16 }}>
                <div className="macro-label">Rythme observé</div>
                <div className="macro-value mono-num">
                  {formatSigned(stats.observedRateKgPerWeek, 2)} kg/semaine
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <span className="section-label">Nouvelle pesée</span>
      <WeightForm onAdd={handleAdd} />
    </div>
  )
}
