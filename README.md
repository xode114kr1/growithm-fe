# Growithm Frontend

GitHub 연동 기반 알고리즘 학습 기록 및 스터디 관리 서비스의 프론트엔드 프로젝트입니다.

사용자는 GitHub OAuth로 로그인하고, BaekjoonHub와 연결한 저장소를 등록해 문제 풀이 기록을 자동으로 수집할 수 있습니다. 수집된 문제는 대시보드, 문제 목록, 풀이 작성 화면, 스터디 기능에서 활용됩니다.

## 주요 기능

- GitHub OAuth 로그인
- 대시보드에서 풀이 통계 및 티어 분포 확인
- 문제 목록 조회 및 풀이 작성
- 미작성 문제(`pending`) 추적
- 친구 관리 및 스터디 그룹 관리
- GitHub Repository 등록 및 webhook 연동
- BaekjoonHub 기반 자동 기록 수집 가이드 제공

## 기술 스택

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Axios
- styled-components
- Recharts

## 프로젝트 구조

```text
src
|-- app                  # 라우터, 보호 라우트, 앱 진입 구조
|-- pages                # 페이지 단위 UI
|-- shared
|   |-- api              # API 클라이언트 및 도메인별 요청 함수
|   |-- components       # 공통 컴포넌트
|   |-- hooks            # 서버 상태/도메인 로직 훅
|   |-- layouts          # 공통 레이아웃
|   |-- styles           # 전역 스타일, 팔레트, 래퍼
|   `-- utils            # 날짜, 티어 등 유틸리티
|-- stores               # Zustand 스토어
`-- types                # 도메인 타입 정의
```

## 화면 구성

- `/` : 서비스 소개 랜딩 페이지
- `/callback` : GitHub OAuth 콜백 처리
- `/dashboard` : 사용자 통계, 보류 문제, 티어 차트
- `/dashboard/menual` : GitHub Repo 및 BaekjoonHub 연동 가이드
- `/problem` : 문제 목록
- `/problem/:id` : 풀이 작성/조회
- `/friend` : 친구 및 친구 요청 관리
- `/study` : 스터디 목록
- `/study/:id/overview` : 스터디 개요
- `/study/:id/problem` : 스터디 문제 관리
- `/study/:id/member` : 스터디 멤버 관리
- `/study/:id/owner` : 스터디장 전용 관리 화면

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하거나 수정합니다.

```env
VITE_API_URL=http://localhost:4000/api
VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/callback
VITE_GITHUB_SCOPE=repo admin:repo_hook
```

### 3. 개발 서버 실행

```bash
npm run dev
```

기본 개발 주소:

```text
http://localhost:5173
```

## 배포용 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

## 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 타입 검사 + 프로덕션 빌드
npm run lint     # ESLint 검사
npm run preview  # 빌드 결과 로컬 프리뷰
```

## API 및 인증 메모

- API 기본 주소는 `VITE_API_URL`을 사용합니다.
- Axios 인스턴스는 `withCredentials: true`로 동작합니다.
- 인증 정보는 쿠키 기반 요청 흐름에서 처리합니다.
- `401` 응답은 상위 인증 흐름에서 처리하고, 그 외 주요 오류는 토스트로 표시합니다.

## 연동 흐름

1. 사용자가 GitHub OAuth로 로그인합니다.
2. `/dashboard/menual`에서 GitHub Repository 생성 및 BaekjoonHub 설치 가이드를 확인합니다.
3. 사용자가 GitHub ID와 Repository 정보를 등록합니다.
4. 이후 백엔드와 webhook 연동을 통해 문제 풀이 기록이 자동 반영됩니다.

## 참고 사항

- 이 프로젝트는 백엔드 서버와 GitHub OAuth 앱 설정이 선행되어야 정상 동작합니다.
- `VITE_GITHUB_REDIRECT_URI`는 GitHub OAuth 앱에 등록된 Redirect URI와 정확히 일치해야 합니다.
- 저장소의 기존 `.env` 값은 예시가 아니라 실제 개발 값일 수 있으므로, 공개 저장소로 관리할 경우 별도 점검이 필요합니다.
