# 프로젝트 운영 메모리 — 프로페셔널 정적 웹사이트

## 목표

- GitHub Pages에서 제공되는 개인 프로페셔널 웹사이트를 완성하고 최초 배포한다.
- 데스크톱과 모바일에 반응하는 정적 HTML, CSS, JavaScript 웹사이트를 만든다.
- 상단 내비게이션에 Games 탭을 제공한다.
- 키보드와 모바일 터치로 조작 가능한 지렁이(Snake) 게임을 제공한다.
- Step 1의 `[게임 추가 기능:]`은 별도 요구사항이 확인되지 않았다. 확인 전까지 점수, 시작/일시정지/재시작, 키보드·터치 조작 범위만 적용한다. 추가 요구가 제공되면 게임 루프와 수용 기준에 반영한다.

## 필수 산출물

- 프로젝트 루트의 `index.html`
- 프로젝트 루트의 `styles.css`
- 프로젝트 루트의 `script.js`
- 필요한 경우 별도 `game.js`
- 필요한 이미지와 정적 assets
- `AORR.md`
- `MEMORY.md`

> 현재 저장소는 CSS와 게임 JavaScript를 하위 폴더에 두고 있다. 최종 deliverable의 루트 파일 계약을 만족할 방법(루트 파일 배치 또는 정적 build 산출물 정책)은 구현 루프에서 명시적으로 검증한다.

## 현재 범위

- 정적 HTML, CSS, JavaScript만 사용
- 승인된 프로페셔널 웹사이트 콘텐츠
- 반응형 레이아웃
- Games 탭
- 지렁이 게임
- GitHub Pages 배포

## 범위 제외

- 백엔드 서버
- 데이터베이스
- 로그인 및 회원가입
- 결제
- 사용자 개인정보 수집
- 별도 승인 없는 외부 API 또는 외부 서비스
- 별도 승인 없는 프레임워크 전환

## 현재 상태

| 항목 | 상태 |
|---|---|
| 현재 상태 | `HITL_REQUIRED` — 정적 사이트·게임 로직·build 검증은 통과했으나, 이 환경의 브라우저 DOM/Console 검증 채널이 localhost에서 시간 초과되어 반응형과 실제 게임 UI 수용 기준을 자동 확인할 수 없음. |
| 완료한 루프 | AORR 상태 머신 및 Verifier 중심 Self-Correcting TDD 설계 문서화; V1 루트 계약 완료; 최고 점수 저장/정적 게임 검증 루프 완료. |
| 다음 루프 | [사람 확인 필요] 브라우저에서 375px·768px·1440px 레이아웃과 Games의 키보드/터치 조작을 수동 확인하거나, localhost Console 검증이 가능한 브라우저 환경을 제공한다. |
| 현재 Retry 횟수 | 0 |
| 현재 오류 fingerprint | `ENVIRONMENT|browser CDP|127.0.0.1:8765|Page.navigate/Runtime.evaluate timed out` |
| Blocker | 로컬 페이지로 연결된 in-app browser의 DOM/Console 명령 시간 초과. 브라우저 반응형·실제 게임 조작 검증이 [사람 확인 필요]. |
| 마지막 정상 상태 | 루트 파일·HTML 연결·`npm test` 13/13 통과, build artifact 계약과 JavaScript 문법 검사 통과. |

## 가드레일

- 기존 개인 콘텐츠를 임의로 삭제하지 않는다.
- 확인되지 않은 경력, 프로젝트, 수치, 연락처 정보를 생성하지 않는다.
- 테스트를 삭제하거나 통과를 위해 검증 기준을 완화하지 않는다.
- 토큰 값을 출력하지 않는다.
- 토큰을 HTML, CSS, JavaScript, 문서, build artifact에 저장하지 않는다.
- 토큰을 Git에 커밋하지 않는다.
- `github_token.txt`를 Git에 커밋하지 않는다.
- `env_settings.txt`를 Git에 커밋하지 않는다.
- 백엔드 기능을 추가하지 않는다.
- 요구사항과 무관한 대규모 리팩토링을 하지 않는다.
- 테스트를 통과시키기 위해 기능을 제거하지 않는다.
- GitHub 인증이 필요해도 토큰은 프로세스 내에서만 비노출 방식으로 사용하며 실행 기록에 남기지 않는다.

## 수용 기준

