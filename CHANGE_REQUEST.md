# Change Request: CRQ-2026-07-14-001

- Overall status: `DEPLOYED`
- Baseline: `e38fc38` (`Refresh portfolio profile and SaaS UI`) on `main`; origin `https://github.com/hyerim92lee-hub/hyerim92lee-hub.github.io.git`.
- Last known good deployment: https://hyerim92lee-hub.github.io/ — Home and `/games/` returned HTTP 200 on 2026-07-14.
- Reference materials: attached `pasted-text.txt`. No CV, résumé, PDF, image, or other content source was supplied or found.
- Existing test evidence: latest recorded successful verification is `npm test` 13/13 plus `npm run build`; these records are preserved.

## User request — verbatim

> (1) 지렁이 게임에서 게임이 끝난경우 게임 화면에 크게 Game Over가 뜨면 좋겠어 (지금 게임이 끝난건지 구분이 안감) 그리고 두들리는 효과음도 넣어줘
>
> (2) 지렁이 게임에서 게임 시작 버튼이 버튼으로 있는게 아니라 게임 화면에 있으면 좋겠어
>
> (3) 게임메뉴로 들어가면 '경력' 메뉴가 사라져
>
> (4) 지렁이 게임에 랜덤하게 움직이는 적을 추가하고 싶어

## Analysis

Request (1) has two independently verifiable changes, so it is separated into CR-001 and CR-002. No duplicate or direct conflict was found. CR-001–004 are sufficiently specified to plan. CR-005 omits enemy count, collision result, speed, spawn/food overlap, score impact, and restart behavior; these define the game rules, so CR-005 is `HITL_REQUIRED`. The full request therefore remains `HITL_REQUIRED`, and this step authorizes no code, content, commit, push, Pages configuration, or deployment change.

## Change items

### CR-001 — In-board Game Over state

| Item | Detail |
|---|---|
| User request / summary | “게임 화면에 크게 Game Over”; make the terminal state unmistakable. |
| Classification | `BUG`, `UI_UX`, `GAME_STATE`, `ACCESSIBILITY` |
| Current → expected | `games/game.js` changes status text/button on `over`, but the canvas stage has no prominent terminal state. An in-board Game Over indication, score, and replay instruction must appear only after game end. |
| Reproduction / evidence | Start the game, collide with wall/body, observe only adjacent status/button changes. Evidence: `games/game.js` `tick()` and `games/index.html` stage. |
| Implementation / source | State-driven overlay/panel in `.game-stage`; semantic status and focus-safe replay. Source: existing game status/state. |
| Scope / files | `games/index.html`, `games/game.js`, `assets/styles.css`, focused game/page tests. No portfolio-content, score-store, movement-rule, deployment, or external-service change. |
| Dependencies | None; design before CR-003 to establish overlay/control stacking. |
| Done / verification | Wall/body collision shows one readable in-board Game Over panel; new game removes it; score/replay work. Targeted tests, `npm test`, `npm run build`, `git diff --check`, and 320/768/1440 plus keyboard/touch checks. |
| Regression / risk / deploy / HITL | Start/pause/resume/restart, best score, input, console, no duplicate overlay. `MEDIUM`; deployment required after implementation; no HITL. |

### CR-002 — One-shot end sound

| Item | Detail |
|---|---|
| User request / summary | “두들리는 효과음”; add a short end-of-game impact effect. |
| Classification | `GAME_EFFECT`, `GAME_STATE`, `ACCESSIBILITY` |
| Current → expected | No terminal audio exists. One running→over transition must emit at most one short effect without making sound the only signal. |
| Reproduction / evidence | Trigger collision; no audio occurs. Evidence: `games/game.js` has no audio playback. |
| Implementation / source | Local browser audio capability or repository-owned asset after user interaction; safely tolerate audio/autoplay failure. |
| Scope / files | `games/game.js`, optional local helper/asset, focused tests. No CDN, third-party API, tracking, or music system. |
| Dependencies | Implement after CR-001’s verified one-time terminal transition. |
| Done / verification | Effect plays once per completed game, does not replay on draw/pause/resume, and failure does not interrupt game. Focused test, full test/build, manual sound and console check. |
| Regression / risk / deploy / HITL | State/timer regression; `MEDIUM`; deployment required; no HITL (short game-over impact is the narrow interpretation). |

### CR-003 — Start control inside the game screen

