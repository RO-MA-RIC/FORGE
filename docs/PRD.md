## Problème

Aujourd'hui, suivre à la fois sa nutrition et son entraînement oblige à jongler entre deux applications distinctes — une pour compter les calories et macros, une autre pour suivre le programme de musculation. Cette séparation crée une friction quotidienne : il faut ouvrir deux outils différents pour avoir une vue d'ensemble de sa journée (calories restantes, macros, séance à faire), sans qu'aucun des deux n'ait connaissance de l'autre. L'utilisateur veut un seul endroit qui centralise ce suivi, avec des règles de calcul et de progression qu'il maîtrise et en qui il a confiance.

## Solution

Une application personnelle de suivi qui combine calcul calorique et programme d'entraînement en un seul endroit, utilisable au quotidien depuis un téléphone. L'utilisateur renseigne son profil une fois (sexe, âge, taille, poids actuel, poids visé, niveau d'activité, objectif, jours d'entraînement par semaine) ; l'app calcule automatiquement ses besoins caloriques, sa répartition de macros, et génère un programme de musculation adapté au nombre de jours choisi.

Chaque jour, l'utilisateur consulte sa jauge calorique et ses macros restantes, logue ses repas depuis une liste d'aliments courants ou en ajoutant les siens, et suit sa séance du jour en enregistrant poids et répétitions série par série. L'app fait progresser automatiquement les charges d'entraînement selon les performances enregistrées, et permet de remplacer un exercice par un autre du même groupe musculaire si besoin (manque de matériel, gêne). Il enregistre aussi ses pesées régulières pour suivre sa courbe de poids par rapport à son objectif.

Toutes les données restent sur l'appareil de l'utilisateur, sans compte ni connexion nécessaire.

## Utilisateur cible

Une personne pratiquant déjà la musculation avec un niveau intermédiaire à confirmé : elle connaît l'exécution des mouvements de base (squat, développé, tractions, etc.) sans avoir besoin d'un tutoriel ou d'indications de forme, et cherche avant tout un outil de suivi et de calcul fiable plutôt que du contenu pédagogique. Elle utilise l'app quotidiennement, principalement depuis son téléphone, pour logger ses repas et ses séances, et occasionnellement depuis un écran plus grand pour consulter son profil ou sa progression en détail.

## User Stories

