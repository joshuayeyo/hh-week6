# 4팀 곽정원 6주차 과제
# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

## 기본과제: 레거시 디자인 시스템 분석 및 이해

이번 과제는 레거시 디자인 시스템의 문제점을 파악하고, 현대적인 디자인 시스템으로 마이그레이션하는 것입니다. 실무에서 자주 마주치는 일관성 없는 컴포넌트 API, 혼재된 스타일링 방식, 부족한 타입 안전성 등의 문제를 직접 경험하고 개선해봅니다.

## 1. 취지

- **잘못된 Atomic Design Pattern 이해하기**
  - Atomic Design의 올바른 개념과 잘못된 적용 사례 파악
  - Atoms, Molecules, Organisms의 적절한 분리 기준 이해
  - 컴포넌트 계층 구조의 중요성 체감

- **CSS로 컴포넌트 구성하면 불편한 점 이해하기**
  - 인라인 스타일, CSS Modules, CSS-in-JS의 혼재된 사용
  - 하드코딩된 스타일 값들의 유지보수 어려움
  - 디자인 토큰 부재로 인한 일관성 부족
  - 반응형 디자인 구현의 복잡성

- **현대적인 도구들의 필요성 체감**
  - TailwindCSS의 유틸리티 우선 접근법 이해
  - CVA(Class Variance Authority)를 통한 variants 패턴 학습
  - shadcn/ui의 컴포넌트 설계 철학 이해
  - Storybook을 통한 컴포넌트 문서화의 중요성

## 2. 프로젝트 구조

```
packages/
├── before/          # 레거시 시스템 (분석 대상)
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/      # Button, Badge
│   │   │   ├── molecules/  # FormInput, FormSelect
│   │   │   └── organisms/  # Header, Card, Modal, Table, Alert
│   │   ├── pages/
│   │   │   └── PostManagement.tsx
│   │   └── App.tsx
│   └── package.json
│
└── after/           # 현대적 디자인 시스템 (구현 목표)
    ├── src/
    │   ├── components/
    │   │   └── ui/         # shadcn/ui 컴포넌트
    │   ├── tokens/         # 디자인 토큰
    │   ├── hooks/          # Custom Hooks
    │   └── stories/        # Storybook stories
    ├── .storybook/
    └── package.json
```

## 3. 레거시 시스템 분석 (Before)

### 주요 문제점

#### (1) 일관성 없는 컴포넌트 API
```typescript
// 각 컴포넌트마다 다른 props 이름과 패턴
<FormInput width="full" helpText="도움말" />
<FormSelect size="md" help="다른 이름" />
<FormTextarea variant="bordered" description="또 다른 이름" />
```

#### (2) 혼재된 스타일링 방식
- 인라인 스타일: `style={{ padding: '10px', border: '1px solid #ccc' }}`
- CSS Modules: `className={styles.card}`
- 하드코딩된 색상 값: `#007bff`, `#d32f2f`

#### (3) 타입 안전성 부족
- 느슨한 타입 정의
- 수동 validation
- 에러 처리 불일치

#### (4) 접근성 이슈
- 불완전한 ARIA 라벨
- 키보드 네비게이션 미비
- 스크린 리더 지원 부족

## 4. 과제 목표 및 요구사항

### (1) Atomic Design Pattern - 이론과 현실의 괴리

**현재 구조 (before):**
```
components/
├── atoms/      # Button, Badge
├── molecules/  # FormInput, FormSelect
└── organisms/  # Header, Card, Modal, Table
```

**⚠️ 실무에서의 문제점:**
1. **분류 기준이 모호함**
   - Card는 atom인가 molecule인가? 내용에 따라 달라짐
   - FormInput은 molecule이지만, 단독으로도 충분히 사용 가능

2. **폴더 구조가 오히려 불편함**
   - 컴포넌트를 찾기 위해 3단계를 거쳐야 함
   - import 경로가 길어짐: `../../../components/atoms/Button`
   - 컴포넌트를 옮길 때마다 모든 import 수정 필요

3. **개발 속도 저하**
   - "이게 atom인가 molecule인가?" 고민하는 시간 낭비
   - 팀원마다 분류 기준이 다를 수 있음

