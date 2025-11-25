## Description

레거시 디자인 시스템(`packages/before/`)을 개선하기 위한 새로운 프로젝트 환경을 `packages/after/`에 구성합니다.

**목표**: 모던 디자인 시스템 구축을 위한 기반 환경 설정

- React 19 + TypeScript + Vite 프로젝트 생성
- TailwindCSS v4 + CSS 변수 기반 테마 시스템
- shadcn/ui 컴포넌트 라이브러리 초기화
- CVA(Class Variance Authority)를 통한 variant 패턴
- Storybook을 통한 컴포넌트 문서화 환경

**참조 문서**: `markdowns/spec/improvement-spec-en.md` - Phase 1

## Todo

### Task 1.1: After 패키지 초기화 (15분)

- [x] Vite + React + TypeScript 프로젝트 생성 (이미 존재)
- [x] 기본 폴더 구조 존재 (`src/components`, `src/pages`, `src/services`)
- [x] `pnpm run dev` 정상 실행 확인

### Task 1.2: TailwindCSS 설치 및 설정 (30분)

- [x] TailwindCSS v4, PostCSS 설치
- [x] `postcss.config.js` 설정 (tailwindcss 플러그인 추가)
- [x] CSS 변수 기반 컬러 시스템 설정 (`src/styles/index.css`)
- [x] 다크 모드 CSS 변수 준비
- [x] TailwindCSS v4 `@theme` 블록으로 커스텀 컬러 등록

### Task 1.3: shadcn/ui 초기화 (20분)

- [x] `src/lib/utils.ts` 생성 (`cn` 함수)
- [x] `src/components/ui/` 폴더 생성
- [x] `src/hooks/`, `src/types/` 폴더 생성
- [x] 필수 의존성 설치 (`clsx`, `tailwind-merge`, `lucide-react`)

### Task 1.4: CVA 설치 (15분)

- [x] `class-variance-authority` 설치

### Task 1.5: Storybook 설치 및 설정 (30분)

- [x] Storybook v10 초기화 (`pnpm dlx storybook@latest init`)
- [x] `.storybook/main.ts` 설정
- [x] `.storybook/preview.ts` 설정 (TailwindCSS 스타일 import)
- [x] 접근성 애드온 설치 (`@storybook/addon-a11y`)
- [x] `pnpm run storybook` 정상 실행 확인

### 최종 검증

- [x] `pnpm run dev` 정상 동작 확인
- [x] `pnpm run storybook` 정상 동작 확인
- [x] 폴더 구조 검증

## ETC

### 예상 소요 시간

- **총 110분** (약 2시간)

### 생성될 폴더 구조

```
packages/after/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui 컴포넌트
│   ├── hooks/            # 커스텀 훅
│   ├── lib/
│   │   └── utils.ts      # cn() 유틸리티
│   ├── types/            # TypeScript 타입 정의
│   ├── index.css         # TailwindCSS + CSS 변수
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### 설치될 패키지

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "lucide-react": "^0.x",
    "class-variance-authority": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^6.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^4.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "@storybook/react-vite": "^8.x",
    "@storybook/addon-a11y": "^8.x"
  }
}
```

### 다음 단계

이 이슈 완료 후 **Phase 2: 기본 UI 컴포넌트 마이그레이션**으로 진행:

- Issue 003: 디자인 토큰 정의 및 before 컬러 매핑
- Issue 004: Button 컴포넌트 구현
- Issue 005: Badge 컴포넌트 구현
- Issue 006: Alert 컴포넌트 구현

### 참고: 디자인 토큰 작업 (Issue 003 예정)

현재 CSS 변수는 shadcn/ui 기본 테마로 설정됨. 추후 `before` 패키지 컬러를 기반으로 매핑 필요:

| before 컬러   | HEX       | 매핑할 CSS 변수 |
| ------------- | --------- | --------------- |
| Primary       | `#1976d2` | `--primary`     |
| Primary Hover | `#1565c0` | -               |
| Danger/Error  | `#d32f2f` | `--destructive` |
| Success       | `#388e3c` | (추가 필요)     |
| Warning       | `#f57c00` | (추가 필요)     |
| Info          | `#0288d1` | (추가 필요)     |
| Secondary     | `#757575` | `--secondary`   |

### 참조 링크

- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [CVA 공식 문서](https://cva.style/docs)
- [Storybook 공식 문서](https://storybook.js.org/docs)
