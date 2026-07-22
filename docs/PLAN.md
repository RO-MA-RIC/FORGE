# Plan : FORGE — Coach nutrition & sport personnel

> PRD source : docs/PRD.md

## Décisions architecturales

Décisions durables qui s'appliquent à toutes les phases :

- **Stockage** : IndexedDB en local sur l'appareil, base unique, pas de synchronisation cloud ni multi-appareils. Aucune authentification, un seul profil par installation.
- **Modèles clés** :
  - `Profile` (singleton) : sexe, âge, taille, poids actuel, poids visé, niveau d'activité, objectif, rythme (si perte de poids), jours d'entraînement/semaine.
  - `Exercise` : nom, groupe musculaire principal, plage de répétitions cible par défaut.
  - `ProgramTemplate` : split déterminé par le nombre de jours choisi (3 → Full Body A/B/C, 4 → Haut/Bas x2, 5 → PPL x2), chaque jour listant ses exercices (avec finisher cardio si objectif = perte de poids).
  - `WorkoutSession` : date, jour de split effectué, liste des exercices réalisés avec leurs séries (poids, répétitions).
  - `FoodItem` : nom, valeurs nutritionnelles, indicateur catalogue courant vs personnalisé.
  - `FoodLogEntry` : date, référence `FoodItem`, quantité.
  - `WeightEntry` : date, poids.
- **Moteur de calcul** : fonctions pures dérivant BMR (Mifflin-St Jeor), TDEE, objectif calorique et macros à partir de `Profile`, recalculées à la volée — aucun résultat dérivé n'est stocké redondamment.
- **Moteur de progression** : lit l'historique des `WorkoutSession` pour un exercice donné et propose, à la séance suivante, soit une augmentation de la plage de répétitions cible, soit +2,5 kg avec retour au bas de la plage, selon la règle de double progression.
- **Navigation** : 5 onglets (Accueil, Nutrition, Sport, Progrès, Profil), état applicatif local côté client, pas de routes serveur.
- **Plateforme** : web app mobile-first, aucune app native.

---

## Phase 1 : Socle applicatif + profil + calcul métabolique

**User stories** : 1, 2, 3, 4, 5, 6, 7, 24, 25, 26, 27

### Ce qu'on livre

La coquille de l'application avec ses 5 onglets de navigation. Au premier lancement, l'utilisateur est guidé vers un écran de saisie de profil (sexe, âge, taille, poids actuel, poids visé, niveau d'activité, objectif, rythme si perte de poids, jours d'entraînement). Une fois le profil validé, l'onglet Profil affiche le détail du calcul métabolique : BMR, TDEE, objectif calorique (avec application du plancher de sécurité si nécessaire) et répartition des macros. L'utilisateur peut modifier n'importe quel paramètre de son profil depuis cet onglet, ce qui recalcule immédiatement les chiffres affichés. Toute saisie est sauvegardée automatiquement sans action manuelle.

### Critères d'acceptation

- [ ] Au premier lancement (aucun profil enregistré), l'utilisateur est dirigé vers le formulaire de saisie de profil avant de pouvoir accéder au reste de l'app.
- [ ] Une fois le profil complet saisi, l'onglet Profil affiche BMR, TDEE, objectif calorique et macros (protéines/lipides/glucides) cohérents avec les règles du PRD.
- [ ] Un profil dont les paramètres mèneraient à un objectif calorique trop bas affiche l'objectif plafonné au plancher de sécurité (1500 kcal homme / 1200 kcal femme).
- [ ] Modifier un champ du profil (ex. poids, objectif) met à jour les chiffres affichés sans rechargement manuel.
- [ ] Fermer et rouvrir l'app conserve le profil et les chiffres calculés.
- [ ] La navigation par onglets (Accueil, Nutrition, Sport, Progrès, Profil) est fonctionnelle, même si les autres onglets sont encore vides à ce stade.

## Bloquée par

Aucune — démarrable immédiatement

---

## Phase 2 : Génération et consultation du programme sportif

**User stories** : 8, 9, 14

### Ce qu'on livre

À partir du nombre de jours d'entraînement renseigné dans le profil, l'app génère le programme correspondant (Full Body A/B/C, Haut/Bas x2, ou PPL x2). Si l'objectif du profil est la perte de poids, un finisher cardio de 15-20 min est ajouté à chaque séance. L'onglet Sport affiche la séance du jour avec ses exercices, séries et plages de répétitions cibles, ainsi que le programme complet sur l'ensemble du split.

### Critères d'acceptation

- [ ] Un profil à 3 jours/semaine génère un split Full Body A/B/C ; 4 jours → Haut/Bas sur 2 cycles ; 5 jours → PPL sur 2 cycles.
- [ ] Un profil avec objectif "perte de poids" affiche un finisher cardio à la fin de chaque séance du programme.
- [ ] L'onglet Sport affiche la séance du jour avec la liste de ses exercices, le nombre de séries et la plage de répétitions cible de chacun.
- [ ] L'utilisateur peut consulter l'intégralité du programme (tous les jours du split), pas seulement la séance du jour.

## Bloquée par

- Phase 1

---

## Phase 3 : Suivi d'une séance et historique

**User stories** : 15, 18, 19

### Ce qu'on livre

Depuis la séance du jour, l'utilisateur enregistre le poids et les répétitions réalisées série par série pour chaque exercice. Une fois la séance terminée, il la valide, ce qui l'enregistre dans un historique consultable depuis l'onglet Sport, avec le détail des exercices et performances de chaque séance passée.

### Critères d'acceptation