**🎯 이번 과제의 목표:**
- Atomic Design의 **개념 자체**를 이해하기 (컴포넌트 조합과 재사용성)
- 하지만 **폴더 구조는 디자인 시스템과 개발구조가 다르다는 점** 이해하기
  - shadcn/ui도 `components/ui/` 단순 구조를 사용함을 주목

### (2) shadcn/ui 사용해보기

**학습 내용:**
- shadcn/ui의 설계 철학 이해
- CLI를 통한 컴포넌트 추가
- Radix UI 기반의 접근성 구현
- 컴포넌트 커스터마이징 방법

**구현할 컴포넌트:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add form
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
```

### (3) TailwindCSS + CVA로 Variants 만들기

**Before (문제):**
```typescript
// 하드코딩된 스타일
const getButtonStyle = (variant: string) => {
  if (variant === 'primary') return { backgroundColor: '#007bff', color: 'white' };
  if (variant === 'secondary') return { backgroundColor: '#6c757d', color: 'white' };
  // ...
};
```

**After (목표):**
```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### (4) Storybook 사용해보기

**Storybook 설정:**
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

**학습 내용:**
- Storybook 설정 및 실행
- Stories 작성 방법
- Args와 Controls 활용
- Accessibility addon 사용
- 컴포넌트 문서 자동 생성

## 5. 과제 제출

### 필수 구현 사항
- [x] after 패키지에 디자인 시스템 구현 완료
- [x] PostManagement 페이지 마이그레이션 완료
- [x] Storybook에 주요 컴포넌트 stories 작성
- [x] README에 before/after 비교 및 개선사항 문서화

### 심화 구현 사항
- [x] Dark mode 지원
- [x] Dark mode toggle 버튼

## 6. 그밖에 해보면 좋을 것들
> 분량상 이번 과제에는 포함하지 않았지만, 실무에서 자주 쓰이는 패턴들입니다. 시간 여유가 된다면 도전해보세요!
- [ ] figma 디자인 토큰 추출 후 적용
- [ ] figma Design to Code 플러그인 혹은 MCP 사용해보기
- [ ] figma Icon to SVG + deploy to CDN 시스템 구축 해보기
- [ ] 복잡한 컴포넌트 직접 구현 (token, variants, 접근성) 포함
  - ex) AutoComplete, DatePicker
- [ ] Monorepo 디자인 시스템 패키지 구축 및 배포
- [ ] Storybook Interaction Tests 또는 A11y addon으로 컴포넌트 품질 검증
- [ ] React Hook Form + Zod로 Form 구현

---

**이 프로젝트를 통해 레거시 시스템의 문제점을 이해하고, 현대적인 디자인 시스템 구축 능력을 습득하세요!**

---

## 7. Before/After 비교 및 개선사항

### 7.1 컴포넌트 구조 비교

#### Before (Atomic Design - 문제점)
```
components/
├── atoms/        # Button, Badge
├── molecules/    # FormInput, FormSelect, FormTextarea
└── organisms/    # Header, Card, Modal, Table, Alert
```

**문제점**:
- 분류 기준이 모호 (Card는 atom? molecule?)
- import 경로가 김 (`../../../components/atoms/Button`)
- 컴포넌트 이동 시 모든 import 수정 필요
- UI 컴포넌트에 비즈니스 로직 혼재

#### After (Category-based + Feature-based)
```
components/
├── primitives/   # Button, Badge (기본 요소)
├── layout/       # Header, Card, Modal (레이아웃)
├── feedback/     # Alert (피드백)
├── data/         # Table (데이터 표시)
└── forms/        # Input, Select, Textarea, Checkbox, Label

pages/
└── management/
    ├── hooks/       # 페이지 전용 hooks
    ├── components/  # 페이지 전용 컴포넌트
    └── constants/   # 페이지 전용 상수
```

**개선점**:
- 역할 기반 분류로 직관적
- `@/components/primitives` alias 사용
- 순수 UI와 도메인 로직 분리
- 페이지 전용 코드는 pages/ 하위에 응집

### 7.2 스타일링 방식 비교

#### Before (인라인 스타일 + 하드코딩)
```tsx
// 하드코딩된 색상값
<span style={{ color: '#d32f2f' }}>*</span>

// 조건부 클래스 수동 조합
const classes = [
  'btn',
  `btn-${variant}`,
  `btn-${size}`,
  fullWidth && 'btn-fullwidth',
].filter(Boolean).join(' ');
```

