# SAMPLE-001: Home navigation exposes Games

## Ticket

- Objective: Provide a mobile-ready Home document with a primary navigation link to a Games destination.
- Scope: Framework-neutral static spike only.
- Starting commit: `faeaa3d`
- Branch: `codex/sample-games-nav-loop`
- Authorization: Local implementation and test execution only. No commit, push, or deployment.
- Pre-existing workspace item: Untracked `.DS_Store`; preserved without modification.

## Test criteria

- `index.html` includes a viewport meta element containing `width=device-width`.
- Home contains a primary navigation landmark with an accessible label.
- Primary navigation contains a `Games` link targeting `games/`.
- `games/index.html` exists and exposes a `Games` level-one heading.
- The targeted test and full test suite pass.
- `git diff --check` reports no whitespace errors.
- No package, external dependency, token, commit, push, or deployment is introduced.

## Execution record

- Executed at: `2026-07-14 07:56:25 KST`
- Test behavior: Home navigation exposes a mobile-ready Games destination.
- RED command: `node --test tests/navigation.test.mjs`
- Initial result: `RED`
- Initial exit code: `1`
- Failure signature: `ENOENT: no such file or directory, open '.../index.html'`
- First relevant location: `tests/navigation.test.mjs:6`
- Classification: `MARKUP`
- Reasoning: The test failed for the expected reason: the repository had no Home document. No test, dependency, or environment defect was observed.
- Minimal correction: Added only `index.html` and `games/index.html`; no styling, game logic, package, or build configuration was added.
- Retry number: `1 of 3`
- Targeted retry command: `node --test tests/navigation.test.mjs`
- Targeted result: `GREEN` (`1 passed, 0 failed`)
- Full-suite command: `node --test`
- Full-suite result: `GREEN` (`1 passed, 0 failed`)
- Diff check: `GREEN`
- Final state: `GREEN`

## Human-in-the-loop items

- Final framework and package manager: `[사람 확인 필요]`
- Whether `Games` remains a dedicated `/games/` destination: `[사람 확인 필요]`
- Final site language, navigation labels, content, and visual design: `[사람 확인 필요]`
- Production build criteria cannot be finalized until the stack is selected: `[사람 확인 필요]`
- Commit, push, and GitHub Pages deployment were not performed and require explicit approval: `[사람 확인 필요]`

## Next smallest loop

Select the site stack and add a reproducible production build without changing the approved navigation behavior. This next loop must not start until the stack choice is confirmed.
