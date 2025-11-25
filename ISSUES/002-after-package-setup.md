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
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] 기본 폴더 구조 생성 (`src/components/ui`, `src/lib`, `src/hooks`, `src/types`)
- [ ] `npm run dev` 정상 실행 확인

### Task 1.2: TailwindCSS 설치 및 설정 (30분)
- [ ] TailwindCSS, PostCSS, Autoprefixer 설치
- [ ] `tailwind.config.js` 설정 (shadcn/ui 호환)
- [ ] CSS 변수 기반 컬러 시스템 설정 (`src/index.css`)
- [ ] 다크 모드 CSS 변수 준비
- [ ] TailwindCSS 클래스 동작 확인

### Task 1.3: shadcn/ui 초기화 (20분)
- [ ] shadcn/ui CLI 초기화 (`npx shadcn-ui@latest init`)
- [ ] `src/lib/utils.ts` 생성 (`cn` 함수)
- [ ] `src/components/ui/` 폴더 생성
- [ ] 필수 의존성 설치 (`clsx`, `tailwind-merge`, `lucide-react`)

### Task 1.4: CVA 설치 (15분)
- [ ] `class-variance-authority` 설치
- [ ] 기본 variant 패턴 이해 및 테스트

### Task 1.5: Storybook 설치 및 설정 (30분)
- [ ] Storybook 초기화 (`npx storybook@latest init`)
- [ ] `.storybook/main.ts` 설정
- [ ] `.storybook/preview.ts` 설정 (TailwindCSS 스타일 적용)
- [ ] 접근성 애드온 설치 (`@storybook/addon-a11y`)
- [ ] `npm run storybook` 정상 실행 확인

### 최종 검증
- [ ] 모든 스크립트 정상 동작 확인 (`dev`, `build`, `storybook`)
- [ ] TypeScript 에러 없음 확인
- [ ] 폴더 구조 검증

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
- Issue 003: Button 컴포넌트 구현
- Issue 004: Badge 컴포넌트 구현
- Issue 005: Alert 컴포넌트 구현

### 참조 링크
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [CVA 공식 문서](https://cva.style/docs)
- [Storybook 공식 문서](https://storybook.js.org/docs)