import { useState } from 'react'
import { BottomNav, type TabId } from './components/layout/BottomNav'
import { AccueilScreen } from './features/accueil/AccueilScreen'
import { NutritionScreen } from './features/nutrition/NutritionScreen'
import { OnboardingScreen } from './features/profile/OnboardingScreen'
import { ProfilScreen } from './features/profile/ProfilScreen'
import { ProgresScreen } from './features/progres/ProgresScreen'
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

      {activeTab === 'accueil' && <AccueilScreen profile={profile} />}
      {activeTab === 'nutrition' && <NutritionScreen />}
      {activeTab === 'sport' && <SportScreen profile={profile} />}
      {activeTab === 'progres' && <ProgresScreen profile={profile} />}
      {activeTab === 'profil' && <ProfilScreen profile={profile} onUpdate={updateProfile} />}

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
