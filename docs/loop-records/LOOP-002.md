# LOOP-002: Loop Snake game

- Objective: Add a deterministic snake game with keyboard and mobile touch control.
- Starting commit: `869fe42`
- Branch: `codex/sample-games-nav-loop`
- Authorization: Local changes, commit, push to `main`, GitHub Pages deployment, and live smoke testing.

## RED

- Core tests failed with `ERR_MODULE_NOT_FOUND` for `assets/snake-core.js`.
- Input tests failed with `ERR_MODULE_NOT_FOUND` for `games/input.js`.
- Page test failed because the placeholder contained no canvas, status region, start button, or touch controls.
- Classification: `GAME_LOGIC`, `INPUT`, and `MARKUP`.

## Minimal correction

- Added a pure snake state module with deterministic food injection, direction validation, growth, wall collision, and body collision.
- Added pure keyboard and swipe-to-direction adapters.
- Replaced the Games placeholder with an accessible Canvas game, live status, score, start/pause/restart control, keyboard support, swipe handling, and 4 touch buttons.
- Extended only the shared stylesheet and existing static artifact path.

## Self-correction

- First targeted run: 7 passed, 1 failed because the page assertion ignored the intentional `<strong>` markup around input labels.
- Classification: `TEST`; only the assertion was corrected.
- First full run: an earlier placeholder test still required an H1 of `Games`.
- Classification: `TEST/REGRESSION`; the Games tab contract was retained and only the temporary heading expectation was updated to `Loop Snake`.
- Retry 1 of 3: targeted 8 of 8 GREEN; full suite 11 of 11 GREEN.

## Browser observation

- Desktop 1100px: 572px game board, no horizontal overflow, no console warnings/errors.
- Keyboard: Start button focused the board, ArrowDown was accepted, status changed to running, and Pause became available.
- Mobile 320px: 300px game board, no horizontal overflow, no console warnings/errors.
- Touch controls: four buttons measured 64×56px and were exposed with accessible direction names.
- The automation delay allowed the running game to reach a wall; the expected game-over status and Play again state were observed.

## Final checks before deployment

- `npm test`: GREEN, 11 passed and 0 failed.
- `npm run build`: GREEN.
- `git diff --check`: GREEN.
- Secret-pattern scan: GREEN.
- Deployment and live smoke result: recorded after the workflow completes.