- [ ] Pour chaque exercice de la séance du jour, l'utilisateur peut saisir un poids et un nombre de répétitions pour chaque série prévue.
- [ ] Valider la séance l'enregistre avec la date et le détail complet des séries effectuées.
- [ ] L'historique des séances liste les séances passées, consultable depuis l'onglet Sport, avec accès au détail (exercices, séries, poids, répétitions) de chacune.

## Bloquée par

- Phase 2

---

## Phase 4 : Progression automatique des charges

**User stories** : 16, 17

### Ce qu'on livre

Après une séance validée, l'app analyse les performances enregistrées pour chaque exercice. Si toutes les séries d'un exercice ont atteint le haut de la plage de répétitions cible, la séance suivante propose automatiquement soit une augmentation des répétitions cibles (si la plage n'est pas encore à son maximum), soit une augmentation de poids de 2,5 kg avec retour au bas de la plage.

### Critères d'acceptation

- [ ] Après une séance où toutes les séries d'un exercice atteignent le haut de la plage de reps (mais que la plage peut encore monter), la séance suivante affiche une plage de répétitions cible relevée pour cet exercice.
- [ ] Après une séance où le haut de plage maximal est atteint sur toutes les séries, la séance suivante affiche ce même exercice avec +2,5 kg et la plage de répétitions cible revenue à son minimum.
- [ ] Un exercice dont les séries n'ont pas toutes atteint le haut de la plage ne déclenche aucune proposition de progression à la séance suivante.

## Bloquée par

- Phase 3

---

## Phase 5 : Remplacement d'exercice

**User stories** : 20

### Ce qu'on livre

Depuis la séance du jour ou le programme complet, l'utilisateur peut remplacer un exercice par un autre partageant le même groupe musculaire principal, choisi parmi la bibliothèque d'exercices de l'app.

### Critères d'acceptation

- [ ] Depuis un exercice de la séance du jour (ou du programme), l'utilisateur peut ouvrir une liste d'exercices alternatifs limitée à ceux du même groupe musculaire.
- [ ] Choisir un exercice alternatif le substitue à l'exercice d'origine pour cette séance/ce jour du programme.
- [ ] Le remplacement conserve la structure de séries/plage de répétitions cible attendue pour l'exercice remplacé.

## Bloquée par

- Phase 2

---

## Phase 6 : Journal nutrition du jour

**User stories** : 11, 12, 13, 28

### Ce qu'on livre

L'onglet Nutrition permet de logger les repas du jour depuis une liste d'aliments courants pré-remplie, ou en ajoutant un aliment personnalisé avec ses propres valeurs nutritionnelles. Un aliment du journal peut être retiré. Tant qu'aucun aliment n'a été ajouté, un état vide explicite s'affiche.

### Critères d'acceptation

- [ ] L'onglet Nutrition affiche une liste d'aliments courants avec valeurs nutritionnelles pré-remplies, ajoutables en un minimum d'étapes au journal du jour.
- [ ] L'utilisateur peut ajouter un aliment personnalisé en saisissant lui-même ses valeurs nutritionnelles, qui apparaît alors dans le journal du jour.
- [ ] L'utilisateur peut retirer un aliment précédemment ajouté au journal du jour.
- [ ] Tant qu'aucun aliment n'a été loggé, le journal du jour affiche un état vide clair plutôt qu'une liste vide silencieuse.

## Bloquée par

- Phase 1

---

## Phase 7 : Suivi du poids

**User stories** : 21, 22, 23, 29

### Ce qu'on livre

L'onglet Progrès permet d'enregistrer une pesée. La courbe de poids affiche l'historique des pesées avec une ligne représentant l'objectif de poids visé, accompagnée d'un bilan chiffré (écart au poids visé, rythme réel observé). Tant qu'aucune pesée n'a été enregistrée, un état vide explicite invite à saisir la première.

### Critères d'acceptation

- [ ] L'utilisateur peut enregistrer une pesée (date + valeur) depuis l'onglet Progrès.
- [ ] La courbe de poids affiche chaque pesée enregistrée ainsi qu'une ligne représentant le poids visé du profil.
- [ ] Un bilan chiffré affiche l'écart entre le poids actuel et le poids visé, ainsi que le rythme de progression réel observé.
- [ ] Tant qu'aucune pesée n'a été saisie, l'onglet Progrès affiche un état vide explicite invitant à la première saisie plutôt qu'une courbe vide.

## Bloquée par

- Phase 1

---

## Phase 8 : Écran d'accueil (agrégation)

**User stories** : 10

### Ce qu'on livre

L'onglet Accueil centralise en un coup d'œil : la jauge calorique et macros du jour (issue du journal nutrition et de l'objectif du profil), la prochaine séance à venir (issue du programme sportif), et un résumé du poids (issu du suivi de poids). C'est l'écran d'entrée quotidien de l'app une fois le profil configuré.

### Critères d'acceptation

- [ ] L'onglet Accueil affiche la jauge calorique du jour et les macros restantes, reflétant en temps réel le journal nutrition du jour.
- [ ] L'onglet Accueil affiche la prochaine séance à réaliser selon le programme généré.
- [ ] L'onglet Accueil affiche un résumé du poids (dernière pesée et/ou tendance vers l'objectif).
- [ ] Toute modification du journal nutrition, de la séance du jour ou d'une pesée se reflète sur l'onglet Accueil sans action supplémentaire de l'utilisateur.

## Bloquée par

- Phase 2 (prochaine séance)
- Phase 6 (jauge calorique/macros du jour)
- Phase 7 (résumé du poids)