| Item | Detail |
|---|---|
| User request / summary | Put the start button on the game screen. |
| Classification | `UI_UX`, `GAME_CONTROL`, `ACCESSIBILITY` |
| Current → expected | `#start-game` is in `.game-copy`, outside `.game-stage`. The same real button must appear within the visual stage and preserve start/pause/resume/replay behavior. |
| Reproduction / evidence | Inspect `games/index.html`; button precedes, rather than belongs to, the stage. |
| Implementation / source | Move/visually place the existing button in an in-stage control layer; preserve id, keyboard semantics, and touch accessibility. |
| Scope / files | `games/index.html`, `assets/styles.css`, game-page test; `games/game.js` only if wiring needs adjustment. Do not replace accessible controls with canvas-only interaction. |
| Dependencies | CR-001 layout first. |
| Done / verification | At 320/768/1440px control is in-stage, operable by pointer/keyboard, and does not overlap touch controls/Game Over panel. Targeted tests, full test/build, viewport/manual interaction. |
| Regression / risk / deploy / HITL | Tab order, focus, touch target, status, touch/keyboard controls. `MEDIUM`; deployment required; no HITL. |

### CR-004 — Experience navigation on Games

| Item | Detail |
|---|---|
| User request / summary | The “경력” menu disappears in Games; restore it. |
| Classification | `BUG`, `NAVIGATION`, `INFORMATION_ARCHITECTURE`, `ACCESSIBILITY` |
| Current → expected | Games navigation has Profile, Projects, Games, Contact but lacks Experience. It must expose the Home Experience fragment while Games remains current. |
| Reproduction / evidence | Open Games and inspect primary navigation; compare `games/index.html` with Home navigation. |
| Implementation / source | Add matching Experience link with correct relative Home fragment and existing navigation semantics. |
| Scope / files | `games/index.html`, `tests/navigation.test.mjs`, optionally game-page test. No URL-architecture, portfolio-fact, or other-link removal. |
| Dependencies | Independent; perform first. |
| Done / verification | “경력” appears, resolves to Home Experience, `aria-current` remains Games, and desktop/mobile navigation has no regression. Navigation/page tests, full test/build, Pages-path smoke check. |
| Regression / risk / deploy / HITL | Home/Games links, hashes, mobile menu, horizontal overflow. `LOW`; deployment required; no HITL. |

### CR-005 — Random moving enemy

| Item | Detail |
|---|---|
| User request / summary | Add an enemy that moves randomly. |
| Classification | `NEW_FEATURE`, `GAME_ENTITY`, `GAME_LOGIC`, `GAME_STATE`, `GAME_EFFECT` |
| Current → expected | Game state has snake and food only. Enemy rules are missing. |
| Reproduction / evidence | Start the game; no enemy is rendered/updated. Evidence: `assets/snake-core.js` and `games/game.js`. |
| Implementation / source | Do not act until rules are approved. Then add deterministic core state, rendering, collision/order rules, and focused tests. |
| Scope / files | Likely `assets/snake-core.js`, `games/game.js`, `assets/styles.css`, `tests/snake-core.test.mjs`, game-page/new focused test. No external library/service or Pages-setting change. |
| Dependencies | Requires HITL; follows CR-001–003 so the defined collision can use the terminal UI/effect. |
| Done / verification | Approved rules plus deterministic spawn/movement/collision tests, correct pause/restart, full suite/build/manual control checks. |
| Regression / risk / deploy / HITL | Food, body/wall collision, score, timer, mobile canvas, console. `HIGH`; deployment required. **HITL:** specify enemy count, snake collision outcome, speed, whether it ends/reduces score, and whether it may overlap food/initial snake cells. |

## AORR execution plan

