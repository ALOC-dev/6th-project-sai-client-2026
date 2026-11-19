This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

```bash
npx expo install <package>  # use for Expo/React Native packages — resolves SDK-compatible versions (see 팀 규약 §4)
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `npx eas-cli@latest <command>`; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

---

# 팀 규약 (사이 클라이언트)

> 두 사람(성호·다은)이 각자 AI 에이전트로 작업할 때 서로의 코드와 충돌하지 않게 하는 규칙이다.
> 규칙과 다르게 해야 하거나 `TODO(합의)` 항목을 결정해야 하면, 혼자 정하지 말고 멈춘 뒤 사용자에게 묻는다.

## 1. 작업 범위와 파일 오너

- 작업자(성호/다은)는 프로젝트 루트의 `CLAUDE.local.md`(커밋 안 함)에 `작업자: 성호`처럼 적는다. 없으면 사용자에게 묻는다.
- 오너는 **도메인 단위**로 정한다. 파일 이름·폴더에 도메인이 들어가거나 그 도메인 기능에서만 쓰이는 파일은 그 도메인 담당이 오너다. 어느 도메인에도 속하지 않는 새 파일은 만든 사람이 오너다. 이 원칙으로 정할 수 없는 기존 파일은 1-3에 적는다.
- **자기 오너가 아닌 파일(공동 파일 포함)을 수정·이동·삭제하기 전에는 멈추고**, 무엇을 왜 바꿀지 사용자에게 알린다. 사용자가 상대 승인을 받았다고 하면 진행한다.
- 상대 도메인의 파일·폴더는 새로 만들지 않는다.
- 이 문서의 파일·함수 중 아직 없는 것은 **예정**이다. 그 기능이 필요해질 때 오너가 만든다. 상대 오너의 예정 파일이 필요하면 2장의 임시 구현 규칙을 따른다.
- 2장 인터페이스의 이름·시그니처·반환 형태는 자기 파일이라도 승인 없이 바꾸지 않는다.

### 1-1. 도메인과 담당

도메인 이름은 `components/<도메인>/`, `api/<도메인>.ts`, 쿼리 키에 같은 이름으로 쓴다. 기존 `types/friend.ts`·`types/user.ts`는 예외다.
파일 이름: 컴포넌트는 PascalCase(`FriendRow.tsx`), 훅·API·유틸은 camelCase(`useFriends.ts`).

| 담당 | 도메인                                                                                                         |
| ---- | -------------------------------------------------------------------------------------------------------------- |
| 성호 | `auth`(로그인·가입·초기 설정), `mypage`(회원 설정·프로필), `timetable`(시간표·공강), `friends`(친구·요청·초대) |
| 다은 | `home`, `chat`(채팅), `appointments`(약속), `recommendation`(추천), `notification`(알림·푸시·찌르기)           |

- `notification` 폴더 이름(단수/복수): TODO(합의)

### 1-2. 폴더 구조

```
src/
├─ app/                라우트만. 화면 로직은 components/·hooks/로
│  ├─ (auth)/          로그인 전 화면
│  ├─ (tabs)/          하단 탭 화면
│  └─ <경로>/          탭 밖 상세 화면 (chat/[chatRoomId] 등, 1-4)
├─ components/
│  ├─ common/          공용 UI
│  └─ <도메인>/
├─ hooks/              TanStack Query 훅
├─ api/
│  ├─ client.ts        공용 요청 (baseURL, 인증 헤더, 401 재발급)
│  ├─ queryKeys.ts     쿼리 키 상수
│  ├─ <도메인>.ts      API 함수
│  └─ mocks/<도메인>.ts
├─ constants/theme.ts  디자인 토큰
├─ types/              공용 타입 4개만 (common, user, timetable, friend)
└─ utils/              date.ts, freeTime.ts …
```

### 1-3. 도메인으로 정할 수 없는 파일

| 파일                                                                                                   | 오너 | 비고                                                                     |
| ------------------------------------------------------------------------------------------------------ | ---- | ------------------------------------------------------------------------ |
| `src/app/_layout.tsx`                                                                                  | 성호 |                                                                          |
| `src/app/(tabs)/_layout.tsx`                                                                           | 다은 |                                                                          |
| `src/constants/theme.ts`, `src/components/common/*`                                                    | 다은 | `Input`, `Select`, `Dialog`는 성호                                       |
| `src/api/client.ts`, `src/types/*`, `src/utils/date.ts`, `src/utils/freeTime.ts`, `src/hooks/useMe.ts` | 성호 |                                                                          |
| `src/api/queryKeys.ts`                                                                                 | 공동 | 자기 도메인 블록은 승인 없이 수정                                        |
| `package.json`, `package-lock.json`, `app.json`, `.env.example`                                        | 공동 | `app.json`: 카카오·보안 저장소·이미지 선택·초대 링크 = 성호, 푸시 = 다은 |

### 1-4. 라우트

`typedRoutes`가 켜져 있어 경로가 바뀌면 상대 코드가 깨진다. `src/app/` 파일의 이름 변경·이동·삭제는 승인을 받는다. 라우트 파라미터 이름은 API 명세의 경로 파라미터 이름을 그대로 쓴다.

| 경로                      | 오너 | 참조하는 쪽                |
| ------------------------- | ---- | -------------------------- |
| `/chat/[chatRoomId]`      | 다은 | 성호 (친구 목록 채팅 버튼) |
| `/settings/notifications` | 다은 | 성호 (마이페이지 링크)     |
| `/invite/[friendCode]`    | 성호 | 딥링크                     |
| `/friends/[friendId]`     | 성호 | 다은 (필요 시)             |

- 다은 브랜치 `_layout.tsx`의 `chat/[id]` 등록: TODO(합의) (`chat/[chatRoomId]`로 맞출지 확인)

## 2. 도메인 간 인터페이스

상대 도메인의 데이터·기능은 아래 함수로만 쓰고, 같은 기능을 직접 구현하지 않는다. 아직 없으면 사용자에게 알리고, 급하면 자기 파일에 같은 시그니처의 임시 구현을 두고 `// TODO: <상대 함수>로 교체`를 남긴다.

| 성호 → 다은                                     | 위치                    | 설명                                                  |
| ----------------------------------------------- | ----------------------- | ----------------------------------------------------- |
| `useMe()`                                       | `hooks/useMe.ts`        | 내 정보                                               |
| `useMyTodayClasses()`                           | `hooks/useTimetable.ts` | 내 오늘 수업                                          |
| `getFreeStatus(todayClasses, now)`              | `utils/freeTime.ts`     | 공강 여부·다음 수업·남은 시간. **공강 계산은 이것만** |
| `useFriends()`, `useFreeFriendsNow()`           | `hooks/useFriends.ts`   | 친구 목록, 지금 공강인 친구                           |
| `respondFriendRequest(friendRequestId, accept)` | `api/friends.ts`        | 알림의 `referenceId`를 그대로 넘긴다                  |
| 인증 토큰 조회·재발급 구독                      | `TODO(합의)`            | 채팅 웹소켓용                                         |

| 다은 → 성호                              | 위치                  | 설명                                    |
| ---------------------------------------- | --------------------- | --------------------------------------- |
| `openDirectChat(friendId)`               | `TODO(합의)`          | 1:1 방 조회/생성 후 채팅방으로 이동     |
| `pokeFriend(friendId)`                   | `api/notification.ts` | 찌르기                                  |
| `getPushToken()`, `registerPushDevice()` | `utils/push.ts`       | 로그아웃 때 토큰 전달, 로그인 직후 등록 |

## 3. 데이터·API

- 흐름: **화면 → 훅(`hooks/`) → API 함수(`api/<도메인>.ts`) → 목 또는 `client.ts`**. 화면에서 `fetch`·`client`·토큰을 직접 다루지 않는다.
- `client` 경로는 `/api/v1` 뒷부분만 쓴다 (`client.get('/friends')`).
- API 함수는 지금은 `api/mocks/<도메인>.ts`의 목을 반환하고, 서버가 생기면 함수 안만 바꾼다. 목은 명세의 응답 형태를 그대로 따른다.
- 서버 데이터는 TanStack Query로 불러온다. 쿼리 키는 `api/queryKeys.ts`의 도메인별 상수만 쓰고, 첫 요소는 도메인 이름이다. 다른 도메인 데이터를 바꾸면 그 도메인 키로 무효화한다. `QueryClientProvider`는 `src/app/_layout.tsx`에 한 번만 둔다.
- TanStack Query 초기 세팅(패키지 설치, Provider, `queryKeys.ts` 생성) 담당: TODO(합의)
- 타입은 노션 API 명세 기준. `src/types/`에는 기존 네 파일만 두고, 나머지는 그 기능 파일 안에 정의한다. 이미 있는 타입은 다시 정의하지 말고 import한다.
- 서버 일시(`LocalDateTime`)는 시간대 없는 KST 값이다. `new Date(서버문자열)` 대신 `utils/date.ts`로만 파싱한다.

## 4. 의존성·환경 변수

- 패키지 매니저는 npm. Expo·RN 패키지는 `npx expo install`, 그 외는 `npm install`.
- **새 의존성은 추가 전에 사용자에게 확인받는다.** 네이티브 모듈을 추가했으면 결과에 "개발 빌드 필요"라고 적는다.
- `package-lock.json` 충돌은 손으로 고치지 말고 `npm install`로 다시 만든다.
- 새 환경 변수는 같은 PR에서 `.env.example`에 추가한다. `EXPO_PUBLIC_` 변수는 앱 번들에 포함되므로 비밀 키를 넣지 않는다.

## 5. UI

- 색·타이포·간격은 `theme.ts` 토큰만 쓴다.
- `components/common/`에 있는 역할의 컴포넌트를 새로 만들지 않는다. 여러 도메인에서 쓸 새 공용 UI가 필요하면 만들지 말고 알린다.
- 바텀시트 구현 라이브러리: `TODO(합의)`.

## 6. Git

- 브랜치 `feat/기능명` 등 → `main`으로 PR. 커밋 메시지 `feat|fix|refactor|test|docs|chore: 한글 설명`.
- **에이전트는 사용자가 요청할 때만 커밋·푸시한다.**
- PR은 기능 하나 단위로 작게. 작업 전과 PR 전에 `git fetch` 후 `git rebase origin/main`.
- 상대 오너 파일·공동 파일의 충돌은 해결하지 말고, 양쪽 변경을 보여 주고 멈춘다.
- 상대 오너 파일을 건드린 PR은 설명에 그 파일과 이유를 적는다.
- 머지 규칙(상대 Approve + CI 통과, Squash and merge, 브랜치 보호): TODO(합의)

### 규약 변경

- `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`은 공동 파일이다. 에이전트는 작업 중에 직접 고치지 않는다.
- 규약이 실제 코드·API 명세와 다르거나, 규약대로 하면 상대 코드가 깨지면 **어느 쪽도 임의로 맞추지 말고** 사용자에게 알린다.
- API 명세가 우선이다. 합의 전까지는 현재 규약을 따른다.
- 변경은 기능 PR과 섞지 않고 `docs:` PR로 올려 두 사람이 동의한 뒤 머지한다.

## 7. 작업 마무리

- `npx expo lint`, `npx tsc --noEmit`, `npm run format:check`를 통과시킨다.
- 결과 보고에 포함: 자기 오너가 아닌 파일 수정 여부, 새 의존성·네이티브 모듈, 임시 구현으로 대신한 상대 인터페이스.