- 루트 `index.html`이 존재한다.
- 가능한 로컬 정적 서버에서 정상 로드된다.
- CSS와 JavaScript가 HTTP 오류 없이 정상 로드된다.
- 브라우저 Console 오류가 없다.
- 모바일과 데스크톱에서 레이아웃이 정상이며 가로 스크롤이 없다.
- Games 탭이 정상 목적지로 이동한다.
- 지렁이 게임이 시작, 일시정지, 재시작을 정상 수행한다.
- 키보드 Arrow 키 또는 WASD 조작이 정상 동작한다.
- 모바일 터치 버튼 또는 스와이프 조작이 정상 동작한다.
- 음식 생성, 점수 증가, 벽/자기 몸 충돌, 재시작이 정상 동작한다.
- 즉시 반대 방향 전환이 방지되고 Games 재진입 후 중복 실행이 없다.
- GitHub Pages에서 Home, Games 및 정적 자산이 HTTP 200을 반환한다.
- 배포된 사이트에서도 위 레이아웃과 게임 기능이 동일하게 정상 동작한다.

## 재시도 정책

- 오류 하나당 최대 3회만 재시도한다.
- 같은 정규화 오류 fingerprint가 2회 반복되면 즉시 중지하고 `BLOCKED`로 전환한다.
- 한 Retry에는 하나의 실패 원인만 수정한다.
- 관련된 최소 파일만 변경하고, 수정 후 같은 Verifier를 다시 실행한다.
- 대상 Verifier 통과 후 기존에 통과한 기능의 회귀 테스트를 실행한다.
- 환경·권한 오류는 코드 수정으로 해결하려 하지 않는다.

## 사람 확인 필요 조건

다음 경우에는 `HITL_REQUIRED`로 전환하고 무단 변경하지 않는다.

- 이름, 소개, 경력, 프로젝트, 연락처 등 개인 프로필 내용이 불명확함
- 기존 콘텐츠를 삭제하거나 대체해야 함
- 요구사항이 충돌함
- GitHub 저장소 쓰기 권한이 부족함
- GitHub Pages 설정 변경이 필요함
- 외부 서비스, 분석 도구, API, CDN 등을 추가해야 함
- Retry 한계 또는 동일 fingerprint 반복에 도달함

## 도구 정책

- Codex는 작업 제어, 파일 수정, 테스트 실행, 결과 기록을 담당한다.
- 가능하면 Claude Code CLI를 독립적인 읽기 전용 Verifier로 사용한다.
- Claude Code CLI를 실제 사용한 경우 명령, exit code, 실제 반환된 Claude 모델명을 실행 기록에 남긴다.
- Sonnet 5는 실제 반환된 model ID로 사용 가능함이 확인된 경우에만 사용으로 기록한다. 현재 가용성은 미확인이다.
- 토큰 값은 어떤 실행 기록, Console 출력, 문서, 코드, Git commit에도 남기지 않는다.
- Claude의 결과는 결정적 테스트나 브라우저 관찰로 재현되기 전까지 조언으로만 취급한다.

## 실행 기록 양식

```text
루프 ID:
시작 시각:
목표:
시작 상태:
가설:
수행 작업:
변경 파일:
검증 도구:
테스트 결과:
exit code:
오류 fingerprint:
실패 분류:
재시도 횟수:
Claude 실제 모델명(사용한 경우):
종료 상태: PASSED | RETRYING | BLOCKED | HITL_REQUIRED | DEPLOY_READY | DEPLOYING | DEPLOYED
다음 작업:
사람 확인 필요 항목:
```

```text
Loop ID: V1 resume -- environment blocker resolved and same verifier rerun
Start time: 2026-07-14 14:29:00 +09:00
Goal: Reclassify the local environment failure and complete V1 local static-site acceptance checks.
Start state: BLOCKED
Hypothesis: The previous localhost failure was caused by the sandboxed process being unable to spawn the WindowsApps Python target, and npm/node failures were caused by the current session PATH missing C:\Program Files\nodejs.
Actions: Re-ran root file and HTML-link checks. Located Node at C:\Program Files\nodejs and ran npm test/build with that path prepended for the command. Re-ran the same Python http.server verifier through an approved unsandboxed execution because py -3.9 could not spawn its WindowsApps python3.9.exe target inside the sandbox.
Changed files: MEMORY.md
Verifier: root file/HTML link checks, npm test, npm run build, git diff --check, py -3.9 -m http.server + localhost HTTP requests
Test results: root files and viewport/CSS/JS/Games links PASS. npm test 11/11 PASS. npm run build PASS and emitted dist/. git diff --check PASS with CRLF warnings only. localhost HTTP requests PASS: HTTP 200 for /, /styles.css, /script.js, and /games/.
Exit code: root/HTML checks 0; npm test 0; npm run build 0; git diff --check 0; Python server/HTTP verifier 0
Error fingerprint: none for final verifier. Prior sandbox-only fingerprints: ENVIRONMENT|python|WindowsApps python3.9.exe|unable to create process; ENVIRONMENT|node/npm|PATH missing C:\Program Files\nodejs.
Failure classification: RESOLVED_ENVIRONMENT
Retry count: code retry 0. Environment execution method corrected only.
Claude actual model name if used: not used.
End state: PASSED
Next action: V1 local acceptance is complete. Proceed to V2 HTML contract or deployment readiness only after confirming the intended GitHub origin.
Human confirmation needed: Confirm final origin is https://github.com/hyerim92lee-hub/hyerim92lee-hub.github.io.git and why it differs from the previously referenced repository.
```

