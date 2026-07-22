export type TabId = 'accueil' | 'nutrition' | 'sport' | 'progres' | 'profil'

const TABS: { id: TabId; label: string }[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'sport', label: 'Sport' },
  { id: 'progres', label: 'Progrès' },
  { id: 'profil', label: 'Profil' },
]

interface BottomNavProps {
  active: TabId
  onChange: (tab: TabId) => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === active ? 'nav-item active' : 'nav-item'}
          onClick={() => onChange(tab.id)}
          aria-current={tab.id === active ? 'page' : undefined}
        >
          <span className="nav-dot" aria-hidden="true" />
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