1. En tant qu'utilisateur, je veux renseigner mon profil (sexe, âge, taille, poids actuel, poids visé, niveau d'activité, objectif, jours d'entraînement) afin que l'app calcule mes besoins caloriques et génère mon programme.
2. En tant qu'utilisateur, je veux voir mon métabolisme de base et ma dépense totale calculés à partir de mon profil afin de comprendre d'où vient mon objectif calorique.
3. En tant qu'utilisateur en perte de poids, je veux que mon objectif calorique intègre un déficit proportionnel au rythme que je choisis (0,25 / 0,5 / 0,75 kg par semaine) afin d'atteindre mon poids visé au rythme souhaité.
4. En tant qu'utilisateur en prise de masse, je veux que mon objectif calorique intègre un surplus modéré afin de limiter la prise de gras.
5. En tant qu'utilisateur en maintien, je veux que mon objectif calorique soit égal à ma dépense totale.
6. En tant qu'utilisateur, je veux qu'un plancher de sécurité empêche mon objectif calorique de descendre trop bas, afin de ne pas me mettre en danger même si mes paramètres le suggèrent.
7. En tant qu'utilisateur, je veux voir ma répartition de macros (protéines, lipides, glucides) calculée à partir de mon objectif afin de savoir quoi manger.
8. En tant qu'utilisateur, je veux qu'un programme de musculation soit généré automatiquement selon le nombre de jours que je choisis (3, 4 ou 5) afin de ne pas avoir à le construire moi-même.
9. En tant qu'utilisateur en perte de poids, je veux qu'un finisher cardio soit ajouté à chaque séance afin de soutenir mon déficit calorique.
10. En tant qu'utilisateur, je veux voir la jauge de mes calories et macros du jour, ma prochaine séance et un résumé de mon poids sur un écran d'accueil afin d'avoir une vue d'ensemble rapide.
11. En tant qu'utilisateur, je veux ajouter un aliment à mon journal du jour depuis une liste d'aliments courants afin de logger rapidement mes repas habituels.
12. En tant qu'utilisateur, je veux ajouter un aliment personnalisé avec ses valeurs nutritionnelles afin de logger un aliment absent de la liste courante.
13. En tant qu'utilisateur, je veux retirer un aliment de mon journal du jour afin de corriger une erreur de saisie.
14. En tant qu'utilisateur, je veux consulter ma séance du jour avec la liste de ses exercices, séries et plages de répétitions cibles afin de savoir quoi faire à la salle.
15. En tant qu'utilisateur, je veux enregistrer le poids et les répétitions réalisées à chaque série d'un exercice afin de suivre précisément ma performance.
16. En tant qu'utilisateur, je veux que l'app me propose d'augmenter mes répétitions cibles quand j'ai atteint le haut de ma plage sur toutes les séries d'un exercice, afin de progresser progressivement.
17. En tant qu'utilisateur, je veux que l'app me propose d'augmenter le poids d'un exercice de 2,5 kg (et de redescendre au bas de la plage de répétitions) une fois le haut de plage atteint sur toutes les séries, afin de continuer à progresser une fois la plage de reps épuisée.
18. En tant qu'utilisateur, je veux valider ma séance une fois terminée afin qu'elle soit enregistrée dans mon historique.
19. En tant qu'utilisateur, je veux consulter l'historique de mes séances passées afin de voir ma progression dans le temps.
20. En tant qu'utilisateur, je veux remplacer un exercice de ma séance par un autre du même groupe musculaire afin de m'adapter à un manque de matériel ou une gêne physique.
21. En tant qu'utilisateur, je veux enregistrer une pesée afin de suivre l'évolution de mon poids.
22. En tant qu'utilisateur, je veux voir ma courbe de poids avec une ligne représentant mon objectif afin de visualiser ma progression par rapport à mon but.
23. En tant qu'utilisateur, je veux voir un bilan chiffré de ma progression (écart au poids visé, rythme réel, etc.) afin d'évaluer où j'en suis.
24. En tant qu'utilisateur, je veux consulter le détail de mon calcul métabolique depuis l'onglet Profil afin de comprendre comment mes chiffres sont obtenus.
25. En tant qu'utilisateur, je veux modifier mon profil (poids, objectif, jours d'entraînement, etc.) afin que mes calculs et mon programme restent à jour.
26. En tant qu'utilisateur, je veux que toutes mes données soient sauvegardées automatiquement à chaque action afin de ne jamais perdre ma progression.
27. En tant qu'utilisateur qui n'a encore rien renseigné, je veux être guidé vers la saisie de mon profil dès le premier lancement afin de pouvoir utiliser l'app immédiatement.
28. En tant qu'utilisateur qui n'a pas encore loggé de repas aujourd'hui, je veux voir un journal nutrition vide clairement indiqué afin de comprendre qu'il n'y a encore rien à afficher.
29. En tant qu'utilisateur qui n'a pas encore enregistré de pesée, je veux voir un état vide explicite sur la courbe de poids afin de comprendre qu'il faut saisir une première pesée pour la faire apparaître.

## Critères de succès

- Un profil complet saisi produit un objectif calorique, une répartition de macros et un programme d'entraînement affichés sans action supplémentaire.
- Le journal nutrition du jour reflète en temps réel chaque ajout ou suppression d'aliment, et la jauge calorique/macros de l'accueil se met à jour en conséquence.
- Une séance peut être suivie du début à la validation, avec saisie du poids et des répétitions à chaque série, sans quitter l'app.
- Après une séance où le haut de la plage de répétitions est atteint sur toutes les séries d'un exercice, la séance suivante affiche la proposition de progression attendue (reps ou +2,5 kg) pour cet exercice.
- Une pesée enregistrée apparaît immédiatement sur la courbe de poids de l'onglet Progrès.
- Après fermeture et réouverture de l'app, toutes les données précédemment saisies (profil, journal, séances, pesées) sont toujours présentes.
- L'utilisateur peut réaliser un cycle quotidien complet (consulter l'accueil, logger ses repas, faire sa séance, enregistrer une pesée) sans jamais avoir besoin d'ouvrir YAZIO ou Gravl.

