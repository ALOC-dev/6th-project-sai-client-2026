This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # use for Expo/React Native packages — resolves SDK-compatible versions (see 팀 규약 §4)
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

---

# 팀 규약 (사이 클라이언트)

> 두 사람(성호·다은)이 각자 AI 에이전트로 작업할 때 **서로의 코드와 충돌하지 않게** 하는 규칙이다.
> 규칙과 다르게 해야 할 것 같으면 **임의로 진행하지 말고 멈춘 뒤 사용자에게 묻는다.**
> `TODO(합의)` 표시는 아직 정하지 않은 항목이다. 에이전트는 이 항목에 해당하는 결정을 혼자 내리지 않는다.
> 기계적으로 막을 수 있는 규칙은 `.claude/settings.json`에 있다. 거기에 막히면 **다른 방법으로 우회하지 말고** 사용자에게 묻는다.

## 1. 작업 범위와 파일 오너

### 1-1. 기본 규칙

- 작업을 시작하면 먼저 **이번 작업자가 누구인지(성호/다은)** 확인한다. 각자 프로젝트 루트의 `CLAUDE.local.md`(커밋하지 않음)에 `작업자: 성호`처럼 적어 두고, 에이전트는 그 값을 따른다. 파일이 없거나 값이 없으면 사용자에게 묻는다.
- **자기 오너가 아닌 파일(공동 파일 포함)을 수정·이동·삭제하려면 상대의 승인을 받아야 한다.** 에이전트는 이런 수정을 하기 전에 멈추고, 어떤 파일을 무엇 때문에 어떻게 바꿀지 사용자에게 알린다. 사용자가 상대 승인을 받았다고 하면 진행한다.
- 상대 도메인 파일(아래 1-2의 도메인 이름이 들어간 파일·폴더)은 새로 만들지 않는다.

### 1-2. 도메인과 담당

| 담당 | 도메인 (파일 이름에 쓰는 이름)                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| 성호 | `auth`(로그인), `user`(회원 설정·마이페이지·프로필), `timetable`(시간표·공강), `friend`(친구·친구 요청·초대) |
| 다은 | `chat`(채팅), `plan`(약속), `recommend`(활동 추천), `home`(홈), `notification`(알림·푸시·찌르기·알림설정)    |

### 1-3. 폴더 구조

폴더는 **종류별**로 나누고, 도메인은 파일 이름(또는 하위 폴더)으로 구분한다.

<!-- TODO(합의): 다은이 화면 구조를 확정·커밋하면 src/app 부분을 갱신 -->

```
src/
├─ app/                    라우트만 둔다 (Expo Router). 화면 로직은 components/·hooks/로 뺀다
├─ components/
│  ├─ ui/                  공용 UI (Button, Text, Input, BottomSheet, Icon …)
│  └─ <도메인>/            도메인 전용 컴포넌트 (예: components/friend/FriendRow.tsx)
├─ hooks/                  TanStack Query 훅 등 (예: hooks/useFriends.ts)
├─ api/
│  ├─ client.ts            공용 요청 함수 (baseURL, 인증 헤더, 401 재발급)
│  ├─ <도메인>.ts          API 호출 함수 (예: api/friend.ts → getFriends())
│  └─ mocks/<도메인>.ts    목 데이터
├─ constants/theme.ts      디자인 토큰
├─ types/<도메인>.ts       요청·응답 타입 (노션 API 명세 기준)
└─ utils/                  순수 함수 (date.ts, freeTime.ts …)
```

### 1-4. 파일 이름

- **컴포넌트 파일은 PascalCase**: `FriendList.tsx`, `BottomSheet.tsx`
- 훅·API·유틸·타입 파일은 camelCase: `useFriends.ts`, `friend.ts`, `freeTime.ts`
- `src/app/` 라우트 파일은 URL이 되므로 소문자 그대로 둔다: `timetable.tsx`, `chat/[roomId].tsx`

### 1-5. 공동 파일과 오너

