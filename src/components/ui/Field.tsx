import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className={error ? 'field error' : 'field'}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <div className="field-error-msg">{error}</div>}
    </div>
  )
}