## Hors périmètre

- Comptes utilisateurs et authentification
- Usage coach suivant plusieurs clients, ou tout mode multi-profils
- Synchronisation cloud ou multi-appareils
- Messagerie intégrée
- Rappels d'hydratation
- Historique nutritionnel sur plusieurs jours (uniquement le jour courant en v1)
- Export CSV du journal alimentaire
- Ajustement automatique de l'objectif calorique selon la progression réelle du poids
- Recherche d'aliments via une base externe (l'app s'appuie uniquement sur une liste locale curatée et les ajouts personnalisés de l'utilisateur)
- Application mobile native (l'app est une web app responsive)
- Contenu pédagogique d'exécution des mouvements (descriptions techniques, indications de forme, vidéos)
- Progression basée sur le ressenti (RPE) ou tout autre mode de progression que la double progression reps→poids
- Palier de progression variable par type d'exercice (le palier de +2,5 kg est fixe pour tous les exercices chargés)

## Décisions d'implémentation

- Le métabolisme de base est calculé via la formule de Mifflin-St Jeor à partir du poids, de la taille, de l'âge et du sexe.
- La dépense totale est le métabolisme de base multiplié par un facteur d'activité (sédentaire à très actif).
- Le plancher de sécurité de l'objectif calorique est de 1500 kcal pour un homme et 1200 kcal pour une femme ; l'objectif calculé ne peut jamais descendre en dessous.
- Les protéines sont fixées entre 1,8 et 2,2 g/kg de poids de corps selon l'objectif (plus élevé en perte de poids) ; les lipides représentent environ 27 % des calories totales ; les glucides comblent le reste.
- Le programme d'entraînement suit un split fixe selon le nombre de jours choisi : 3 jours → Full Body A/B/C, 4 jours → Haut/Bas sur 2 cycles, 5 jours → Push/Pull/Legs/Push 2/Pull 2.
- Un finisher cardio de 15 à 20 minutes est ajouté à chaque séance uniquement si l'objectif est la perte de poids.
- Chaque exercice a une plage de répétitions cible par défaut (ex. 8-12) ; quand toutes les séries d'un exercice atteignent le haut de cette plage lors d'une séance, la séance suivante propose soit d'augmenter les répétitions cibles (si la plage n'est pas encore au maximum), soit d'augmenter le poids de 2,5 kg et de redescendre au bas de la plage.
- Chaque exercice de la bibliothèque est associé à un groupe musculaire principal ; le remplacement d'exercice propose tous les autres exercices de la bibliothèque partageant ce même groupe musculaire.
- La saisie de performance se fait série par série (un champ poids et un champ répétitions par série prévue).
- La liste d'aliments courants est une liste locale curatée avec valeurs nutritionnelles pré-remplies ; l'ajout personnalisé demande à l'utilisateur de saisir lui-même les valeurs nutritionnelles.
- Toutes les données sont sauvegardées automatiquement en local à chaque action, sans étape de sauvegarde manuelle.
- L'application est conçue mobile-first pour les écrans de saisie quotidienne (nutrition, séance), tout en restant utilisable confortablement sur un écran plus large.
- L'onglet Progrès affiche une courbe de poids avec une ligne représentant l'objectif, ainsi qu'un bilan chiffré (écart au poids visé, rythme réel observé).
- L'onglet Profil affiche le détail du calcul métabolique (BMR, TDEE, objectif, macros) et permet de modifier chaque paramètre du profil.

## Notes complémentaires

Rien à signaler.
