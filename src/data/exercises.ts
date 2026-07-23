import type { Exercise } from '../types'

export const EXERCISES: Exercise[] = [
  // Pectoraux
  { id: 'developpe-couche-barre', name: 'Développé couché barre', muscleGroup: 'pectoraux', defaultRepRangeMin: 6, defaultRepRangeMax: 10 },
  { id: 'developpe-incline-halteres', name: 'Développé incliné haltères', muscleGroup: 'pectoraux', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'ecarte-couche-halteres', name: 'Écarté couché haltères', muscleGroup: 'pectoraux', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },
  { id: 'dips', name: 'Dips', muscleGroup: 'pectoraux', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },

  // Dos
  { id: 'tirage-horizontal-poulie-basse', name: 'Tirage horizontal poulie basse', muscleGroup: 'dos', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'tractions', name: 'Tractions', muscleGroup: 'dos', defaultRepRangeMin: 6, defaultRepRangeMax: 10 },
  { id: 'rowing-barre-buste-penche', name: 'Rowing barre buste penché', muscleGroup: 'dos', defaultRepRangeMin: 6, defaultRepRangeMax: 10 },
  { id: 'tirage-vertical-poulie-haute', name: 'Tirage vertical poulie haute', muscleGroup: 'dos', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'rowing-haltere-unilateral', name: 'Rowing haltère unilatéral', muscleGroup: 'dos', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },

  // Épaules
  { id: 'developpe-militaire-barre', name: 'Développé militaire barre', muscleGroup: 'epaules', defaultRepRangeMin: 6, defaultRepRangeMax: 10 },
  { id: 'developpe-halteres-assis', name: 'Développé haltères assis', muscleGroup: 'epaules', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'elevations-laterales-halteres', name: 'Élévations latérales haltères', muscleGroup: 'epaules', defaultRepRangeMin: 12, defaultRepRangeMax: 15 },
  { id: 'oiseau', name: 'Oiseau (élévations arrière)', muscleGroup: 'epaules', defaultRepRangeMin: 12, defaultRepRangeMax: 15 },

  // Biceps
  { id: 'curl-barre', name: 'Curl barre', muscleGroup: 'biceps', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'curl-halteres-alterne', name: 'Curl haltères alterné', muscleGroup: 'biceps', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },
  { id: 'curl-marteau', name: 'Curl marteau', muscleGroup: 'biceps', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },

  // Triceps
  { id: 'extension-triceps-poulie-haute', name: 'Extension triceps poulie haute', muscleGroup: 'triceps', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },
  { id: 'developpe-couche-prise-serree', name: 'Développé couché prise serrée', muscleGroup: 'triceps', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'extension-triceps-nuque-haltere', name: 'Extension triceps nuque haltère', muscleGroup: 'triceps', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },

  // Jambes
  { id: 'squat-barre', name: 'Squat barre', muscleGroup: 'jambes', defaultRepRangeMin: 6, defaultRepRangeMax: 10 },
  { id: 'presse-a-cuisses', name: 'Presse à cuisses', muscleGroup: 'jambes', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'fentes-halteres', name: 'Fentes haltères', muscleGroup: 'jambes', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'leg-curl-allonge', name: 'Leg curl allongé', muscleGroup: 'jambes', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },
  { id: 'extension-quadriceps', name: 'Extension quadriceps', muscleGroup: 'jambes', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },
  { id: 'souleve-de-terre-roumain', name: 'Soulevé de terre roumain', muscleGroup: 'jambes', defaultRepRangeMin: 8, defaultRepRangeMax: 12 },
  { id: 'souleve-de-terre', name: 'Soulevé de terre', muscleGroup: 'jambes', defaultRepRangeMin: 5, defaultRepRangeMax: 8 },
  { id: 'mollets-debout', name: 'Mollets debout', muscleGroup: 'jambes', defaultRepRangeMin: 12, defaultRepRangeMax: 20 },

  // Abdominaux
  { id: 'crunch-leste', name: 'Crunch lesté', muscleGroup: 'abdominaux', defaultRepRangeMin: 12, defaultRepRangeMax: 20 },
  { id: 'releve-de-jambes-suspendu', name: 'Relevé de jambes suspendu', muscleGroup: 'abdominaux', defaultRepRangeMin: 10, defaultRepRangeMax: 15 },
]