| Order | Loop ID | Change items | State | Target / Act / Observe / Reason | Verifier and completion | Retry / stop / HITL | Expected files |
|---:|---|---|---|---|---|---|---|
| 1 | `LOOP-CRQ-001-NAV` | CR-004 | `CHANGE_PLANNED` | Restore Games Experience link; compare shared navigation and responsive layout. | Navigation/page tests, full suite/build, Pages-path check; link resolves and no existing link regresses. | Retry one markup/path cause; stop on repeated fingerprint; HITL if target fragment is absent/renamed. | Games HTML, navigation tests |
| 2 | `LOOP-CRQ-002-OVERLAY` | CR-001, CR-003 | `CHANGE_PLANNED` | Add terminal overlay and in-stage control; observe collision/replay/focus/input at 320/768/1440. | Targeted tests, full suite/build, viewport/input check; clear terminal state and usable control. | Retry one layout/state cause; stop on repeated fingerprint. | Games HTML/JS/CSS, tests |
| 3 | `LOOP-CRQ-003-AUDIO` | CR-002 | `CHANGE_PLANNED` | Attach safe one-shot terminal effect; observe duplicate-timer/autoplay resilience. | Focused transition test, full suite/build, manual sound/console; one end event has one effect. | Retry one lifecycle cause; HITL for licensed external asset proposal. | Game JS, optional local helper/asset, tests |
| 4 | `LOOP-CRQ-004-ENEMY` | CR-005 | `VERIFYING` | Model/render the approved enemy contract; observe spawn, movement, collision, food, pause, restart. | Deterministic core tests and full regression. | Browser gameplay acceptance remains; no retry needed. | Core, game JS/CSS, tests |
| 5 | `LOOP-CRQ-005-REGRESSION` | All | `BLOCKED` by CR-005 | Whole-site/game/Pages-path regression. | Tests, build, diff, responsive, console, HTTP checks all pass. | Deployment remains a separate approval. | Tests/build artifacts only unless verified defect requires scoped retry |

Implementation protocol: each loop moves `READY → ACTING → VERIFYING → PASSED`; run the primary verifier, `npm test`, `npm run build`, and `git diff --check`; retry only a classified cause and stop after repeated identical fingerprints. Immediate Step 9 loops are 001–003; loop 004 and final regression/deployment are blocked by CR-005 HITL.

## Step 9 execution record — 2026-07-14

| Change item | State | Actual files | Result / remaining verification |
|---|---|---|---|
| CR-004 | `PASSED` | `games/index.html`, `tests/navigation.test.mjs` | Games now includes the relative Experience link. Static navigation test passed. |
| CR-001 | `VERIFYING` | `games/index.html`, `games/game.js`, `assets/styles.css`, `tests/game-page.test.mjs` | In-board Game Over panel and score are state-driven and hidden on a new game. Automated markup/state checks pass; browser viewport/focus verification remains unavailable. |
| CR-003 | `VERIFYING` | `games/index.html`, `assets/styles.css`, `tests/game-page.test.mjs` | Existing button moved into the stage while retaining real-button semantics. Automated checks pass; browser 320/768/1440 layout verification remains unavailable. |
| CR-002 | `VERIFYING` | `games/game.js`, `tests/game-effects.test.mjs` | One guarded Web Audio effect is tied to the one-time running→over transition. Automated transition check passes; audible browser confirmation remains unavailable. |
| CR-005 | `VERIFYING` | `assets/snake-core.js`, `games/game.js`, `tests/snake-core.test.mjs`, `tests/game-effects.test.mjs` | Approved one-enemy rules are implemented and automated checks pass; browser gameplay acceptance remains unavailable. |

Execution evidence: `npm.cmd test` 18/18 PASS; `npm.cmd run build` PASS; `node --check games/game.js` PASS; `git diff --check` PASS; local built `/`, `/games/`, `/assets/styles.css`, and `/games/game.js` returned HTTP 200. No retry was needed. The user explicitly approved deployment on 2026-07-14. Browser screenshot output was unavailable in this environment; this known limitation is preserved in the execution record.

## CR-005 decision — 2026-07-14

The user approved this exact enemy contract: one enemy; each game tick it randomly selects a valid cardinal move; it moves one cell per tick (the same speed as the snake); any snake-head/enemy collision ends the game; it may not spawn or move onto food, snake body, or the initial snake cells; collision has no score adjustment; and a new game creates a new enemy position/direction. The enemy uses a visually distinct purple color. CR-005 is `VERIFYING`: deterministic automated verification is complete; browser gameplay acceptance remains unavailable.

CR-005 verification evidence: new game enemy placement avoids snake/food; one tick makes one valid cardinal enemy move; snake-head/enemy collision ends the game without score change; and renderer uses the distinct enemy color. `npm.cmd test` 18/18 PASS, `npm.cmd run build` PASS, `node --check games/game.js` PASS, and `git diff --check` PASS.

## Deployment result — 2026-07-14

- Deployment commit: `273c9bf` (`CRQ-2026-07-14-001 enhance Loop Snake`).
- Target repository/branch: `hyerim92lee-hub/hyerim92lee-hub.github.io`, `main`.
- Public URL: https://hyerim92lee-hub.github.io/.
- Live verification: `https://hyerim92lee-hub.github.io/assets/snake-core.js` returned HTTP 200 and contained `moveEnemy` on the first check.
- Release state: `DEPLOYED`. The previously recorded browser screenshot limitation remains an acceptance-observation limitation, not a failed deploy.