| 파일                                                            | 오너 | 비고                                                                            |
| --------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------- |
| `src/app/_layout.tsx`                                           | 성호 | 뼈대(그룹·빈 화면 파일)는 다은이 먼저 만들어 머지                               |
| `src/app/(tabs)/_layout.tsx`                                    | 다은 | 탭 순서·아이콘·라벨                                                             |
| `src/constants/theme.ts`                                        | 다은 |                                                                                 |
| `src/components/ui/*`                                           | 다은 | `Input`, `Select`, `Dialog`는 성호                                              |
| `src/api/client.ts`                                             | 성호 |                                                                                 |
| `src/types/common.ts`                                           | 성호 | 도메인 타입 파일은 그 도메인 담당이 오너                                        |
| `src/utils/date.ts`, `src/utils/freeTime.ts`                    | 성호 |                                                                                 |
| `package.json`, `package-lock.json`, `app.json`, `.env.example` | 공동 | `app.json`: 카카오 로그인·보안 저장소·이미지 선택·초대 링크 = 성호, 푸시 = 다은 |

### 1-6. 라우트 경로

`typedRoutes`가 켜져 있어서 경로가 바뀌면 상대 코드가 타입 에러로 깨진다.

- `src/app/` 아래 파일의 이름 변경·이동·삭제는 1-1 규칙대로 상대 승인을 받는다. 새 화면은 자기 도메인 영역에 추가한다.
- 아래 경로는 상대가 참조한다.

| 경로                      | 오너 | 참조하는 쪽                |
| ------------------------- | ---- | -------------------------- |
| `/chat/[roomId]`          | 다은 | 성호 (친구 목록 채팅 버튼) |
| `/settings/notifications` | 다은 | 성호 (마이페이지 링크)     |
| `/invite/[friendCode]`    | 성호 | 딥링크                     |
| `/friends/[friendId]`     | 성호 | 다은 (필요 시)             |

<!-- TODO(합의): 다은 화면 구조 확정 후 목록 갱신 -->

## 2. 도메인 간 인터페이스

상대 도메인의 데이터·기능은 **아래 함수로만** 쓴다. 같은 기능을 직접 구현하지 않는다.

- 아직 구현되지 않은 함수가 필요하면 상대 파일을 만들지 말고 사용자에게 알린다. 임시로 필요하면 자기 파일 안에 같은 시그니처의 임시 구현을 두고 `// TODO: <상대 함수>로 교체`를 남긴다.
- 시그니처를 바꿔야 하면 1-1 규칙대로 상대 승인을 받는다.

### 성호 → 다은

| 이름                                            | 위치                    | 설명                                                                 |
| ----------------------------------------------- | ----------------------- | -------------------------------------------------------------------- |
| `useMe()`                                       | `hooks/useMe.ts`        | 내 정보                                                              |
| `useMyTodayClasses()`                           | `hooks/useTimetable.ts` | 내 오늘 수업 (`GET /timetables/me?today=true`)                       |
| `getFreeStatus(todayClasses, now)`              | `utils/freeTime.ts`     | 공강 여부·다음 수업·남은 시간. **공강 계산은 반드시 이 함수만 쓴다** |
| `useFriends()`                                  | `hooks/useFriends.ts`   | 친구 목록 + 오늘 수업                                                |
| `useFreeFriendsNow()`                           | `hooks/useFriends.ts`   | 지금 공강인 친구 (`GET /friends?available=true`)                     |
| `respondFriendRequest(friendRequestId, accept)` | `api/friend.ts`         | 알림의 `referenceId`를 그대로 넘긴다                                 |
| 인증 토큰 조회·재발급 구독                      | `TODO(합의)`            | 채팅 웹소켓 연결용                                                   |

### 다은 → 성호

| 이름                       | 위치                  | 설명                                        |
| -------------------------- | --------------------- | ------------------------------------------- |
| `openDirectChat(friendId)` | `TODO(합의)`          | 1:1 방 조회/생성 후 `/chat/[roomId]`로 이동 |
| `pokeFriend(friendId)`     | `api/notification.ts` | 찌르기 (`POST /pokes`)                      |
| `getPushToken()`           | `utils/push.ts`       | 로그아웃 때 보낼 푸시 토큰                  |
| `registerPushDevice()`     | `utils/push.ts`       | 로그인 직후 기기 등록                       |

## 3. 데이터·API

### 3-1. 호출 흐름

**화면 → 훅(`hooks/`) → API 함수(`api/<도메인>.ts`) → 목 또는 실제 요청**

