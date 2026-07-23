import { useState, type FormEvent } from 'react'
import { Field } from '../../components/ui/Field'

interface CustomFoodInput {
  name: string
  kcal: number
  proteinG: number
  carbsG: number
  fatG: number
}

export function CustomFoodForm({ onAdd }: { onAdd: (food: CustomFoodInput) => void }) {
  const [name, setName] = useState('')
  const [kcal, setKcal] = useState('')
  const [proteinG, setProteinG] = useState('')
  const [carbsG, setCarbsG] = useState('')
  const [fatG, setFatG] = useState('')

  const isValid =
    name.trim() !== '' &&
    kcal.trim() !== '' &&
    Number(kcal) > 0 &&
    [proteinG, carbsG, fatG].every((value) => value.trim() !== '' && Number(value) >= 0)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isValid) return

    onAdd({
      name: name.trim(),
      kcal: Number(kcal),
      proteinG: Number(proteinG),
      carbsG: Number(carbsG),
      fatG: Number(fatG),
    })

    setName('')
    setKcal('')
    setProteinG('')
    setCarbsG('')
    setFatG('')
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <Field label="Nom de l'aliment" htmlFor="custom-food-name">
        <input id="custom-food-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>

      <div className="field-row">
        <Field label="Calories (kcal)" htmlFor="custom-food-kcal">
          <input
            id="custom-food-kcal"
            type="number"
            inputMode="numeric"
            value={kcal}
            onChange={(e) => setKcal(e.target.value)}
          />
        </Field>
        <Field label="Protéines (g)" htmlFor="custom-food-protein">
          <input
            id="custom-food-protein"
            type="number"
            inputMode="decimal"
            step="0.1"
            value={proteinG}
            onChange={(e) => setProteinG(e.target.value)}
          />
        </Field>
      </div>

      <div className="field-row">
        <Field label="Glucides (g)" htmlFor="custom-food-carbs">
          <input
            id="custom-food-carbs"
            type="number"
            inputMode="decimal"
            step="0.1"
            value={carbsG}
            onChange={(e) => setCarbsG(e.target.value)}
          />
        </Field>
        <Field label="Lipides (g)" htmlFor="custom-food-fat">
          <input
            id="custom-food-fat"
            type="number"
            inputMode="decimal"
            step="0.1"
            value={fatG}
            onChange={(e) => setFatG(e.target.value)}
          />
        </Field>
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={!isValid}>
        Ajouter au journal
      </button>
    </form>
  )
}