## 운영 원칙

- 모든 구현은 `READY → ACTING → VERIFYING → PASSED`의 작은 루프로 진행한다.
- 실패 시 `RETRYING`으로 전환하고, 증거가 부족하거나 환경/권한 문제이면 `BLOCKED` 또는 `HITL_REQUIRED`로 전환한다.
- 배포는 모든 로컬 수용 기준, 회귀 기준, secret 보호 확인 후에만 `DEPLOY_READY → DEPLOYING → DEPLOYED`로 진행한다.

## 실행 기록

```text
루프 ID: V1 — 루트 정적 진입 파일 및 연결 계약
시작 시각: 2026-07-14 14:05:44 +09:00
목표: GitHub Pages용 정적 웹사이트의 가장 안전한 기본 구조를 만들고, 루트 index.html/styles.css/script.js 계약을 연결한다.
시작 상태: READY
가설: 기존 assets 스타일을 root styles.css에서 import하고 root script.js를 defer로 연결하면 기존 콘텐츠를 보존하면서 배포 루트 계약을 충족할 수 있다.
수행 작업: root styles.css와 script.js 생성; index.html의 stylesheet/script 연결; build의 root asset 복사; 해당 기존 테스트 계약 확장.
변경 파일: index.html, styles.css, script.js, scripts/build.mjs, tests/site-shell.test.mjs, tests/build.test.mjs, MEMORY.md
Verifier: Test-Path, HTML 연결 문자열 검사, git diff --check, npm test, python -m http.server + HTTP 요청
테스트 결과: 파일 존재/viewport/CSS/JS/Games 링크 및 git diff --check PASS. npm test는 npm 실행 파일 부재로 실행 불가. 로컬 HTTP는 Python 실행 불가로 미검증.
exit code: 정적 파일/연결 검사 0; npm test 명령 검색 실패; Python server/HTTP 검사 1
오류 fingerprint: ENVIRONMENT|npm test|npm:N/A|CommandNotFoundException; ENVIRONMENT|python -m http.server|python:N/A|file cannot be accessed by the system
실패 분류: ENVIRONMENT
재시도 횟수: 0 (동일 verifier 재시도 및 코드 재수정 없음)
Claude 실제 모델명(사용한 경우): 사용하지 않음 — 이번 환경 실패와 무관하며 모델 호출을 추가하지 않음.
종료 상태: BLOCKED
다음 작업: [사람 확인 필요] Node.js/npm 및 Python runtime을 사용할 수 있는 환경을 제공하거나 경로를 복구한 뒤, 동일 V1 verifier를 재실행한다.
사람 확인 필요 항목: 현재 origin은 hyerim92lee-hub/hyerim92lee-hub.github.io.git로 관찰되었으며, 이전에 지정된 hyerim92lee-hub/loop-engineering.git와 다른지 확인 필요.
```