- 화면은 `useFriends()` 같은 훅이나 `getFriends()` 같은 API 함수만 부른다. 화면에서 `fetch`나 `client`를 직접 쓰지 않는다.
- API 함수는 **지금은 목 데이터를 반환하고, 개발 서버가 생기면 함수 안만 실제 요청으로 바꾼다.** 화면과 훅은 바뀌지 않아야 한다.
- 실제 요청은 모두 `src/api/client.ts`를 거친다. 경로는 `/api/v1` 뒷부분만 쓴다 (예: `client.get('/friends')`).
- 인증 헤더, 401 재발급·재시도는 `client.ts`가 처리한다. 화면 코드에서 토큰을 직접 다루지 않는다.

### 3-2. TanStack Query

- 서버 데이터는 **TanStack Query**(`@tanstack/react-query`)로 불러온다.
- 훅은 `hooks/`에 두고, `useQuery`/`useMutation` 결과를 그대로 반환한다.
- `QueryClientProvider`는 `src/app/_layout.tsx`에 한 번만 둔다.
- 쿼리 키는 **첫 요소를 도메인 이름**으로 한다: `['friend']`, `['friend', { available: true }]`, `['notification', 'list']`
  - 다른 도메인 데이터를 바꾸는 mutation은 그 도메인 키로 무효화한다 (예: 알림에서 친구 요청 수락 → `['friend']` 무효화).

<!-- TODO(합의): 쿼리 키를 한 파일(api/queryKeys.ts 등)에 모을지 -->

### 3-3. 타입

- 요청·응답 타입은 **노션 API 명세 기준**으로 `src/types/<도메인>.ts`에 둔다. 공용 타입은 `src/types/common.ts`.
- **이미 있는 타입을 다른 파일에서 다시 정의하지 않는다.** 상대 도메인 타입은 import해서 쓴다. 필드가 부족하면 오너에게 요청한다.
- 서버 ID는 `Id`, 일시는 `LocalDateTime`, 시각은 `LocalTime`(`common.ts`)을 쓴다.

### 3-4. 목 데이터

- 목 데이터는 `src/api/mocks/<도메인>.ts`에 두고, `api/<도메인>.ts`의 함수가 반환한다.
- 명세서에 있는 API는 **응답 형태를 명세 그대로** 맞춘다.
- 채팅·약속·추천처럼 명세가 미확정인 API의 목 형태는 `TODO(합의)`. 확정되면 갱신한다.

### 3-5. 서버 시간

- 서버 일시(`LocalDateTime`)는 시간대 정보가 없는 KST 값이다.
- **`new Date(서버문자열)`로 직접 파싱하지 않는다.** `src/utils/date.ts`의 함수로만 파싱·표시한다.

## 4. 의존성

- 패키지 매니저는 **npm**이다.
- Expo SDK·React Native 관련 패키지(`expo-*`, `react-native-*`, `@expo/*` 등)는 **`npx expo install <패키지>`**로 추가한다. SDK에 맞는 버전을 골라 주고, 내부적으로 npm을 쓴다.
- 그 외 순수 JS 패키지나 개발 도구는 `npm install`로 추가해도 된다.
- 버전이 의심되면 `npx expo install --check`로 확인하고 `npx expo install --fix`로 맞춘다.
- **새 의존성은 추가하기 전에 사용자에게 확인받는다.** 같은 역할의 패키지가 이미 있으면 그걸 쓴다.
- 네이티브 코드가 있는 패키지를 추가하면 Expo Go에서 동작하지 않는다. 추가했다면 작업 결과에 **"네이티브 모듈 추가 — 개발 빌드 필요"**라고 명시한다.
- `package-lock.json` 충돌은 손으로 고치지 않는다. 한쪽 버전을 받은 뒤 `npm install`로 lockfile을 다시 만든다.

### 환경 변수

- 실제 값은 `.env`에만 두고 커밋하지 않는다 (`.env*`는 gitignore 대상).
- 새 변수를 추가하면 **같은 PR에서 `.env.example`에 이름과 예시 값을 추가**하고, PR 설명에 적어 상대에게 알린다.
- 앱 코드에서 읽는 변수는 `EXPO_PUBLIC_` 접두사가 붙어야 하며 앱 번들에 그대로 포함된다. 비밀 키는 넣지 않는다.

