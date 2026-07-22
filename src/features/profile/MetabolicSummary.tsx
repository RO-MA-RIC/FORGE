import { computeMetabolics } from '../../lib/calculations'
import type { Profile } from '../../types'

function round(value: number): number {
  return Math.round(value)
}

export function MetabolicSummary({ profile }: { profile: Profile }) {
  const calc = computeMetabolics(profile)

  return (
    <>
      <div className="card">
        <div className="card-title">Métabolisme de base (BMR)</div>
        <div className="card-value mono-num">
          {round(calc.bmr)} <span className="card-value-unit">kcal</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Dépense totale (TDEE)</div>
        <div className="card-value mono-num">
          {round(calc.tdee)} <span className="card-value-unit">kcal</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Objectif calorique</div>
        <div className="card-value mono-num">
          {round(calc.calorieTarget)} <span className="card-value-unit">kcal</span>
        </div>

        {calc.flooredBySafetyLimit && (
          <div className="alert alert-warning" style={{ marginTop: 12 }}>
            Ton calcul brut ({round(calc.calorieTargetBeforeFloor)} kcal) descendait sous le plancher de sécurité.
            L'objectif est plafonné à {round(calc.calorieTarget)} kcal.
          </div>
        )}

        <div className="macro-grid">
          <div className="macro-item">
            <div className="macro-label">
              <span className="macro-dot" style={{ background: 'var(--protein)' }} />
              Protéines
            </div>
            <div className="macro-value mono-num">{round(calc.macros.proteinG)} g</div>
          </div>
          <div className="macro-item">
            <div className="macro-label">
              <span className="macro-dot" style={{ background: 'var(--carbs)' }} />
              Glucides
            </div>
            <div className="macro-value mono-num">{round(calc.macros.carbsG)} g</div>
          </div>
          <div className="macro-item">
            <div className="macro-label">
              <span className="macro-dot" style={{ background: 'var(--fat)' }} />
              Lipides
            </div>
            <div className="macro-value mono-num">{round(calc.macros.fatG)} g</div>
          </div>
        </div>
      </div>
    </>
  )
}