```text
루프 ID: V1 재개 — 환경 복구 후 동일 verifier 재실행
시작 시각: 2026-07-14 14:20:18 +09:00
목표: 환경 blocker를 재검증하고 V1의 로컬 정적 사이트 수용 기준을 완료한다.
시작 상태: BLOCKED
가설: Node.js 설치 경로를 현재 세션 PATH에 추가하고 실제 Python 실행 파일을 사용하면 이전 환경 blocker를 해소할 수 있다.
수행 작업: 코드 변경 없이 동일 V1 verifier를 재실행했다. PowerShell 실행 정책을 우회하기 위해 npm.cmd를 명시했고, Python 3.9 실제 실행 파일을 사용했다.
변경 파일: MEMORY.md
Verifier: root 파일/HTML 연결 검사, npm.cmd test, git diff --check, Python http.server + localhost HTTP 요청
테스트 결과: root 파일과 viewport/CSS/JS/Games 링크 PASS. npm test 11/11 PASS. build artifact test PASS. git diff --check PASS. localhost HTTP 요청은 시간 초과.
exit code: npm test 0; git diff --check 0; Python server/HTTP verifier 1
오류 fingerprint: ENVIRONMENT|local HTTP|127.0.0.1:8765|request timed out
실패 분류: ENVIRONMENT
재시도 횟수: 코드 수정 0회. 환경 명령 실행 방식만 교정했으며, 앱 코드 재시도는 하지 않음.
Claude 실제 모델명(사용한 경우): 사용하지 않음 — 결정적 테스트 결과가 존재하며 Claude 호출은 환경 blocker를 해결하지 않음.
종료 상태: BLOCKED
다음 작업: [사람 확인 필요] localhost loopback HTTP 차단 또는 서버 프로세스 정책을 확인하고, 가능한 환경에서 동일 로컬 HTTP verifier를 재실행한다.
사람 확인 필요 항목: 최종 origin이 hyerim92lee-hub/hyerim92lee-hub.github.io.git인지, 이전 지정 저장소와 다른 이유가 있는지 확인 필요.
```

```text
루프 ID: V1 완료 — 로컬 정적 HTTP verifier 재실행
시작 시각: 2026-07-14 14:33:34 +09:00
목표: V1의 남은 로컬 정적 서버 수용 기준을 확인하고 루프를 종료한다.
시작 상태: BLOCKED
가설: 환경 문제 해소 후 실제 Python runtime으로 정적 서버를 시작하면 Home과 정적 자산을 HTTP 200으로 확인할 수 있다.
수행 작업: 코드 변경 없이 Python 3.9 정적 서버를 시작하고 localhost 응답을 확인한 뒤, 전체 테스트와 diff verifier를 재실행했다.
변경 파일: MEMORY.md
Verifier: Python http.server + /, /styles.css, /script.js, /assets/styles.css HTTP 요청; npm.cmd test; git diff --check
테스트 결과: HTTP 200 4/4 PASS; npm test 11/11 PASS; git diff --check PASS.
exit code: 0
오류 fingerprint: 없음 (N/A)
실패 분류: 없음
재시도 횟수: 0 (코드 변경 없이 환경 복구 후 동일 verifier 완료)
Claude 실제 모델명(사용한 경우): 사용하지 않음 — 결정적 verifier가 충분히 통과함.
종료 상태: PASSED
다음 작업: V2 HTML 계약 검증 또는 개인 프로필 콘텐츠 확정이 필요한 경우 HITL로 전환.
사람 확인 필요 항목: 최종 origin 저장소와 개인 프로필 콘텐츠의 승인 여부.
```

```text
루프 ID: V2–V6 — 정적 프로필/게임 완성도 및 최고 점수 저장
시작 시각: 2026-07-14 14:42:16 +09:00
목표: 기존 콘텐츠와 게임 구조를 보존하며, 지렁이 게임의 최고 점수 저장과 정적 GitHub Pages 계약을 보강한다.
시작 상태: PASSED
가설: 최고 점수 저장을 순수 모듈로 분리하고 storage 실패를 무시하면 게임을 중단하지 않고 최고 점수를 유지할 수 있다.
수행 작업: assets/score-store.js 추가; games/game.js에 최고 점수 복원/저장 연결; 해당 단위 테스트와 Games 페이지의 Best 점수 계약을 추가했다.
변경 파일: assets/score-store.js, games/game.js, tests/score-store.test.mjs, tests/game-page.test.mjs, MEMORY.md
Verifier: node --check script.js/games/game.js; npm test; npm run build; git diff --check; 로컬 HTTP; in-app browser DOM/Console
테스트 결과: 문법 검사 PASS; npm test 13/13 PASS; npm run build PASS; git diff --check PASS. root HTML/CSS/JS HTTP 응답은 확인했으나 browser CDP와 일부 asset HTTP 관찰은 시간 초과.
exit code: 정적 verifier 0; browser/local asset 관찰 환경 오류
오류 fingerprint: ENVIRONMENT|browser CDP|127.0.0.1:8765|Page.navigate/Runtime.evaluate timed out
실패 분류: ENVIRONMENT
재시도 횟수: 코드 원인 retry 0회. 브라우저 연결 방식 확인 후에도 동일 관찰 채널이 시간 초과되어 중지.
Claude 실제 모델명(사용한 경우): 사용하지 않음 — Claude CLI 모델 가용성은 실제 호출로 확인하지 않았고 결정적 Node verifier를 우선했다.
종료 상태: HITL_REQUIRED
다음 작업: [사람 확인 필요] 실제 브라우저에서 375px/768px/1440px 및 Games의 키보드·버튼·스와이프·pause/restart·중복 루프를 확인한다.
사람 확인 필요 항목: 개인 프로필 콘텐츠의 사실성, 브라우저 Console/반응형 수동 검증, GitHub Pages 최초 배포 승인.
```

