# Design System — FORGE

## Product Context
- **Quoi** : Application personnelle de suivi combinant calcul calorique et programme d'entraînement adaptatif.
- **Pour qui** : Pratiquant de musculation intermédiaire à confirmé, cherchant un outil de suivi/calcul fiable au quotidien plutôt qu'un accompagnement pédagogique.
- **Espace** : Apps de suivi nutrition (YAZIO) et de musculation (Hevy, Strong, Gravl).
- **Type** : Web app perso, mobile-first.
- **Memorable thing** : La confiance d'un instrument de précision — pas une appli qui materne.

## Aesthetic Direction
- **Direction** : Industrial/Utilitarian — un outil de précision, pas une app qui divertit.
- **Décoration** : Minimal — la typo et les données font le travail, zéro mascotte/illustration décorative/badge.
- **Mood** : Sobre, dense en données, rigoureux. Le nom "FORGE" appelle le métal et la rigueur plutôt que le fun.
- **Références** : YAZIO (sobriété), Hevy/Strong (logging rapide, remplacement d'exercice à la volée).

## Typography
- **Display/Hero** : Cabinet Grotesk (700/800) — géométrique, anguleux, lecture "forgée", évite le générique.
- **Body** : Geist (400/500/600) — neutre, très lisible sur mobile, excellent support tabular-nums.
- **Data/Tables** : Geist Mono, tabular-nums — poids/reps/calories alignés en colonnes, renforce le côté instrument.
- **Code** : Geist Mono (non utilisé en usage courant, gardé pour cohérence).
- **Loading** :
  - `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap`
  - `https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap`
- **Scale** : 11 / 12 / 13 / 14 / 15 / 16 / 17 / 20 / 24 / 32 / 36 / 48 / 56 / 96 px

## Color
- **Approche** : Restrained — un seul accent, réservé aux actions clés et à la progression.
- **Primary** : `#E8531E` (ember) — CTA primaires, jauges/anneaux de progression, éléments à mettre en avant.
- **Secondary** : `#B8431A` (ember dim) — états hover/pressed de l'accent.
- **Neutrals** : `#0B0B0D` (background) → `#17171A` (surface) → `#1F1F23` (surface 2) → `#2A2A2E` (border) → `#9A9A9E` (text muted) → `#F5F4F1` (text primary)
- **Semantic** : succès `#3FB950`, warning `#E8A33D`, erreur `#E5484D`, info `#4C9FE8`
- **Macros** : protéines `#4C9FE8`, glucides `#E8A33D`, lipides `#B98CE8`
- **Dark mode** : Dark par défaut et unique thème en v1 (usage fréquent en salle/faible lumière) ; pas de bascule light mode prévue pour l'instant.

## Spacing
- **Base** : 8px
- **Densité** : Compacte sur les écrans de saisie (journal, séance) pour limiter le scroll ; plus aérée sur l'accueil et le profil.
- **Scale** : 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approche** : Grid-disciplined — prévisibilité pour un usage quotidien en coup d'œil.
- **Grid** : Colonne unique sur mobile (< 640px) ; grille de cartes 2 colonnes au-delà pour profil/progrès sur écran large.
- **Max content width** : 1100px (contexte desktop occasionnel) ; 375px de référence pour les vues mobiles principales.
- **Border radius** : sm:6px, md:12px, lg:20px, full:9999px

## Motion
- **Approche** : Minimal-fonctionnel — uniquement les transitions qui aident la compréhension (jauge calorique qui se remplit, coche de série validée, point ajouté sur la courbe de poids). Rien de chorégraphié qui ralentirait l'usage en pleine séance.
- **Easing** : enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration** : micro(50-100ms) court(150-250ms) moyen(250-400ms) long(400-700ms)

## Decisions Log
| Date | Décision | Rationale |
|------|----------|-----------|
| 2026-07-22 | Création initiale | /design — FORGE, web app perso mobile-first de suivi nutrition + musculation. Direction Industrial/Utilitarian validée en première version : dark mode par défaut, accent unique "ember" lié au nom, typographie Cabinet Grotesk / Geist / Geist Mono, zéro gamification/social pour servir un utilisateur confirmé qui veut un instrument de confiance plutôt qu'une app ludique. |
