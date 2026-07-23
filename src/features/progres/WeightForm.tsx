import { useState, type FormEvent } from 'react'
import { Field } from '../../components/ui/Field'

export function WeightForm({ onAdd }: { onAdd: (weightKg: number) => void }) {
  const [weight, setWeight] = useState('')
  const isValid = weight.trim() !== '' && Number(weight) > 0

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isValid) return
    onAdd(Number(weight))
    setWeight('')
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <Field label="Nouvelle pesée (kg)" htmlFor="weight-input">
        <input
          id="weight-input"
          type="number"
          inputMode="decimal"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Field>
      <button type="submit" className="btn btn-primary btn-block" disabled={!isValid}>
        Enregistrer la pesée
      </button>
    </form>
  )
}
