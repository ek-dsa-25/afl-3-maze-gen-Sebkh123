<<<<<<< HEAD
# Aflevering 4: Maze Solver

## Opgavebeskrivelse

I denne afleveringsopgave skal du tilføje en graf-søgefunktion til at løse
labyrinten og tegne en sti igennem.

## Opgaven

Der er udleveret en skabelon hvor klassen `MazeSolver` allerede er delvist
lavet. Du mangler bare at tilføje selve algoritmen. Vælg selv om du vil
bruge depth-first search (stak) eller breadth-first search (kø) til at udføre
søgningen.

## Delopgave 1: Lav `connectedNeighbors()`

Ved siden af funktionen `unvisitedNeighbors()` bor en funktion `connectedNeighbors()`.

`unvisitedNeighbors()` bliver brugt af `generate()` til at udgrave labyrinten.
Den tjekker et felt i den enkelte celle om `generate()` har besøgt den, og
returnerer de nabo-celler som er ubesøgt af udgraveren.

`connectedNeighbors()` bliver derimod brugt af `MazeSolver` og returnerer også
en liste af celler, men baseret på om der er en væg nord/syd/højre/venstre for
cellen. I tilfælde af at cellen ligger ud til kanten, er svaret selvfølgelig at
der ikke er en nabo i den retning.

Lav funktionen `connectedNeighbors()`.

## Delopgave 2: Lav `findPath()`

Til at finde stien igennem labyrinten er der lavet en funktion `findPath()`.

Den mangler desværre det meste af sin kode. Den skal benytte en søgefunktion
der tjekker grafen af naboceller vha. `connectedNeighbors()`. Der er ikke tale
om en decideret graf-klasse, men blot en abstraktion oven på den eksisterende
labyrint. Man kan sige at grafen benytter en *dense* repræsentation (matrix)
hvor hver celle i matricen er en celle, og nabo-pilene er defineret vha.
væggene.

Lav `findPath()`

## Delopgave 3: Personliggør tegning af stien

Til at tegne stien findes en funktion `drawPath()` som bliver kaldt af en anden
funktion `drawPathStepwise()`. Den tegner en rød firkant der hvor stien går.

Det kan gøres bedre.

Tegn en pænere sti.

## Tekniske krav

- Lav `connectedNeighbors()` og `findPath()`
- Sørg for, når labyrinten bliver indlæst, at stien beregnes og tegnes
=======
# Aflevering 3: Maze Generator

## Opgavebeskrivelse

I denne afleveringsopgave skal du tilføje tilfældighed til maze generatoren for
at skabe mere varierede og interessante labyrint-mønstre.

## Opgaven

Den nuværende maze generator bruger en depth-first search algoritme med en
stack til at generere labyrinten. Algoritmen vælger altid det senest tilføjede
element fra stakken (det øverste element), hvilket kan skabe forudsigelige
mønstre.

Dine to opgaver er:

1. **Tilføj en tilfældighedsparameter** til maze generatoren i stedet for altid
   at vælge det øverste element fra stakken, skal algoritmen have en vis
   sandsynlighed for at vælge et tilfældigt element fra stakken

2. **Tilføj noget, der gør det til DIN labyrint-generator!** Det er ikke vigtigt
   at det er avanceret, men det skal være personligt. Det kan være flere farver,
   eller rundere hjørner, eller at algoritmen opfører sig meget anderledes end
   recursive backtracking. For eksempel kunne du tilføje et element fra [recursive
   division algorithm][rec-div-algo]. Du må gerne vibe-kode den her del.

[rec-div-algo]: https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm

## Tekniske krav

- Tilføj en parameter der bestemmer sandsynligheden for tilfældigt valg (f.eks. som en procent)
- Når algoritmen skal vælge næste celle fra stakken:
  - Med den angivne sandsynlighed: vælg et tilfældigt element fra stakken
  - Ellers: vælg det øverste element som normalt (LIFO - Last In, First Out)

## Anbefalet tilgang

En god startværdi for tilfældighed kunne være **25%** - dette giver en balance
mellem struktur og variation. Der er dog ikke ét rigtigt svar, og du opfordres
til at eksperimentere med forskellige procentsatser for at se hvordan det
påvirker labyrintens udseende og kompleksitet.
>>>>>>> 7588da7928e9238894277a51d89637b560777ecc

## Filer

- `index.html` - HTML-siden med canvas elementet
<<<<<<< HEAD
- `maze.js` - JavaScript kode med klasserne Cell, Maze og MazeSolver

## Sådan kører du programmet

Åbn `index.html` i en webbrowser for at se maze solveren i aktion.

Reload siden når du laver ændringer. Måske skal du "hard-reloade" (Ctrl + Shift + R)
hvis JavaScript'en ikke genindlæser, fordi den ligger cachet i sin egen fil.
=======
- `maze.js` - JavaScript kode med Cell og Maze klasserne

## Sådan kører du programmet

Åbn `index.html` i en webbrowser for at se maze generatoren i aktion.

Reload siden når du laver ændringer. Måske skal du "hard-reloade" (Ctrl + Shift + R)
hvis JavaScript'en ikke genindlæser, fordi den ligger cachet i sin egen fil.
>>>>>>> 7588da7928e9238894277a51d89637b560777ecc