### P1 실행 기록

- 2026-07-14 15:23:12 +09:00: Profile/Experience/Projects/Contact 구조, 밝은 SaaS UI, 모바일 메뉴, hyerim92lee-hub GitHub 링크를 구현했다.
- 검증: npm test 13/13 PASS, build PASS, JavaScript syntax PASS, diff PASS, 기존 Daniel 링크 0, 새 GitHub 링크 5.
- 테스트 retry: nav 속성 순서에 의존한 assertion을 aria-label 존재 계약으로 최소 수정한 뒤 GREEN.
- 상태: HITL_REQUIRED — 실제 이름, 직함/전문 분야, 자기소개, 경력, 프로젝트, 공개 이메일/연락처와 브라우저 반응형/Console 수동 확인이 필요하다.

```text
루프 ID: V7 — 로컬 파일 Games 내비게이션 경로 수정
시작 시각: 2026-07-14 14:46:59 +09:00
목표: file://로 열린 Home에서 Games를 선택해도 폴더 목록이 아닌 게임 페이지가 열리도록 한다.
시작 상태: HITL_REQUIRED
가설: 폴더 URL인 games/와 ../을 index.html이 명시된 상대 경로로 바꾸면 로컬 파일 브라우저와 GitHub Pages 모두에서 페이지 탐색이 가능하다.
수행 작업: Home과 Games 페이지의 내부 페이지 링크를 index.html이 명시된 상대 경로로 교체하고 기존 내비게이션 테스트 계약을 갱신했다.
변경 파일: index.html, games/index.html, tests/navigation.test.mjs, MEMORY.md
Verifier: npm test; npm run build; git diff --check
테스트 결과: npm test 13/13 PASS; npm run build PASS; git diff --check PASS.
exit code: 0
오류 fingerprint: HTML_STRUCTURE|file navigation|games/|directory listing instead of game document
실패 분류: HTML_STRUCTURE
재시도 횟수: 1회 수정 후 통과
Claude 실제 모델명(사용한 경우): 사용하지 않음
종료 상태: PASSED
다음 작업: 브라우저에서 Games 링크와 키보드/터치 게임 조작을 확인한다.
사람 확인 필요 항목: 브라우저 Console 및 반응형 수동 검증, GitHub Pages 최초 배포 승인.
```

```text
루프 ID: D1 — GitHub Pages 최초 배포
시작 시각: 2026-07-14
목표: hyerim92lee-hub.github.io에 검증된 정적 웹사이트를 게시한다.
시작 상태: DEPLOYING
가설: GitHub Pages workflow가 main push의 정적 build artifact를 게시한다.
수행 작업: 원격의 별도 README 이력을 사용자 승인에 따라 force-with-lease로 로컬 사이트 이력으로 교체하고 public URL을 확인했다.
변경 파일: MEMORY.md
Verifier: npm run check, git diff --check, 비밀 파일 추적/패턴 검사, 공개 HTTP 요청
테스트 결과: npm test 13/13 PASS; build PASS; 공개 Home, Games, styles.css, script.js, game.js, input.js, snake-core.js, score-store.js 모두 HTTP 200.
exit code: 0
오류 fingerprint: 초기 일반 push의 non-fast-forward 및 shallow-history 거절은 force-with-lease와 전체 이력 fetch 후 해결됨.
실패 분류: DEPLOYMENT
재시도 횟수: 인증 형식과 얕은 Git 이력 원인을 분리해 최소 수정 후 성공.
Claude 실제 모델명(사용한 경우): 사용하지 않음
종료 상태: DEPLOYED
다음 작업: [사람 확인 필요] 공개 사이트에서 375px/768px/1440px, Console, 키보드 및 모바일 터치 조작을 최종 수동 검증한다.
사람 확인 필요 항목: 개인 프로필 콘텐츠 사실성 및 공개 브라우저 UX 최종 검증.
```
