import { useMemo, type CSSProperties } from 'react'
import { useExerciseSubstitutions } from '../../hooks/useExerciseSubstitutions'
import { useFoodLog } from '../../hooks/useFoodLog'
import { useWeightEntries } from '../../hooks/useWeightEntries'
import { computeMetabolics } from '../../lib/calculations'
import { getTodayDateKey } from '../../lib/date'
import { formatSigned } from '../../lib/format'
import { generateProgram } from '../../lib/program'
import { applySubstitutions } from '../../lib/substitutions'
import { computeWeightStats } from '../../lib/weightStats'
import type { Profile } from '../../types'

function round(value: number): number {
  return Math.round(value)
}

export function AccueilScreen({ profile }: { profile: Profile }) {
  const calc = useMemo(() => computeMetabolics(profile), [profile])

  const { entries: foodEntries } = useFoodLog()
  const { entries: weightEntries } = useWeightEntries()

  const baseProgram = useMemo(() => generateProgram(profile), [profile])
  const { substitutions } = useExerciseSubstitutions()
  const program = useMemo(
    () => (substitutions ? applySubstitutions(baseProgram, substitutions) : baseProgram),
    [baseProgram, substitutions],
  )

  if (foodEntries === null || weightEntries === null) return null

  const today = getTodayDateKey()
  const todayFoodEntries = foodEntries.filter((entry) => entry.date === today)
  const consumed = todayFoodEntries.reduce(
    (acc, entry) => ({
      kcal: acc.kcal + entry.kcal,
      proteinG: acc.proteinG + entry.proteinG,
      carbsG: acc.carbsG + entry.carbsG,
      fatG: acc.fatG + entry.fatG,
    }),
    { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  )
  const remainingKcal = calc.calorieTarget - consumed.kcal
  const consumedRatio = calc.calorieTarget > 0 ? Math.min(consumed.kcal / calc.calorieTarget, 1) : 0

  const nextSession = program.days[0]
  const weightStats = computeWeightStats(weightEntries, profile.targetWeightKg)

  return (
    <div className="app-content">
      <div className="gauge-card">
        <div className="gauge-top">
          <div>
            <div className="gauge-label">Calories restantes</div>
            <div className="gauge-kcal mono-num">
              {round(Math.max(remainingKcal, 0))} <span>/ {round(calc.calorieTarget)} kcal</span>
            </div>
          </div>
          <div className="gauge-ring" style={{ '--gauge-angle': `${consumedRatio * 360}deg` } as CSSProperties}>
            <div className="gauge-ring-inner mono-num">{round(consumedRatio * 100)}%</div>
          </div>
        </div>

        <div className="macro-row">
          <div className="macro-item">
            <div className="macro-bar-bg">
              <div
                className="macro-bar-fill"
                style={{
                  width: `${Math.min((consumed.proteinG / calc.macros.proteinG) * 100, 100)}%`,
                  background: 'var(--protein)',
                }}
              />
            </div>
            <div className="macro-label">Prot.</div>
            <div className="macro-value mono-num">
              {round(consumed.proteinG)} / {round(calc.macros.proteinG)}g
            </div>
          </div>
          <div className="macro-item">
            <div className="macro-bar-bg">
              <div
                className="macro-bar-fill"
                style={{
                  width: `${Math.min((consumed.carbsG / calc.macros.carbsG) * 100, 100)}%`,
                  background: 'var(--carbs)',
                }}
              />
            </div>
            <div className="macro-label">Gluc.</div>
            <div className="macro-value mono-num">
              {round(consumed.carbsG)} / {round(calc.macros.carbsG)}g
            </div>
          </div>
          <div className="macro-item">
            <div className="macro-bar-bg">
              <div
                className="macro-bar-fill"
                style={{
                  width: `${Math.min((consumed.fatG / calc.macros.fatG) * 100, 100)}%`,
                  background: 'var(--fat)',
                }}
              />
            </div>
            <div className="macro-label">Lip.</div>
            <div className="macro-value mono-num">
              {round(consumed.fatG)} / {round(calc.macros.fatG)}g
            </div>
          </div>
        </div>
      </div>

      <div className="stat-tile">
        <div className="stat-tile-label">Prochaine séance</div>
        <div className="stat-tile-value">{nextSession.label}</div>
      </div>

      <div className="stat-tile">
        <div className="stat-tile-label">Poids</div>
        {weightStats === null ? (
          <div className="stat-tile-value" style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 400 }}>
            Aucune pesée enregistrée
          </div>
        ) : (
          <div className="stat-tile-row">
            <div className="stat-tile-value mono-num">{weightStats.currentWeightKg} kg</div>
            <div className="stat-tile-sub">
              {formatSigned(-weightStats.gapToTargetKg, 1)} kg → objectif {profile.targetWeightKg} kg
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