## 5. UI

- **색·타이포·간격은 `src/constants/theme.ts`의 토큰만** 쓴다. 색상 코드나 임의의 숫자를 직접 쓰지 않는다.
- 화면은 처음부터 `src/components/ui/`의 기본 컴포넌트(버튼, 텍스트, 입력창 등)를 쓴다. **같은 역할의 컴포넌트를 새로 만들지 않는다.** (예: `MyButton`, `CustomBottomSheet` 금지)
- 공용 UI에 없는 요소가 필요하면:
  - 한 도메인에서만 쓰면 → `components/<도메인>/`에 만든다.
  - 여러 도메인에서 쓸 것 같으면 → 만들지 말고 사용자에게 알린다 (오너가 `components/ui`에 추가).
- 바텀시트는 `components/ui/BottomSheet` 하나만 쓴다. 구현 라이브러리: `TODO(합의)`.

## 6. 브랜치·커밋·PR

서버 레포와 같은 규칙을 쓴다.

- 브랜치: `feat/기능명` 등 → `main`으로 PR
- 커밋 메시지: `feat|fix|refactor|test|docs|chore: 한글 설명` (예: `feat: 친구 목록 화면 추가`)
- 에이전트는 절대 임의로 커밋, 피알을 올리지 않는다.
- 사용자가 요청할 때만 커밋·푸시한다.

### 6-1. main 따라가기

- PR은 **기능 하나 단위로 작게** 만든다. 오래 열린 브랜치일수록 충돌이 커진다.
- 작업을 시작하기 전과 PR을 올리기 전에 최신 `main`을 받아 자기 브랜치에 반영한다 (`git fetch` 후 `git rebase origin/main`).
- 상대 PR이 머지되면 바로 `main`을 반영해서 바뀐 인터페이스·타입·라우트를 확인한다.

### 6-2. 충돌 해결

- **자기 오너 파일**의 충돌은 에이전트가 해결해도 된다. 해결한 뒤 lint·typecheck를 다시 돌린다.
- **상대 오너 파일·공동 파일**의 충돌은 에이전트가 해결하지 않는다. 특히 자기 쪽 내용으로 덮어쓰지 않는다. 충돌한 파일과 양쪽 변경 내용을 사용자에게 보여 주고 멈춘다.
- `package-lock.json` 충돌은 4장 규칙대로 처리한다.

### 6-3. 리뷰·머지

<!-- TODO(합의): 아래 기본안 확인 필요 -->

- 모든 PR은 **상대의 승인(Approve)과 CI 통과 후** 머지한다.
- 머지는 PR 작성자가 한다. 머지 방식은 **Squash and merge**로 하고, 커밋 제목은 커밋 메시지 규칙을 따른다.
- 상대 오너 파일을 건드린 PR은 PR 설명에 그 파일과 이유를 적는다.
- 초기 파일 구조가 확정되면 `main`에 GitHub 브랜치 보호를 걸고, 이후 `main`은 PR로만 바뀐다.

### 6-4. 규약 변경

- 이 문서(`AGENTS.md`)와 `CLAUDE.md`, `.claude/settings.json`은 **공동 파일**이다. 바꿀 때는 `docs:` PR로 올리고 두 사람이 모두 동의해야 머지한다.
- 에이전트는 작업 중에 규약을 직접 고치지 않는다. 규약이 틀렸거나 부족해 보이면 사용자에게 알린다.
- `TODO(합의)` 항목이 정해지면 같은 방식으로 갱신하고 표시를 지운다.

## 7. 작업 마무리

- 끝내기 전에 `npx expo lint`, `npx tsc --noEmit`, `npm run format:check`를 실행해 통과시킨다 (CI와 같은 검사). 포맷 오류는 `npm run format`으로 고친다.
- 결과 보고에 아래를 포함한다.
  - 자기 오너가 아닌 파일을 건드렸는지 (건드렸다면 어떤 파일인지, 상대 승인을 받았는지)
  - 새 의존성·네이티브 모듈 추가 여부
  - 임시 구현으로 대신한 상대 인터페이스 목록
