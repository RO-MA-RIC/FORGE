import type { ProgramTemplate, TrainingDaysPerWeek } from '../types'

export const PROGRAM_TEMPLATES: Record<TrainingDaysPerWeek, ProgramTemplate> = {
  3: {
    trainingDaysPerWeek: 3,
    days: [
      {
        id: 'full-body-a',
        label: 'Full Body A',
        exercises: [
          { exerciseId: 'squat-barre', sets: 4 },
          { exerciseId: 'developpe-couche-barre', sets: 4 },
          { exerciseId: 'rowing-barre-buste-penche', sets: 4 },
          { exerciseId: 'elevations-laterales-halteres', sets: 3 },
          { exerciseId: 'crunch-leste', sets: 3 },
        ],
      },
      {
        id: 'full-body-b',
        label: 'Full Body B',
        exercises: [
          { exerciseId: 'presse-a-cuisses', sets: 3 },
          { exerciseId: 'developpe-incline-halteres', sets: 3 },
          { exerciseId: 'tirage-horizontal-poulie-basse', sets: 3 },
          { exerciseId: 'developpe-militaire-barre', sets: 4 },
          { exerciseId: 'curl-barre', sets: 3 },
        ],
      },
      {
        id: 'full-body-c',
        label: 'Full Body C',
        exercises: [
          { exerciseId: 'souleve-de-terre-roumain', sets: 3 },
          { exerciseId: 'dips', sets: 3 },
          { exerciseId: 'tractions', sets: 3 },
          { exerciseId: 'extension-triceps-poulie-haute', sets: 3 },
          { exerciseId: 'releve-de-jambes-suspendu', sets: 3 },
        ],
      },
    ],
  },
  4: {
    trainingDaysPerWeek: 4,
    days: [
      {
        id: 'haut-a',
        label: 'Haut A',
        exercises: [
          { exerciseId: 'developpe-couche-barre', sets: 4 },
          { exerciseId: 'rowing-barre-buste-penche', sets: 4 },
          { exerciseId: 'developpe-militaire-barre', sets: 3 },
          { exerciseId: 'curl-halteres-alterne', sets: 3 },
          { exerciseId: 'extension-triceps-poulie-haute', sets: 3 },
        ],
      },
      {
        id: 'bas-a',
        label: 'Bas A',
        exercises: [
          { exerciseId: 'squat-barre', sets: 4 },
          { exerciseId: 'leg-curl-allonge', sets: 3 },
          { exerciseId: 'mollets-debout', sets: 3 },
          { exerciseId: 'crunch-leste', sets: 3 },
        ],
      },
      {
        id: 'haut-b',
        label: 'Haut B',
        exercises: [
          { exerciseId: 'developpe-incline-halteres', sets: 3 },
          { exerciseId: 'tirage-vertical-poulie-haute', sets: 4 },
          { exerciseId: 'elevations-laterales-halteres', sets: 3 },
          { exerciseId: 'curl-marteau', sets: 3 },
          { exerciseId: 'developpe-couche-prise-serree', sets: 3 },
        ],
      },
      {
        id: 'bas-b',
        label: 'Bas B',
        exercises: [
          { exerciseId: 'souleve-de-terre-roumain', sets: 3 },
          { exerciseId: 'presse-a-cuisses', sets: 3 },
          { exerciseId: 'fentes-halteres', sets: 3 },
          { exerciseId: 'releve-de-jambes-suspendu', sets: 3 },
        ],
      },
    ],
  },
  5: {
    trainingDaysPerWeek: 5,
    days: [
      {
        id: 'push',
        label: 'Push',
        exercises: [
          { exerciseId: 'developpe-couche-barre', sets: 4 },
          { exerciseId: 'developpe-militaire-barre', sets: 3 },
          { exerciseId: 'ecarte-couche-halteres', sets: 3 },
          { exerciseId: 'extension-triceps-poulie-haute', sets: 3 },
          { exerciseId: 'extension-triceps-nuque-haltere', sets: 3 },
        ],
      },
      {
        id: 'pull',
        label: 'Pull',
        exercises: [
          { exerciseId: 'rowing-barre-buste-penche', sets: 4 },
          { exerciseId: 'tractions', sets: 3 },
          { exerciseId: 'tirage-horizontal-poulie-basse', sets: 3 },
          { exerciseId: 'oiseau', sets: 3 },
          { exerciseId: 'curl-barre', sets: 3 },
        ],
      },
      {
        id: 'legs',
        label: 'Legs',
        exercises: [
          { exerciseId: 'squat-barre', sets: 4 },
          { exerciseId: 'souleve-de-terre', sets: 3 },
          { exerciseId: 'leg-curl-allonge', sets: 3 },
          { exerciseId: 'extension-quadriceps', sets: 3 },
          { exerciseId: 'mollets-debout', sets: 3 },
        ],
      },
      {
        id: 'push-2',
        label: 'Push 2',
        exercises: [
          { exerciseId: 'developpe-incline-halteres', sets: 4 },
          { exerciseId: 'developpe-halteres-assis', sets: 3 },
          { exerciseId: 'dips', sets: 3 },
          { exerciseId: 'developpe-couche-prise-serree', sets: 3 },
          { exerciseId: 'elevations-laterales-halteres', sets: 3 },
        ],
      },
      {
        id: 'pull-2',
        label: 'Pull 2',
        exercises: [
          { exerciseId: 'tirage-vertical-poulie-haute', sets: 4 },
          { exerciseId: 'rowing-haltere-unilateral', sets: 3 },
          { exerciseId: 'curl-halteres-alterne', sets: 3 },
          { exerciseId: 'curl-marteau', sets: 3 },
          { exerciseId: 'releve-de-jambes-suspendu', sets: 3 },
        ],
      },
    ],
  },
}
