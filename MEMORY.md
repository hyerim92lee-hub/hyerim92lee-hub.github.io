# Loop Engineering Memory

## Goal

Build and continuously deploy a professional, responsive E-AI Project website with a Games destination and a snake game operated by keyboard and mobile touch.

## Current scope

- Use dependency-free HTML, CSS, and JavaScript for the website.
- Keep game state logic separate from rendering and input adapters.
- Complete each website update as a bounded RED → Observe → Classify → minimal correction → GREEN loop.
- After a loop is GREEN, commit, push to `main`, wait for GitHub Pages deployment, and smoke-test the live URL.

## Prohibited changes

- Never print, persist, commit, or deploy `github_token.txt` or any token value.
- Never weaken, delete, skip, or blindly update a failing test to obtain GREEN.
- Never deploy when targeted tests, the full suite, the static build, or secret scan fails.
- Never invent professional claims, metrics, contact details, or private information.
- Preserve unrelated user files and changes.

## Test criteria

- `npm test` passes with zero failures.
- `npm run build` emits the whitelisted static site into `dist/`.
- `git diff --check` passes.
- Pages artifacts contain no tests, memory, tokens, or development-only files.
- Layout is usable at 320px, 768px, and 1440px without horizontal overflow.
- Primary navigation is keyboard accessible.
- Snake core behavior is deterministic under a supplied random source.
- Keyboard and touch adapters produce the same directional commands.
- Live deployment returns HTTP 200 for Home, Games, CSS, and JavaScript assets.

## Retry policy

- Deterministic unit failure: at most 3 minimal correction attempts per failure signature.
- Browser/layout failure: at most 2 attempts per viewport and signature.
- Deployment or environment failure: at most 2 attempts after classification.
- Network-only transient failure: one unchanged retry.
- Same code/input failure observed in any of 10 repetitions is classified as flaky and must be fixed, not retried to GREEN.

## Human-in-the-loop conditions

- A requirement admits multiple materially different interpretations.
- Personal content, factual claims, contact details, custom domain, analytics, or third-party services are proposed.
- A new dependency, framework, architectural replacement, or destructive Git operation is required.
- A failure cannot be reproduced or classified within the retry budget.
- A fix would span multiple layers or reduce an acceptance criterion.
- A token or private value may have been exposed.

## Execution record template

```text
Loop ID / objective:
Starting commit / branch:
Authorization:
RED command / expected failure:
Observed signature / exit code:
Classification / reasoning:
Minimal correction:
Retry number / limit:
Targeted test / full suite / build:
Secret and diff checks:
Commit / push / deployment run:
Live smoke test:
Final state: GREEN | STOPPED | HITL
Remaining risk / next smallest loop:
```