#### After (TailwindCSS + CVA)
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 사용
<Button variant="destructive" size="sm">삭제</Button>
```

**개선점**:
- 디자인 토큰 기반 (CSS 변수)
- 타입 안전한 variants (VariantProps)
- 일관된 spacing, colors, typography

### 7.3 컴포넌트 API 비교

#### Before (비일관적 Props)
```tsx
// 각 컴포넌트마다 다른 props 이름
<FormInput width="full" helpText="도움말" fieldType="username" />
<FormSelect size="md" help="다른 이름" />
<FormTextarea variant="bordered" description="또 다른 이름" />

// UI 컴포넌트에 비즈니스 로직 포함
<Button
  entityType="post"
  action="publish"
  entity={post}  // 비즈니스 규칙 판단
/>
```

#### After (일관된 Props)
```tsx
// 모든 컴포넌트 동일한 패턴
<Input variant="default" size="sm" />
<Select variant="default" size="sm" />
<Textarea variant="default" />

// 순수 UI - 비즈니스 로직 없음
<Button variant="default" size="sm" onClick={handlePublish}>
  게시
</Button>
```

**개선점**:
- shadcn/ui 표준 `variant`, `size` 사용
- Props 타입 `src/types/`에서 중앙 관리
- UI 컴포넌트는 순수 렌더링만 담당

### 7.4 페이지 구조 비교

#### Before (647줄 단일 파일)
```tsx
// ManagementPage.tsx - 647줄
// 상태 관리 (10+ useState)
// 데이터 로드 로직
// CRUD 핸들러
// 통계 계산 로직
// 테이블 컬럼 정의
// 렌더링 (모달 2개 포함)
```

#### After (150줄 + 분리된 모듈)
```
ManagementPage.tsx (150줄)
└── management/
    ├── hooks/
    │   ├── useEntityData.ts   # CRUD 로직
    │   ├── useEntityForm.ts   # 폼 상태
    │   └── useAlert.ts        # 알림 상태
    ├── components/
    │   ├── EntityTabs.tsx     # 탭 UI
    │   ├── StatsGrid.tsx      # 통계 카드
    │   ├── EntityTable.tsx    # 테이블
    │   └── EntityFormFields.tsx # 폼 필드
    └── constants/
        └── tableColumns.ts    # 컬럼 정의
```

**개선점**:
- 80줄 제한 준수 (CLAUDE.md 표준)
- 단일 책임 원칙 적용
- 테스트 용이성 향상
- 재사용 가능한 hooks

### 7.5 타입 안전성 비교

#### Before
```tsx
// 느슨한 타입
entity?: any;
fieldType?: 'username' | 'email' | 'postTitle' | 'slug' | 'normal';
```

#### After
```tsx
// Props 중앙 관리
// src/types/primitives.types.ts
export type { ButtonProps } from '@/components/primitives/Button'

// 컴포넌트에서 정의
export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }
```

**개선점**:
- `ComponentProps<"element">` 활용
- CVA `VariantProps` 자동 추론
- Props 타입 re-export 패턴

---

## 8. 실행 방법

### 개발 서버
```bash
# after 패키지
cd packages/after
npm install
npm run dev
```

### Storybook
```bash
cd packages/after
npm run storybook
```

### 빌드
```bash
cd packages/after
npm run build
```

### 테스트
```bash
cd packages/after
npm run test
```

---

## 참고 자료

### TailwindCSS
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [TailwindCSS v4.0 새로운 기능](https://tailwindcss.com/blog/tailwindcss-v4-alpha)

### CVA (Class Variance Authority)
- [CVA 공식 문서](https://cva.style/docs)
- [CVA 예제 모음](https://cva.style/docs/examples)

### shadcn/ui
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

### Storybook
- [Storybook 공식 문서](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook Args와 Controls](https://storybook.js.org/docs/react/writing-stories/args)
- [Accessibility addon](https://storybook.js.org/addons/@storybook/addon-a11y)

### React Hook Form + Zod
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [React Hook Form + Zod 통합](https://github.com/react-hook-form/resolvers#zod)

### Atomic Design
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Atomic Design과 React](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/)