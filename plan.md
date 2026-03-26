# HCI/UX Deep-Dive: Equation Gateway Improvement Plan

## Context

Equation Gateway is a timed math puzzle game (React + Vite) for CS4474. The current UI has strong visual design (neon cyberpunk aesthetic, cohesive color system, satisfying animations) but exhibits significant gaps across multiple HCI dimensions: accessibility, cognitive load management, user control, learnability, and engagement feedback loops. This analysis applies established HCI frameworks (Nielsen's heuristics, WCAG 2.1 AA, Cognitive Load Theory, Flow Theory, Self-Determination Theory) to produce actionable improvements.

---

## Critical Priority (Breaks usability or accessibility)

### 1. No Pause/Exit During Gameplay
**Heuristic:** Nielsen #3 — User Control & Freedom
**Problem:** Once a game starts, there is zero way to pause, quit, or take a break. The timer runs continuously (`GameScreen.jsx:36-56`). Users who need to step away must drain all lives or refresh the browser, losing all progress. This violates the fundamental "emergency exit" principle.
**Fix:** Add a pause button (top-right of HUD) that stops the timer, hides the equation/answers (preventing pause-and-think exploitation), and shows a modal with Resume / Restart / Quit options. Bind Escape key to toggle pause.
**Files:** `src/screens/GameScreen.jsx`

### 2. No `aria-live` Regions for Dynamic Game State
**Heuristic:** Nielsen #1 — Visibility of System Status; WCAG 4.1.3 — Status Messages
**Problem:** Score changes, feedback ("WRONG", "TIME'S UP"), streak badges, life loss, and timer urgency are all visual-only DOM updates. Zero `aria-live` regions exist in the entire codebase. Screen reader users receive no indication of any game event.
**Fix:** Add `aria-live="assertive"` to the feedback div (`GameScreen.jsx:216`) with `role="status"`. Add `aria-live="polite"` for score/streak announcements. Add a visually-hidden score announcement on change.
**Files:** `src/screens/GameScreen.jsx`

### 3. Sound Toggle Lacks ARIA Semantics
**Heuristic:** Nielsen #4 — Consistency & Standards; WAI-ARIA Switch Pattern
**Problem:** The custom toggle (`SettingsScreen.jsx:65-87`) is a `<button>` with no `role="switch"`, no `aria-checked`, no `aria-label`. A screen reader announces only "ON" or "OFF" with zero context.
**Fix:** Add `role="switch"`, `aria-checked={sound}`, `aria-label="Sound effects"`.
**Files:** `src/screens/SettingsScreen.jsx`

### 4. No `prefers-reduced-motion` Support
**Heuristic:** WCAG 2.3.3 — Animation from Interactions
**Problem:** 20+ CSS animations (continuous loops: pulse, corridorPulse, scanline, driftUp; entrance: fadeUp, slideLeft; feedback: shake, doorShakeHard, wrongFlash, burst) all ignore the `prefers-reduced-motion` user preference. Users with vestibular disorders have no way to disable motion.
**Fix:** Add `@media (prefers-reduced-motion: reduce)` block in `styles.js` that sets `animation-duration: 0.01s !important` for all keyframes and disables continuous animations. Add an in-app "Reduce Motion" toggle in Settings.
**Files:** `src/styles.js`, `src/screens/SettingsScreen.jsx`

---

## High Priority (Significant UX/accessibility impact)

### 5. Results Screen Lacks Performance Breakdown
**Heuristic:** Information Architecture — Progressive Disclosure; Metacognitive Feedback (Flavell, 1979)
**Problem:** `ResultsScreen.jsx` shows only total score and win/lose. No accuracy %, average response time, best streak, or per-stage breakdown. The `onFinish` callback passes only `{ score, stage, result }`.
**Fix:** Track per-round data in GameScreen (correct/wrong/timeout, time taken). Display summary: total correct/wrong, best streak, avg response time, per-stage mini-bars.
**Files:** `src/screens/GameScreen.jsx`, `src/screens/ResultsScreen.jsx`

### 6. Timer Uses Color Alone for Urgency
**Heuristic:** Nielsen #1; WCAG 1.4.1 — Use of Color
**Problem:** Timer urgency relies solely on hue shifts (green->orange->red). 8% of males with color vision deficiency cannot perceive the green-to-orange transition. Tick sounds fire only at exactly 3s, 2s, 1s — no gradual ramp.
**Fix:** Add secondary non-color indicator: warning icon at <50%, text "HURRY" at <25%, increase border width at danger. Add gradual tick acceleration (every 2s above 50%, every 1s at 30-50%, every 0.5s below 30%).
**Files:** `src/components/Timer.jsx`, `src/screens/GameScreen.jsx`

### 7. Lives Indicator Relies on Color + Tiny Shapes
**Heuristic:** Nielsen #1; WCAG 1.4.1
**Problem:** Lives shown as 14px diamonds (filled vs hollow) in red vs dim gray with opacity 1 vs 0.3. At 14px the filled/hollow distinction is hard to perceive.
**Fix:** Add text "Lives: 2/3" as `aria-label`. Increase icon size to 18px. Flash the lives section briefly when a life is lost. Announce via aria-live.
**Files:** `src/screens/GameScreen.jsx`

### 8. No Focus Management on Screen Transitions
**Heuristic:** Nielsen #1; WCAG 2.4.3 — Focus Order
**Problem:** Screen transitions (`setScreen()` in App.jsx) are instant state swaps. Focus is never moved to the new screen's heading — keyboard/screen reader users are stranded.
**Fix:** After each screen change, programmatically focus the new screen's heading via `useRef` + `ref.focus()`. Update `document.title` per screen.
**Files:** `src/App.jsx`, all screen files

### 9. "Play Again" Always Restarts from Stage 1
**Heuristic:** Nielsen #3 — User Control & Freedom
**Problem:** A player who lost at Stage 3, Round 8 must replay all 12 rounds of Stages 1-2. The `onRetry` callback hardcodes `startGame(1)`.
**Fix:** Add "Retry from Stage X" button (where X = stage lost at) alongside "Play from Start". The `startGame` function already accepts a stage parameter.
**Files:** `src/screens/ResultsScreen.jsx`, `src/App.jsx`

### 10. Difficulty Selection Uses Color as Sole Indicator
**Heuristic:** Nielsen #4; WCAG 1.4.1
**Problem:** Selected difficulty option is distinguished only by border color change and subtle background tint. No checkmark, radio dot, or text indicator.
**Fix:** Add visible checkmark to selected option. Add `role="radiogroup"` to container, `role="radio"` + `aria-checked` to each card.
**Files:** `src/screens/SettingsScreen.jsx`

### 11. GatewayDoor Components Lack ARIA Labels
**Heuristic:** WCAG 4.1.2 — Name, Role, Value
**Problem:** Door buttons have no `aria-label`. Screen readers announce only the number. No context: "Door 1, answer 56."
**Fix:** Add `aria-label={`Door ${idx+1}, answer ${value}`}`. Add `aria-disabled` for frozen state.
**Files:** `src/components/GatewayDoor.jsx`

### 12. Door Components Don't Scale on Mobile
**Heuristic:** WCAG 1.4.10 — Reflow; Responsive Design
**Problem:** Fixed 130x210px doors. 3 doors = 422px, 4 doors = 552px. Overflows 320px mobile screens.
**Fix:** Use responsive width: `Math.min(130, (viewportWidth - 80) / doorCount)`. For 4-door layouts on mobile, consider 2x2 grid.
**Files:** `src/components/GatewayDoor.jsx`, `src/screens/GameScreen.jsx`

### 13. Equation Display Font Shrinks Below Readability for Binary/Roman
**Heuristic:** Cognitive Load Theory — Visual Processing
**Problem:** Inline font sizing logic has three breakpoints (24-40px). Binary mode produces long strings (e.g., "10100 + 1110") that shrink to 24px, increasing cognitive load under time pressure.
**Fix:** Set absolute min 28px. For long expressions, allow line-break at operator rather than shrinking below threshold. Add `aria-label` with spoken-form text.
**Files:** `src/screens/GameScreen.jsx`

### 14. Skip Navigation & Landmark Roles Missing
**Heuristic:** WCAG 2.4.1 — Bypass Blocks; WCAG 1.3.1
**Problem:** No `<main>`, `<nav>`, `<header>` landmarks. No skip links. Keyboard users tab through everything sequentially.
**Fix:** Add `<main>` wrapper in App.jsx. Add visually-hidden skip link targeting `#main-content`.
**Files:** `src/App.jsx`, `src/styles.js`

### 15. Tutorial Is Incomplete
**Heuristic:** Learnability; Scaffolded Instruction
**Problem:** Only 4 steps covering equation display, doors, one try-it, and timer. Missing: scoring system, lives, streaks, keyboard shortcuts. Try-it offers exactly one equation with no retry.
**Fix:** Add steps for scoring, lives/streaks, and keyboard shortcuts with interactive demos. Make try-it repeatable.
**Files:** `src/screens/TutorialScreen.jsx`

### 16. No Performance History or Progress Tracking
**Heuristic:** Self-Determination Theory (competence need); Goal Gradient Effect
**Problem:** No high scores, no personal best, no progress across sessions. Each game exists in isolation.
**Fix:** Store top 5 scores in localStorage (difficulty, date, stages). Display "Personal Best" on results screen. Show "NEW HIGH SCORE!" celebration. Show best on menu.
**Files:** `src/screens/ResultsScreen.jsx`, `src/App.jsx`, `src/screens/MenuScreen.jsx`

---

## Medium Priority (Noticeable improvement)

### 17. HUD Abbreviations Add Cognitive Decoding Step
**Heuristic:** Miller's Law (chunking); Cognitive Load — extraneous load
**Problem:** "STG", "RND", "PTS" at 10-12px require mental decoding during active gameplay.
**Fix:** Replace with full words or universal icons. Increase round counter to 14px.
**Files:** `src/screens/GameScreen.jsx`

### 18. Settings Not Persisted Across Sessions
**Heuristic:** User Control — expectation of persistence
**Problem:** All settings reset on refresh (state in App.jsx only).
**Fix:** Save to localStorage on change, read on mount with fallbacks.
**Files:** `src/App.jsx`

### 19. Inconsistent Back-Button Placement
**Heuristic:** Nielsen #4 — Internal Consistency
**Problem:** Back button is bottom-left (Settings), bottom-center (Stages), inline (Tutorial), absent (Game).
**Fix:** Standardize to top-left on all non-game screens.
**Files:** `src/screens/SettingsScreen.jsx`, `src/screens/StageSelectScreen.jsx`, `src/screens/TutorialScreen.jsx`

### 20. Distractor Answers Are Random, Not Pedagogical
**Heuristic:** Nielsen #9 — Help Users Recognize Errors; Constructive Error Theory
**Problem:** Distractors are random offsets, not based on common math errors. Missed learning opportunity.
**Fix:** Generate at least one distractor from common error patterns (off-by-one factor, wrong operation, PEMDAS error).
**Files:** `src/mathEngine.js`

### 21. Keyboard Shortcuts Not Discoverable
**Heuristic:** Nielsen #6 — Recognition over Recall
**Problem:** Keys 1-3/4 select doors. Only indicator: 10px badge at 50% opacity on door. Tutorial doesn't mention them.
**Fix:** Increase badge to 24px, improve contrast. Add tutorial step. Show one-time tooltip on first game round.
**Files:** `src/screens/TutorialScreen.jsx`, `src/screens/GameScreen.jsx`, `src/components/GatewayDoor.jsx`

### 22. Scoring System Is Opaque
**Heuristic:** Nielsen #6 — Recognition over Recall; Transparency
**Problem:** 100 base + streak (n*12 for 3+) + time bonus (tLeft*6) is never explained. "+178" flashes with no breakdown.
**Fix:** Add tutorial step for scoring. Show brief breakdown on correct: "+100 base +42 time +36 streak".
**Files:** `src/screens/TutorialScreen.jsx`, `src/screens/GameScreen.jsx`

### 23. Stage Select Has No Completion/Progress Indicators
**Heuristic:** Nielsen #6; Goal Gradient Effect
**Problem:** All 3 stage cards look identical. No completion markers, best scores, or difficulty context.
**Fix:** Track per-stage best score. Show checkmarks/stars and best score on cards.
**Files:** `src/screens/StageSelectScreen.jsx`, `src/App.jsx`

### 24. Background Distractions During Gameplay
**Heuristic:** Nielsen #8 — Signal-to-Noise; Selective Attention Theory
**Problem:** 3D grids pulsing, 2 scanlines, 7 particles, and Vault hatching pattern compete for attention with the actual game content.
**Fix:** Reduce during gameplay: slow scanlines (4s -> 8s), halve particles (7 -> 3), reduce pulse opacity, remove Vault hatching.
**Files:** `src/components/CorridorBG.jsx`, `src/styles.js`

### 25. Settings Font Sizes Below Recommended Minimum
**Heuristic:** WCAG 1.4.4; Readability
**Problem:** 10-11px labels and descriptions, especially with uppercase + wide letter-spacing.
**Fix:** Increase min to 12px for all text. Bump HUD secondary text to 11px.
**Files:** `src/screens/SettingsScreen.jsx`, `src/screens/GameScreen.jsx`

### 26. No Life Recovery Mechanism
**Heuristic:** Self-Determination Theory (competence); Learned Helplessness Prevention
**Problem:** 3 lives for 22 rounds with no recovery. Each mistake permanently punishing.
**Fix:** Award bonus life for 5-streak or zero-mistake stage clear (cap at 3).
**Files:** `src/screens/GameScreen.jsx`

### 27. Limited PEMDAS Pattern Variety
**Heuristic:** Flexibility; Challenge Calibration
**Problem:** Only 3 PEMDAS patterns. Expert players quickly recognize them, reducing to pattern matching.
**Fix:** Add patterns: `a * (b + c)`, `a * b + c * d`, `a - b * c`, `a + b / c`.
**Files:** `src/mathEngine.js`

### 28. Extreme Difficulty Vault Timing Is Potentially Frustrating
**Heuristic:** Flow Theory (challenge/skill balance)
**Problem:** 7s * 0.6 = 4.2s with numbers up to 180 and 4 doors. Mathematically unsolvable for average players.
**Fix:** Raise minimum time floor from 3.0 to 4.0 seconds. Add "close call" bonus for sub-1s answers.
**Files:** `src/constants.js`, `src/mathEngine.js`

### 29. Tutorial Progress Dots Lack Text Labels
**Heuristic:** WCAG 1.3.1; Learnability
**Problem:** 12px colored dots with no text. Screen readers encounter styled divs with no meaning.
**Fix:** Add `role="progressbar"` with aria-valuenow/min/max. Show visible "Step X of Y" text.
**Files:** `src/screens/TutorialScreen.jsx`

### 30. Hint System for Struggling Players
**Heuristic:** Vygotsky's Zone of Proximal Development; Scaffolding
**Problem:** No assistance when stuck. Must guess or timeout (both lose a life).
**Fix:** Add optional hint button (costs 50% time bonus) that eliminates one wrong door. One per round.
**Files:** `src/screens/GameScreen.jsx`, `src/components/GatewayDoor.jsx`

---

## Low Priority (Polish)

- **Menu staggered animations delay interaction** (up to 0.4s invisible) — reduce to 0.05s increments on return visits
- **Play button triangle icon** announced by screen readers — wrap in `aria-hidden="true"`
- **Score counter animation** (1.5s) delays information access — show final score immediately in small text above animated counter
- **No first-run tutorial prompt** — highlight Tutorial button with pulsing glow on first visit via localStorage flag
- **Wrong answer feedback doesn't explain error** — show "That's 7x7, not 7x8" when distractor maps to known error pattern
- **No UI navigation sounds** — add soft clicks/switches via existing Web Audio API pattern
- **No adaptive difficulty** — lightweight within-run adjustment based on performance (ambitious but impactful)

---

## Recommended Implementation Order

| Phase | Focus | Items | Effort |
|-------|-------|-------|--------|
| 1 | Critical fixes | 1-4 (pause, aria-live, ARIA switch, reduced-motion) | ~1-2 days |
| 2 | Core UX | 5, 9, 15, 16, 18 (results breakdown, retry-from-stage, tutorial, scores, persistence) | ~2-3 days |
| 3 | Accessibility | 6-8, 10-14 (timer, lives, focus, settings ARIA, doors, mobile, landmarks) | ~1-2 days |
| 4 | Polish | 17, 19-30 (HUD, back buttons, distractors, keyboard hints, scoring, hints) | ~2-3 days |

## Verification

- Run `npm run dev` and test each screen with keyboard-only navigation
- Install axe DevTools browser extension and verify 0 critical/serious violations
- Test with `prefers-reduced-motion: reduce` enabled in browser DevTools
- Test on 320px-wide viewport (mobile reflow)
- Test screen reader announcements with VoiceOver (macOS: Cmd+F5)
- Verify localStorage persistence survives page refresh
- Test pause/resume flow mid-game
