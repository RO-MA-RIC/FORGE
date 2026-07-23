export function formatSigned(value: number, decimals: number): string {
  const rounded = value.toFixed(decimals)
  return value > 0 ? `+${rounded}` : rounded
}
