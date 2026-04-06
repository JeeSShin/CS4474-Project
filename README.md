# Equation Gateway

A math puzzle game built for CS4474. Players solve equations under time pressure, progressing through three stages with increasing difficulty.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

## Build from Source

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CS4474-Project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Production Build

To build and preview a production-optimized version:

```bash
npm install
npm run build
npm run preview
```

Then open `http://localhost:4173` in your browser.

## How to Play

1. From the **Main Menu**, select a difficulty level (Easy, Normal, Hard, or Extreme).
2. Choose a **Stage** to begin (Entrance, Corridor, or Vault).
3. An equation with a missing value is displayed. Select the correct answer from the doors before the timer runs out.
4. You have **3 lives** - a wrong answer or timeout costs one life.
5. Build streaks of 3+ correct answers to earn bonus points.
6. Complete all rounds in a stage to progress. Survive all three stages to win.

## Stages

| Stage    | Rounds |
|----------|--------|
| Entrance | 5      |
| Corridor | 7      |
| Vault    | 10     |

## Scoring

- **Base:** 100 points per correct answer
- **Time bonus:** `timeLeft × 6`
- **Streak bonus:** `streak × 12` (activates at 3+ consecutive correct answers)
