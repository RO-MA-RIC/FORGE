import { useState } from 'react'
import { BottomNav, type TabId } from './components/layout/BottomNav'
import { StubScreen } from './components/ui/StubScreen'
import { NutritionScreen } from './features/nutrition/NutritionScreen'
import { OnboardingScreen } from './features/profile/OnboardingScreen'
import { ProgresScreen } from './features/progres/ProgresScreen'
import { ProfilScreen } from './features/profile/ProfilScreen'
import { SportScreen } from './features/sport/SportScreen'
import { useProfile } from './hooks/useProfile'

export default function App() {
  const { state, createProfile, updateProfile } = useProfile()
  const [activeTab, setActiveTab] = useState<TabId>('accueil')

  if (state.status === 'loading') {
    return null
  }

  if (state.status === 'empty') {
    return <OnboardingScreen onComplete={createProfile} />
  }

  const { profile } = state

  return (
    <div className="app-shell">
      <div className="app-header">
        <h1>FORGE</h1>
      </div>

      {activeTab === 'accueil' && (
        <StubScreen
          title="Accueil"
          message="La jauge calorique, la prochaine séance et le résumé du poids arriveront dans une prochaine phase."
        />
      )}
      {activeTab === 'nutrition' && <NutritionScreen />}
      {activeTab === 'sport' && <SportScreen profile={profile} />}
      {activeTab === 'progres' && <ProgresScreen profile={profile} />}
      {activeTab === 'profil' && <ProfilScreen profile={profile} onUpdate={updateProfile} />}

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
