# Koala Recall

**[Play now](https://koaala.netlify.app/)**

A memory card game where you save koalas from wildfires across the Australian outback.

## How to Play

A 5x4 grid of 20 face-down cards is revealed for a few seconds. Some cards hide **koalas**, the rest are **trees**. Memorize the koala positions, then find them all before time runs out.

### Card Types

| Card | What happens |
|------|-------------|
| **Koala** | Stays face-up. +1 saved koala. |
| **Tree** | Flips back face-down after 1 second. |
| **Fire** | Random chance when clicking a tree. Costs 1 life. |

Fire is not placed on the board — it triggers dynamically each time you click a tree, with a probability that increases every level.

### Rules

- **3 lives** at the start. Lose one each time fire appears.
- **Timer** counts down during the search phase. Run out and the level fails.
- **Koalas found on a failed level don't count** toward your score.
- **Bonus life** awarded after completing levels 5, 10, and 15 (max 5 lives).
- **Bonus points**: +1 koala for finishing with >50% time left, +2 for a perfect level (zero misses).

### Difficulty Progression

20 levels across 7 difficulty tiers:

| Levels | Difficulty | Koalas | Memorize | Fire Chance | Timer |
|--------|-----------|--------|----------|-------------|-------|
| 1–2 | Rookie | 3 | 2.0s | 20–25% | 55–60s |
| 3–5 | Rookie/Easy | 4 | 1.5–2.0s | 25–35% | 50–55s |
| 6–8 | Easy/Medium | 5 | 1.0–1.5s | 40–45% | 40–45s |
| 9–10 | Medium | 6 | 1.0–2.0s | 45% | 35–40s |
| 11–14 | Hard/Extreme | 7–8 | 2.0s | 50% | 28–35s |
| 15–17 | Extreme/Insane | 9 | 2.5s | 60% | 23–28s |
| 18–20 | Insane/Impossible | 10 | 1.0–1.5s | 65–70% | 18–22s |

## Tech Stack

- **React 19** with hooks-based architecture
- **TypeScript** with strict mode
- **Vite 6** for builds and dev server
- **Pure CSS** animations (3D card flip, glow effects)
- **Zero runtime dependencies** beyond React

## Project Structure

```
src/
├── components/       UI components
│   ├── App.tsx           Root component & screen router
│   ├── MainMenu.tsx      Start screen
│   ├── Game.tsx          Game orchestrator (phases, timer, clicks)
│   ├── GameBoard.tsx     5x4 card grid
│   ├── Card.tsx          Individual card with flip animation
│   ├── HUD.tsx           Stats panel (retro pixel style)
│   ├── Overlay.tsx       Modal backdrop
│   ├── LevelCompleteScreen.tsx
│   ├── TimeUpScreen.tsx
│   ├── GameOverScreen.tsx
│   └── VictoryScreen.tsx
├── hooks/            Game logic
│   ├── useGameState.ts   State machine (useReducer)
│   ├── useBoard.ts       Board generation & click handling
│   ├── useTimer.ts       Countdown timer
│   └── useStorage.ts     localStorage persistence
├── config/
│   └── levels.ts         All 20 level configs & constants
├── utils/
│   ├── shuffle.ts        Fisher-Yates shuffle
│   └── formatTime.ts     Seconds → M:SS
└── index.css             All styles
```

## Getting Started

```bash
yarn install
yarn dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
yarn build
```

Output goes to `dist/`.
