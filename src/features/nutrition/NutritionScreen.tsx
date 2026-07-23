import { FOODS } from '../../data/foods'
import { useFoodLog } from '../../hooks/useFoodLog'
import { getTodayDateKey } from '../../lib/date'
import type { FoodItem } from '../../types'
import { CustomFoodForm } from './CustomFoodForm'

export function NutritionScreen() {
  const { entries, addEntry, removeEntry } = useFoodLog()

  if (entries === null) return null

  const today = getTodayDateKey()
  const todayEntries = entries.filter((entry) => entry.date === today)
  const totalKcal = todayEntries.reduce((sum, entry) => sum + entry.kcal, 0)

  function addFood(food: { name: string; kcal: number; proteinG: number; carbsG: number; fatG: number }) {
    addEntry({
      id: crypto.randomUUID(),
      date: today,
      foodName: food.name,
      kcal: food.kcal,
      proteinG: food.proteinG,
      carbsG: food.carbsG,
      fatG: food.fatG,
    })
  }

  function handleQuickAdd(food: FoodItem) {
    addFood(food)
  }

  return (
    <div className="app-content">
      <span className="section-label">Journal du jour</span>
      <div className="card">
        {todayEntries.length === 0 ? (
          <div className="food-log-empty">
            Aucun aliment ajouté aujourd'hui. Utilise la liste ci-dessous pour commencer.
          </div>
        ) : (
          <>
            {todayEntries.map((entry) => (
              <div className="food-log-item" key={entry.id}>
                <div>
                  <div className="exercise-name">{entry.foodName}</div>
                  <div className="exercise-muscle">
                    P {Math.round(entry.proteinG)}g · G {Math.round(entry.carbsG)}g · L {Math.round(entry.fatG)}g
                  </div>
                </div>
                <div className="food-log-item-right">
                  <span className="mono-num">{Math.round(entry.kcal)} kcal</span>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeEntry(entry.id)}
                    aria-label={`Retirer ${entry.foodName} du journal`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="food-log-total">
              <span>Total</span>
              <span className="mono-num">{Math.round(totalKcal)} kcal</span>
            </div>
          </>
        )}
      </div>

      <span className="section-label">Aliments courants</span>
      <div className="card food-quick-list">
        {FOODS.map((food) => (
          <button type="button" key={food.id} className="food-quick-item" onClick={() => handleQuickAdd(food)}>
            <span>{food.name}</span>
            <span className="mono-num">{food.kcal} kcal</span>
          </button>
        ))}
      </div>

      <span className="section-label">Ajout personnalisé</span>
      <CustomFoodForm onAdd={addFood} />
    </div>
  )
}
