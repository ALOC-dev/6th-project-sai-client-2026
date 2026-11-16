# 사이(SAI) 클라이언트

알록 6기 프로젝트 '사이'의 모바일 앱입니다. 공강 시간이 겹치는 친구를 찾고 활동을 추천합니다.

## 기술 스택

- React Native (Expo SDK 58), TypeScript
- Expo Router

## 시작하기

```bash
nvm use               # .nvmrc의 Node 버전 사용
npm install
cp .env.example .env  # 환경 변수 파일 만들기
npm start             # 개발 서버 실행 (Expo Go 또는 시뮬레이터에서 열기)
```

### 환경 변수

| 이름                  | 설명                                          |
| --------------------- | --------------------------------------------- |
| `EXPO_PUBLIC_API_URL` | 백엔드 API 주소 (예: `http://localhost:8080`) |

- `EXPO_PUBLIC_`으로 시작하는 값은 앱 번들에 그대로 포함됩니다. 키·토큰 같은 비밀값은 넣지 않습니다.
- 새 변수를 추가하면 `.env.example`에도 이름을 추가합니다.
- 로컬 서버에 붙을 때 실제 기기에서는 `localhost` 대신 PC의 내부 IP를, Android 에뮬레이터에서는 `http://10.0.2.2:8080`을 씁니다.

## 스크립트

| 명령                   | 설명                 |
| ---------------------- | -------------------- |
| `npm run lint`         | ESLint 검사          |
| `npm run typecheck`    | TypeScript 타입 검사 |
| `npm run format`       | Prettier로 전체 포맷 |
| `npm run format:check` | 포맷 검사만 실행     |

PR마다 CI가 `lint`, `typecheck`, `format:check`를 검사합니다.

## 문서

- 서버 저장소: [6th-project-sai-server-2026](https://github.com/ALOC-dev/6th-project-sai-server-2026)
- [노션 API 명세서](https://app.notion.com/p/API-40931c4f7fe780848a56c6dbf93a87c2)
