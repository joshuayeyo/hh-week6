# 레거시 디자인 시스템 개선 작업 명세서 (KR)

## 📋 목차
1. [개요](#개요)
2. [발견된 문제점](#발견된-문제점)
3. [작업 단위별 상세 명세](#작업-단위별-상세-명세)
4. [우선순위 및 예상 작업 시간](#우선순위-및-예상-작업-시간)

---

## 개요

### 프로젝트 목표
레거시 디자인 시스템(`packages/before/`)의 문제점을 파악하고, 현대적인 디자인 시스템(`packages/after/`)으로 마이그레이션하여 다음을 달성합니다:
- 일관된 컴포넌트 API 설계
- TailwindCSS + CVA를 활용한 체계적인 스타일 관리
- shadcn/ui 기반의 접근성 있는 컴포넌트
- 도메인 로직과 UI의 명확한 분리
- Storybook을 통한 컴포넌트 문서화

---

## 발견된 문제점

### 1. 일관성 없는 컴포넌트 API ⚠️

#### 1.1 Props 네이밍 불일치
**문제:**
```typescript
// FormInput.tsx - "width" prop 사용
<FormInput width="full" helpText="도움말" />

// FormSelect.tsx - "size" prop 사용
<FormSelect size="md" helpText="도움말" />

// FormTextarea.tsx - size/width prop 없음
<FormTextarea helpText="도움말" />
```

**영향:** 개발자가 각 컴포넌트마다 다른 API를 기억해야 하며, 일관성 없는 UX 제공

#### 1.2 Size/Variant 값 불일치
**문제:**
```typescript
// Button: "sm", "md", "lg"
<Button size="sm" variant="primary" />

// Badge: "small", "medium", "large"
<Badge size="small" type="primary" />

// Alert: variant 이름이 다름
<Alert variant="error" />  // Button은 "danger"를 사용
```

**영향:** 같은 개념이 컴포넌트마다 다르게 표현되어 혼란 초래

---

### 2. UI 컴포넌트에 도메인 로직 혼입 🚨

#### 2.1 Button 컴포넌트 (`packages/before/src/components/atoms/Button.tsx`)
**문제:** UI 컴포넌트가 비즈니스 규칙을 직접 구현
```typescript
// 라인 14-16: 도메인 특화 props
entityType?: 'user' | 'post';
action?: 'create' | 'edit' | 'delete' | 'publish' | 'archive';
entity?: any;

// 라인 36-75: 비즈니스 규칙 처리
if (entityType === 'user' && action === 'delete' && entity.role === 'admin') {
  actualDisabled = true; // 관리자는 삭제 불가
}
```

**영향:**
- 재사용성 저하 (다른 프로젝트에 사용 불가)
- 테스트 복잡도 증가
- 단일 책임 원칙(SRP) 위반

#### 2.2 Badge 컴포넌트 (`packages/before/src/components/atoms/Badge.tsx`)
**문제:** 도메인 상태를 직접 처리
```typescript
// 라인 9-13: 도메인 특화 props
status?: 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
userRole?: 'admin' | 'moderator' | 'user' | 'guest';
priority?: 'high' | 'medium' | 'low';
paymentStatus?: 'paid' | 'pending' | 'failed' | 'refunded';

// 라인 32-114: 도메인별 매핑 로직
```

**영향:** Badge가 모든 도메인 컨텍스트를 알아야 함

#### 2.3 FormInput 컴포넌트 (`packages/before/src/components/molecules/FormInput.tsx`)
**문제:** UI 컴포넌트가 비즈니스 검증 수행
```typescript
// 라인 18-20: 도메인 특화 props
fieldType?: 'username' | 'email' | 'postTitle' | 'slug' | 'normal';
entityType?: 'user' | 'post';
checkBusinessRules?: boolean;

// 라인 57-63: 도메인 규칙 (예약어 체크)
const reservedWords = ['admin', 'root', 'system', 'administrator'];

// 라인 69-74: 도메인 규칙 (회사 이메일만 허용)
if (!val.endsWith('@company.com') && !val.endsWith('@example.com')) {
  setInternalError('회사 이메일만 사용 가능합니다');
}
```

**영향:** 폼 검증 로직이 UI 컴포넌트에 강결합

#### 2.4 Table 컴포넌트 (`packages/before/src/components/organisms/Table.tsx`)
**문제:** 도메인별 렌더링 로직 포함
```typescript
// 라인 24-30: 도메인 특화 props
entityType?: 'user' | 'post';
onEdit?: (item: any) => void;
onDelete?: (id: number) => void;
onPublish?: (id: number) => void;
onArchive?: (id: number) => void;
onRestore?: (id: number) => void;

// 라인 107-202: renderCell 메서드에 도메인별 분기 처리
if (entityType === 'user') {
  if (columnKey === 'role') {
    return <Badge userRole={value} showIcon />;
  }
  // ... 더 많은 도메인 로직
}
```

**영향:** Table이 User, Post 도메인을 모두 알아야 하며 확장 불가능

---

### 3. 혼재된 스타일링 방식 🎨

#### 3.1 CSS 클래스 + 인라인 스타일 혼용
**문제:**
```typescript
// packages/before/src/pages/ManagementPage.tsx

// 라인 225-238: 인라인 스타일
<div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
  <h1 style={{
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  }}>

// 라인 207-218: 인라인 스타일과 하드코딩된 값
<input
  style={{
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '300px',
  }}
/>
```

**영향:**
- 스타일 일관성 부족
- 디자인 토큰 부재
- 재사용 불가능
- 반응형 디자인 구현 어려움

#### 3.2 하드코딩된 색상 값
**문제:** `packages/before/src/styles/components.css`에 하드코딩된 색상
```css
/* 라인 24-26 */
.btn-primary {
  background-color: #1976d2;  /* 하드코딩 */
  color: #fff;
  border-color: #1565c0;
}

/* 라인 44-46 */
.btn-danger {
  background-color: #d32f2f;  /* 하드코딩 */
  color: #fff;
  border-color: #c62828;
}
```

**영향:**
- 디자인 시스템 변경 시 모든 값 수동 수정 필요
- Dark mode 지원 어려움
- 일관성 유지 어려움

---

### 4. 타입 안전성 부족 ⚠️

#### 4.1 Any 타입 남발
**문제:**
```typescript
// Table.tsx 라인 15, 21
data?: any[];
onRowClick?: (row: any) => void;

// Button.tsx 라인 16
entity?: any;

// ManagementPage.tsx 라인 25
const [formData, setFormData] = useState<any>({});
```

**영향:**
- 타입 체크 불가능
- 런타임 에러 위험 증가
- IDE 자동완성 지원 부족

---

### 5. 접근성(Accessibility) 이슈 ♿

#### 5.1 Modal 컴포넌트 (`packages/before/src/components/organisms/Modal.tsx`)
**문제:**
```typescript
// ESC 키 지원 없음
// Focus trap 없음
// role, aria-labelledby 속성 없음
// 라인 38: onClick으로만 닫기
<div className="modal-overlay" onClick={onClose}>
```

**필요한 개선:**
- ESC 키로 모달 닫기
- Focus trap (모달 내부로 포커스 제한)
- `role="dialog"`, `aria-modal="true"` 추가
- `aria-labelledby` 연결

#### 5.2 Alert 컴포넌트 (`packages/before/src/components/organisms/Alert.tsx`)
**문제:**
```typescript
// 라인 38-41: Close 버튼에 aria-label 없음
<button onClick={onClose} className="alert-close">
  ×
</button>
```

**필요한 개선:**
- `aria-label="Close alert"` 추가
- `role="alert"` 추가

#### 5.3 Table 컴포넌트 접근성
**문제:**
```typescript
// 라인 230: Sortable 헤더에 aria-sort 없음
<th onClick={() => sortable && handleSort(column.key)}>
```

**필요한 개선:**
- `aria-sort` 속성 추가
- 키보드 네비게이션 지원

---

### 6. Atomic Design 패턴 오용 📁

#### 6.1 폴더 구조 문제
**현재 구조:**
```
components/
├── atoms/      # Button, Badge
├── molecules/  # FormInput, FormSelect
└── organisms/  # Header, Card, Modal, Table
```

**문제점:**
1. **분류 기준 모호**: Card는 atom인가 molecule인가?
2. **Import 경로 복잡**: `../../../components/atoms/Button`
3. **개발 속도 저하**: "이게 어디에 속하지?" 고민하는 시간 낭비
4. **리팩토링 어려움**: 컴포넌트 이동 시 모든 import 수정 필요

**개선 방향:**
```
components/
└── ui/         # 모든 재사용 가능한 UI 컴포넌트 (shadcn/ui 방식)
    ├── button.tsx
    ├── badge.tsx
    ├── input.tsx
    └── ...
```

---

## 작업 단위별 상세 명세

## Phase 1: 프로젝트 셋업 및 환경 구성

### Task 1.1: After 패키지 초기화
**목표:** 새로운 React + TypeScript 프로젝트 생성

**작업 내용:**
```bash
cd packages/after
npm create vite@latest . -- --template react-ts
npm install
```

**체크리스트:**
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] 기본 폴더 구조 생성 (`src/components/ui`, `src/lib`, `src/hooks`)
- [ ] `npm run dev` 실행 확인

**예상 시간:** 15분

---

### Task 1.2: TailwindCSS 설치 및 설정
**목표:** TailwindCSS v4 설치 및 기본 설정

**작업 내용:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**`tailwind.config.js` 설정:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

**`src/index.css` 설정:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

**체크리스트:**
- [ ] TailwindCSS 설치 완료
- [ ] `tailwind.config.js` 설정 완료
- [ ] CSS 변수 기반 색상 시스템 설정
- [ ] Dark mode 지원 준비
- [ ] TailwindCSS 클래스 작동 확인

**예상 시간:** 30분

---

### Task 1.3: shadcn/ui 초기화
**목표:** shadcn/ui CLI 설정 및 기본 구조 생성

**작업 내용:**
```bash
npx shadcn-ui@latest init
```

**CLI 질문 답변:**
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: Yes
- Component location: `./src/components/ui`
- Utils location: `./src/lib/utils`
- React Server Components: No
- Icons: lucide-react

**`src/lib/utils.ts` 생성:**
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**체크리스트:**
- [ ] shadcn/ui CLI 초기화 완료
- [ ] `src/lib/utils.ts` 생성 확인
- [ ] `src/components/ui/` 폴더 생성 확인
- [ ] 필요한 dependencies 설치 확인 (`clsx`, `tailwind-merge`, `lucide-react`)

**예상 시간:** 20분

---

### Task 1.4: CVA (Class Variance Authority) 설치
**목표:** Variant 패턴 구현을 위한 CVA 설치

**작업 내용:**
```bash
npm install class-variance-authority
```

**사용 예시 확인:**
```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
```

**체크리스트:**
- [ ] CVA 설치 완료
- [ ] 기본 variant 패턴 이해
- [ ] TypeScript 타입 추론 확인

**예상 시간:** 15분

---

### Task 1.5: Storybook 설치 및 설정
**목표:** Storybook 설치 및 기본 구조 생성

**작업 내용:**
```bash
npx storybook@latest init
```

**`.storybook/main.ts` 설정:**
```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",  // 접근성 addon
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
```

**`.storybook/preview.ts` 설정:**
```typescript
import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

**체크리스트:**
- [ ] Storybook 설치 완료
- [ ] `npm run storybook` 실행 확인
- [ ] Accessibility addon 설치 확인
- [ ] TailwindCSS 스타일 적용 확인

**예상 시간:** 30분

---

## Phase 2: 기본 UI 컴포넌트 마이그레이션

### Task 2.1: Button 컴포넌트 구현
**목표:** shadcn/ui Button 설치 및 커스터마이징

**작업 내용:**
```bash
npx shadcn-ui@latest add button
```

**개선 사항:**
1. **도메인 로직 제거**: `entityType`, `action`, `entity` props 제거
2. **일관된 API**: CVA로 variant/size 정의
3. **접근성 개선**: 적절한 type 속성

**`src/components/ui/button.tsx` (커스터마이징):**
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Before/After 비교:**
```typescript
// ❌ Before (도메인 로직 포함)
<Button
  entityType="user"
  action="delete"
  entity={user}
  variant="danger"
>
  {/* 버튼이 자동으로 텍스트와 disabled 상태 결정 */}
</Button>

// ✅ After (순수 UI 컴포넌트)
<Button
  variant="destructive"
  disabled={user.role === 'admin'}  // 비즈니스 로직은 상위에서 처리
  onClick={handleDelete}
>
  Delete User
</Button>
```

**체크리스트:**
- [ ] shadcn/ui Button 설치
- [ ] 도메인 로직 제거 확인
- [ ] Variant 정의: default, destructive, outline, secondary, ghost, link
- [ ] Size 정의: default, sm, lg, icon
- [ ] 접근성 확인 (focus visible, disabled state)
- [ ] TypeScript 타입 안전성 확인

**예상 시간:** 45분

---

### Task 2.2: Button Storybook 작성
**목표:** Button 컴포넌트 문서화 및 모든 variant 시각화

**`src/components/ui/button.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-2">
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
```

**체크리스트:**
- [ ] 모든 variant story 작성
- [ ] 모든 size story 작성
- [ ] Disabled 상태 story
- [ ] AllVariants 조합 story
- [ ] Accessibility addon으로 검증
- [ ] Controls로 interactive 테스트 가능 확인

**예상 시간:** 30분

---

### Task 2.3: Badge 컴포넌트 구현
**목표:** 도메인 로직 없는 순수 Badge 컴포넌트

**작업 내용:**
```bash
npx shadcn-ui@latest add badge
```

**개선 사항:**
1. **도메인 로직 제거**: `status`, `userRole`, `priority`, `paymentStatus` props 제거
2. **일관된 variant 이름**: "type" → "variant"로 통일
3. **간결한 API**: children으로 내용 전달

**`src/components/ui/badge.tsx` (커스터마이징):**
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

**Before/After 비교:**
```typescript
// ❌ Before (도메인 로직 포함)
<Badge
  status="published"  // 자동으로 색상과 텍스트 결정
  userRole="admin"
/>

// ✅ After (순수 UI 컴포넌트)
<Badge variant="default">
  {post.status === 'published' ? '게시됨' : '임시저장'}
</Badge>
<Badge variant="destructive">
  {user.role === 'admin' ? '관리자' : '사용자'}
</Badge>
```

**도메인별 Badge 생성을 위한 helper 함수 (선택사항):**
```typescript
// src/components/domain/post-badge.tsx
import { Badge } from '@/components/ui/badge';

type PostStatus = 'published' | 'draft' | 'archived';

const statusConfig: Record<PostStatus, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  published: { label: '게시됨', variant: 'default' },
  draft: { label: '임시저장', variant: 'secondary' },
  archived: { label: '보관됨', variant: 'outline' },
};

export function PostStatusBadge({ status }: { status: PostStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
```

**체크리스트:**
- [ ] shadcn/ui Badge 설치
- [ ] 도메인 로직 제거
- [ ] Variant 정의: default, secondary, destructive, outline
- [ ] 간결한 API 확인
- [ ] 도메인별 helper 함수 패턴 이해

**예상 시간:** 30분

---

### Task 2.4: Alert 컴포넌트 구현 및 접근성 개선
**목표:** shadcn/ui Alert 설치 및 접근성 개선

**작업 내용:**
```bash
npx shadcn-ui@latest add alert
```

**개선 사항:**
1. **접근성**: `role="alert"`, `aria-label` 추가
2. **일관된 variant**: "error" → "destructive"로 통일
3. **Icon 시스템**: lucide-react 아이콘 사용

**`src/components/ui/alert.tsx` (커스터마이징):**
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => {
  const Icon = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle2,
    warning: AlertCircle,
  }[variant || "default"]

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

**Before/After 비교:**
```typescript
// ❌ Before
<Alert variant="error" title="오류" onClose={handleClose}>
  <button onClick={onClose} className="alert-close">×</button>
  데이터를 불러올 수 없습니다
</Alert>

// ✅ After
<Alert variant="destructive">
  <AlertTitle>오류</AlertTitle>
  <AlertDescription>
    데이터를 불러올 수 없습니다
  </AlertDescription>
</Alert>
```

**체크리스트:**
- [ ] shadcn/ui Alert 설치
- [ ] `role="alert"` 추가 확인
- [ ] Icon 시스템 구현
- [ ] Variant 정의: default, destructive, success, warning
- [ ] AlertTitle, AlertDescription 컴포넌트 분리
- [ ] 접근성 검증 (Storybook a11y addon)

**예상 시간:** 40분

---

## Phase 3: Form 컴포넌트 마이그레이션 및 API 통일

### Task 3.1: Input 컴포넌트 구현
**목표:** 일관된 API를 가진 Input 컴포넌트

**작업 내용:**
```bash
npx shadcn-ui@latest add input
```

**개선 사항:**
1. **도메인 로직 제거**: `fieldType`, `entityType`, `checkBusinessRules` 제거
2. **API 통일**: FormInput, FormSelect, FormTextarea 모두 동일한 props 구조
3. **검증 분리**: UI 컴포넌트에서 검증 로직 제거 (React Hook Form + Zod로 이동)

**`src/components/ui/input.tsx`:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

**체크리스트:**
- [ ] shadcn/ui Input 설치
- [ ] 도메인 로직 제거 확인
- [ ] forwardRef로 ref 전달 지원
- [ ] 접근성 확인 (focus visible)
- [ ] Disabled 상태 스타일 확인

**예상 시간:** 20분

---

### Task 3.2: Form 컴포넌트 구현 (React Hook Form 통합)
**목표:** shadcn/ui Form 컴포넌트로 일관된 form 구조 제공

**작업 내용:**
```bash
npx shadcn-ui@latest add form
npm install react-hook-form @hookform/resolvers zod
```

**`src/components/ui/form.tsx` (shadcn/ui 제공):**
- FormField
- FormItem
- FormLabel
- FormControl
- FormDescription
- FormMessage

**사용 예시:**
```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다"),
  email: z.string()
    .email("올바른 이메일 형식이 아닙니다")
    .refine((email) => email.endsWith("@company.com"), {
      message: "회사 이메일만 사용 가능합니다",
    }),
})

function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

**Before/After 비교:**
```typescript
// ❌ Before (UI 컴포넌트에 검증 로직)
<FormInput
  name="username"
  value={formData.username}
  onChange={(value) => setFormData({ ...formData, username: value })}
  fieldType="username"
  entityType="user"
  checkBusinessRules={true}  // UI 컴포넌트가 비즈니스 규칙 검사
  error={errors.username}
/>

// ✅ After (검증 로직은 Zod schema로 분리)
<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>사용자명</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**체크리스트:**
- [ ] shadcn/ui Form 설치
- [ ] React Hook Form 설치
- [ ] Zod 설치
- [ ] Form validation 예시 작성
- [ ] 도메인 검증 로직을 Zod schema로 이동 확인
- [ ] 에러 메시지 표시 확인

**예상 시간:** 60분

---

### Task 3.3: Select 및 Textarea 컴포넌트 구현
**목표:** Input과 일관된 API의 Select, Textarea

**작업 내용:**
```bash
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
```

**`src/components/ui/textarea.tsx` 커스터마이징:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
```

**Form 통합 예시:**
```typescript
<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>카테고리</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="accessibility">Accessibility</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="content"
  render={({ field }) => (
    <FormItem>
      <FormLabel>내용</FormLabel>
      <FormControl>
        <Textarea placeholder="내용을 입력하세요" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**체크리스트:**
- [ ] Select 컴포넌트 설치 및 테스트
- [ ] Textarea 컴포넌트 설치 및 테스트
- [ ] React Hook Form 통합 확인
- [ ] 일관된 스타일 확인
- [ ] 접근성 확인

**예상 시간:** 40분

---

## Phase 4: 복잡한 컴포넌트 마이그레이션

### Task 4.1: Card 컴포넌트 구현
**목표:** 간결하고 유연한 Card 컴포넌트

**작업 내용:**
```bash
npx shadcn-ui@latest add card
```

**`src/components/ui/card.tsx`:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

**사용 예시:**
```typescript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**체크리스트:**
- [ ] Card 컴포넌트 설치
- [ ] 컴포지션 패턴 이해 (Card, CardHeader, CardContent, CardFooter)
- [ ] Variant 제거 (TailwindCSS로 커스터마이징)
- [ ] 유연한 레이아웃 확인

**예상 시간:** 30분

---

### Task 4.2: Modal (Dialog) 컴포넌트 구현 및 접근성 개선
**목표:** 접근성을 갖춘 Dialog 컴포넌트

**작업 내용:**
```bash
npx shadcn-ui@latest add dialog
```

**개선 사항:**
1. **접근성**: Radix UI 기반으로 focus trap, ESC 키 지원 자동 제공
2. **일관된 API**: Dialog, DialogContent, DialogHeader 등 컴포지션
3. **Portal 사용**: body에 렌더링

**`src/components/ui/dialog.tsx` (shadcn/ui 제공):**
- Dialog (root)
- DialogTrigger
- DialogContent
- DialogHeader
- DialogTitle
- DialogDescription
- DialogFooter

**Before/After 비교:**
```typescript
// ❌ Before (접근성 부족)
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="제목"
  size="large"
  showFooter
  footerContent={<Button onClick={onClose}>닫기</Button>}
>
  내용
</Modal>

// ✅ After (Radix UI 기반 접근성)
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>
        설명 (선택사항)
      </DialogDescription>
    </DialogHeader>
    <div>내용</div>
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>닫기</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**접근성 개선 사항:**
- ✅ ESC 키로 닫기
- ✅ Focus trap (모달 내부로 포커스 제한)
- ✅ `role="dialog"`, `aria-modal="true"` 자동 추가
- ✅ `aria-labelledby`, `aria-describedby` 자동 연결
- ✅ Overlay 클릭으로 닫기
- ✅ 모달 열릴 때 body scroll 방지

**체크리스트:**
- [ ] Dialog 컴포넌트 설치
- [ ] 접근성 기능 테스트 (ESC 키, focus trap)
- [ ] DialogHeader, DialogTitle, DialogDescription 구조 이해
- [ ] Portal 렌더링 확인
- [ ] Storybook a11y addon으로 검증

**예상 시간:** 45분

---

### Task 4.3: Table 컴포넌트 구현 및 도메인 로직 분리
**목표:** 도메인 로직 없는 범용 Table 컴포넌트

**작업 내용:**
```bash
npx shadcn-ui@latest add table
```

**개선 사항:**
1. **도메인 로직 제거**: `entityType`, `renderCell` 로직 제거
2. **Column 정의 개선**: render 함수를 컬럼 정의에 포함
3. **접근성**: `aria-sort` 추가

**`src/components/ui/table.tsx` (shadcn/ui 제공):**
```typescript
// 기본 Table 컴포넌트들
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
```

**커스텀 DataTable 컴포넌트 (도메인 중립적):**
```typescript
// src/components/ui/data-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column<T> {
  key: string
  header: string
  cell?: (row: T) => React.ReactNode  // 커스텀 렌더링
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick?.(row)}
            className={onRowClick ? "cursor-pointer" : ""}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.cell
                  ? column.cell(row)
                  : row[column.key as keyof T] as React.ReactNode
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

**Before/After 비교:**
```typescript
// ❌ Before (도메인 로직 포함)
<Table
  data={users}
  entityType="user"  // Table이 user 도메인을 알아야 함
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// ✅ After (도메인 중립적)
<DataTable
  columns={[
    { key: 'id', header: 'ID' },
    { key: 'username', header: '사용자명' },
    {
      key: 'role',
      header: '역할',
      cell: (user) => <Badge>{user.role}</Badge>  // 도메인 로직은 외부에서
    },
    {
      key: 'actions',
      header: '관리',
      cell: (user) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleEdit(user)}>수정</Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={user.role === 'admin'}  // 비즈니스 규칙은 외부에서
            onClick={() => handleDelete(user.id)}
          >
            삭제
          </Button>
        </div>
      )
    }
  ]}
  data={users}
/>
```

**체크리스트:**
- [ ] shadcn/ui Table 설치
- [ ] DataTable 래퍼 컴포넌트 작성
- [ ] 도메인 로직 제거 확인
- [ ] Column render 함수 패턴 이해
- [ ] 페이지네이션 (선택사항)
- [ ] 정렬 기능 (선택사항)

**예상 시간:** 60분

---

## Phase 5: 페이지 마이그레이션 및 아키텍처 개선

### Task 5.1: ManagementPage 리팩토링 - 도메인 로직 분리
**목표:** UI와 비즈니스 로직 분리

**작업 내용:**

#### 5.1.1 Custom Hooks 생성

**`src/hooks/use-users.ts` (User 도메인 로직):**
```typescript
import { useState, useEffect } from 'react'
import { userService, type User } from '@/services/userService'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await userService.getAll()
      setUsers(data)
    } catch (err: any) {
      setError(err.message || '사용자 목록을 불러올 수 없습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    try {
      await userService.create(data)
      await loadUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const updateUser = async (id: number, data: Partial<User>) => {
    try {
      await userService.update(id, data)
      await loadUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id)
      await loadUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refresh: loadUsers,
  }
}
```

**`src/hooks/use-posts.ts` (Post 도메인 로직):**
```typescript
// 동일한 패턴으로 구현
```

#### 5.1.2 도메인별 컴포넌트 생성

**`src/components/domain/user-table-columns.tsx`:**
```typescript
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { User } from '@/services/userService'

export function getUserTableColumns(
  onEdit: (user: User) => void,
  onDelete: (id: number) => void
) {
  return [
    { key: 'id', header: 'ID' },
    { key: 'username', header: '사용자명' },
    { key: 'email', header: '이메일' },
    {
      key: 'role',
      header: '역할',
      cell: (user: User) => {
        const roleConfig = {
          admin: { label: '관리자', variant: 'destructive' as const },
          moderator: { label: '운영자', variant: 'default' as const },
          user: { label: '사용자', variant: 'secondary' as const },
        }
        const config = roleConfig[user.role]
        return <Badge variant={config.variant}>{config.label}</Badge>
      }
    },
    {
      key: 'status',
      header: '상태',
      cell: (user: User) => {
        const statusConfig = {
          active: { label: '활성', variant: 'default' as const },
          inactive: { label: '비활성', variant: 'secondary' as const },
          suspended: { label: '정지', variant: 'destructive' as const },
        }
        const config = statusConfig[user.status]
        return <Badge variant={config.variant}>{config.label}</Badge>
      }
    },
    { key: 'createdAt', header: '생성일' },
    { key: 'lastLogin', header: '마지막 로그인' },
    {
      key: 'actions',
      header: '관리',
      cell: (user: User) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onEdit(user)}>
            수정
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={user.role === 'admin'}
            onClick={() => onDelete(user.id)}
          >
            삭제
          </Button>
        </div>
      )
    }
  ]
}
```

**`src/components/domain/user-form.tsx`:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

// Zod schema로 검증 로직 분리
const userFormSchema = z.object({
  username: z.string()
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .max(20, '사용자명은 20자 이하여야 합니다')
    .regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다')
    .refine((val) => {
      const reservedWords = ['admin', 'root', 'system', 'administrator']
      return !reservedWords.includes(val.toLowerCase())
    }, {
      message: '예약된 사용자명입니다'
    }),
  email: z.string()
    .email('올바른 이메일 형식이 아닙니다')
    .refine((email) => {
      return email.endsWith('@company.com') || email.endsWith('@example.com')
    }, {
      message: '회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다'
    }),
  role: z.enum(['user', 'moderator', 'admin']),
  status: z.enum(['active', 'inactive', 'suspended']),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>
  onSubmit: (data: UserFormValues) => void
  onCancel: () => void
}

export function UserForm({ defaultValues, onSubmit, onCancel }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'user',
      status: 'active',
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>역할</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">사용자</SelectItem>
                    <SelectItem value="moderator">운영자</SelectItem>
                    <SelectItem value="admin">관리자</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상태</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                    <SelectItem value="suspended">정지</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit">
            저장
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

#### 5.1.3 ManagementPage 리팩토링

**`src/pages/management-page.tsx`:**
```typescript
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DataTable } from '@/components/ui/data-table'
import { useUsers } from '@/hooks/use-users'
import { usePosts } from '@/hooks/use-posts'
import { getUserTableColumns } from '@/components/domain/user-table-columns'
import { getPostTableColumns } from '@/components/domain/post-table-columns'
import { UserForm } from '@/components/domain/user-form'
import { PostForm } from '@/components/domain/post-form'

export function ManagementPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('posts')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const users = useUsers()
  const posts = usePosts()

  const currentData = activeTab === 'users' ? users : posts

  const handleCreate = async (data: any) => {
    const result = activeTab === 'users'
      ? await users.createUser(data)
      : await posts.createPost(data)

    if (result.success) {
      setIsCreateDialogOpen(false)
      setSuccessMessage(`${activeTab === 'users' ? '사용자' : '게시글'}가 생성되었습니다`)
    } else {
      setErrorMessage(result.error || '생성에 실패했습니다')
    }
  }

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (data: any) => {
    if (!selectedItem) return

    const result = activeTab === 'users'
      ? await users.updateUser(selectedItem.id, data)
      : await posts.updatePost(selectedItem.id, data)

    if (result.success) {
      setIsEditDialogOpen(false)
      setSelectedItem(null)
      setSuccessMessage(`${activeTab === 'users' ? '사용자' : '게시글'}가 수정되었습니다`)
    } else {
      setErrorMessage(result.error || '수정에 실패했습니다')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    const result = activeTab === 'users'
      ? await users.deleteUser(id)
      : await posts.deletePost(id)

    if (result.success) {
      setSuccessMessage('삭제되었습니다')
    } else {
      setErrorMessage(result.error || '삭제에 실패했습니다')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">관리 시스템</h1>
        <p className="text-muted-foreground">사용자와 게시글을 관리하세요</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="posts">게시글</TabsTrigger>
          <TabsTrigger value="users">사용자</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              새로 만들기
            </Button>
          </div>

          {successMessage && (
            <Alert className="mb-4" variant="default">
              <AlertTitle>성공</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {errorMessage && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="users">
            <DataTable
              columns={getUserTableColumns(handleEdit, handleDelete)}
              data={users.users}
            />
          </TabsContent>

          <TabsContent value="posts">
            <DataTable
              columns={getPostTableColumns(handleEdit, handleDelete, posts.publishPost, posts.archivePost)}
              data={posts.posts}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              새 {activeTab === 'users' ? '사용자' : '게시글'} 만들기
            </DialogTitle>
          </DialogHeader>
          {activeTab === 'users' ? (
            <UserForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          ) : (
            <PostForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activeTab === 'users' ? '사용자' : '게시글'} 수정
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            activeTab === 'users' ? (
              <UserForm
                defaultValues={selectedItem}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            ) : (
              <PostForm
                defaultValues={selectedItem}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

**개선 사항 요약:**
1. ✅ 인라인 스타일 제거 → TailwindCSS 클래스 사용
2. ✅ 도메인 로직을 Custom Hooks로 분리
3. ✅ Form 검증 로직을 Zod schema로 분리
4. ✅ 도메인별 컴포넌트 분리 (user-form, post-form)
5. ✅ Table 렌더링 로직을 column 정의로 분리
6. ✅ 비즈니스 규칙을 페이지 레벨로 이동

**체크리스트:**
- [ ] Custom Hooks 작성 (use-users, use-posts)
- [ ] 도메인별 Form 컴포넌트 작성
- [ ] 도메인별 Table Columns 작성
- [ ] ManagementPage 리팩토링
- [ ] 인라인 스타일 모두 제거
- [ ] 기능 동작 확인

**예상 시간:** 120분

---

## Phase 6: Storybook 문서화

### Task 6.1: 모든 UI 컴포넌트 Stories 작성
**목표:** 각 컴포넌트의 모든 variant와 상태를 Storybook에 문서화

**작업 내용:**

#### 컴포넌트별 Story 파일 작성
- `button.stories.tsx` (완료)
- `badge.stories.tsx`
- `alert.stories.tsx`
- `input.stories.tsx`
- `select.stories.tsx`
- `textarea.stories.tsx`
- `card.stories.tsx`
- `dialog.stories.tsx`
- `table.stories.tsx`

**예시: `badge.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
```

**체크리스트:**
- [ ] 모든 UI 컴포넌트 stories 작성 완료
- [ ] 각 variant와 size별 예시 포함
- [ ] Interactive controls 설정
- [ ] Accessibility addon으로 검증
- [ ] Documentation 자동 생성 확인

**예상 시간:** 90분

---

### Task 6.2: 도메인 컴포넌트 Stories 작성
**목표:** 실제 사용 예시를 보여주는 복합 컴포넌트 stories

**작업 내용:**

**`user-form.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { UserForm } from './user-form';

const meta = {
  title: 'Domain/UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
  args: {
    onSubmit: (data) => console.log('Create:', data),
    onCancel: () => console.log('Cancel'),
  },
};

export const EditMode: Story = {
  args: {
    defaultValues: {
      username: 'johndoe',
      email: 'john@company.com',
      role: 'moderator',
      status: 'active',
    },
    onSubmit: (data) => console.log('Update:', data),
    onCancel: () => console.log('Cancel'),
  },
};
```

**`management-page.stories.tsx` (전체 페이지):**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ManagementPage } from './management-page';

const meta = {
  title: 'Pages/ManagementPage',
  component: ManagementPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

**체크리스트:**
- [ ] UserForm, PostForm stories 작성
- [ ] ManagementPage story 작성
- [ ] 실제 동작 시나리오 포함
- [ ] Mock data 활용

**예상 시간:** 45분

---

## Phase 7: 심화 기능 - Dark Mode 지원

### Task 7.1: Dark Mode 구현
**목표:** CSS 변수 기반 Dark mode 지원

**작업 내용:**

#### 7.1.1 Dark Mode Provider 설정
```bash
npm install next-themes
```

**`src/components/theme-provider.tsx`:**
```typescript
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

#### 7.1.2 App에 Provider 추가
**`src/App.tsx`:**
```typescript
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      {/* Your app */}
    </ThemeProvider>
  )
}
```

**체크리스트:**
- [ ] ThemeProvider 구현
- [ ] localStorage에 테마 설정 저장
- [ ] system 테마 지원 (OS 설정 따라가기)
- [ ] 모든 컴포넌트 dark mode 스타일 확인

**예상 시간:** 45분

---

### Task 7.2: Dark Mode Toggle 버튼 구현
**목표:** 사용자가 테마를 쉽게 전환할 수 있는 UI

**작업 내용:**
```bash
npx shadcn-ui@latest add dropdown-menu
```

**`src/components/theme-toggle.tsx`:**
```typescript
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**ManagementPage에 추가:**
```typescript
import { ThemeToggle } from "@/components/theme-toggle"

export function ManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">관리 시스템</h1>
          <p className="text-muted-foreground">사용자와 게시글을 관리하세요</p>
        </div>
        <ThemeToggle />
      </div>
      {/* ... */}
    </div>
  )
}
```

**체크리스트:**
- [ ] ThemeToggle 컴포넌트 구현
- [ ] Light/Dark/System 옵션 제공
- [ ] 아이콘 애니메이션 확인
- [ ] 접근성 확인 (sr-only 텍스트)
- [ ] 페이지에 통합

**예상 시간:** 30분

---

## Phase 8: 최종 점검 및 문서화

### Task 8.1: README 업데이트
**목표:** Before/After 비교 및 개선사항 문서화

**작업 내용:**

**`packages/after/README.md` 작성:**
```markdown
# Modern Design System (After)

## 🎯 개선 사항

### 1. 일관된 컴포넌트 API
**Before:**
- FormInput: `width="full"`
- FormSelect: `size="md"`
- FormTextarea: size/width prop 없음

**After:**
- 모든 Form 컴포넌트가 동일한 API 사용
- React Hook Form 통합으로 일관된 인터페이스

### 2. 도메인 로직과 UI 분리
**Before:**
```typescript
<Button entityType="user" action="delete" entity={user} />
```

**After:**
```typescript
<Button variant="destructive" disabled={user.role === 'admin'} onClick={handleDelete}>
  Delete
</Button>
```

### 3. 타입 안전성 개선
- `any` 타입 제거
- CVA를 통한 variant 타입 추론
- Zod를 통한 런타임 검증

### 4. 접근성 개선
- Radix UI 기반 컴포넌트 (Dialog, Select 등)
- ARIA 속성 자동 적용
- 키보드 네비게이션 지원

### 5. 현대적인 도구 사용
- TailwindCSS: 유틸리티 우선 스타일링
- CVA: Variant 패턴
- shadcn/ui: 복사 가능한 컴포넌트
- Storybook: 컴포넌트 문서화

## 🚀 실행 방법

\`\`\`bash
npm install
npm run dev
npm run storybook
\`\`\`

## 📦 설치된 패키지

- React + TypeScript + Vite
- TailwindCSS v4
- shadcn/ui
- class-variance-authority (CVA)
- Radix UI
- React Hook Form + Zod
- Storybook
- lucide-react (아이콘)
```

**체크리스트:**
- [ ] Before/After 비교표 작성
- [ ] 개선 사항 구체적으로 문서화
- [ ] 실행 방법 명시
- [ ] 스크린샷 추가 (선택사항)

**예상 시간:** 45분

---

### Task 8.2: 체크리스트 검증
**목표:** 모든 필수 및 심화 요구사항 완료 확인

**필수 구현 사항:**
- [ ] after 패키지에 디자인 시스템 구현 완료
- [ ] PostManagement 페이지 마이그레이션 완료
- [ ] Storybook에 주요 컴포넌트 stories 작성
- [ ] README에 before/after 비교 및 개선사항 문서화

**심화 구현 사항:**
- [ ] Dark mode 지원
- [ ] Dark mode toggle 버튼

**추가 검증:**
- [ ] 모든 컴포넌트에서 도메인 로직 제거 확인
- [ ] 일관된 API 설계 확인
- [ ] TypeScript 에러 없음
- [ ] Accessibility 검증 (Storybook a11y addon)
- [ ] 코드 리뷰 및 리팩토링

**예상 시간:** 30분

---

## 우선순위 및 예상 작업 시간

### 우선순위 High (필수)
| Phase | Task | 예상 시간 | 난이도 |
|-------|------|----------|-------|
| Phase 1 | 프로젝트 셋업 (1.1-1.5) | 110분 | ⭐⭐ |
| Phase 2 | Button, Badge, Alert 구현 (2.1-2.4) | 145분 | ⭐⭐⭐ |
| Phase 3 | Form 컴포넌트 마이그레이션 (3.1-3.3) | 120분 | ⭐⭐⭐⭐ |
| Phase 4 | Card, Dialog, Table 구현 (4.1-4.3) | 135분 | ⭐⭐⭐⭐ |
| Phase 5 | ManagementPage 리팩토링 (5.1) | 120분 | ⭐⭐⭐⭐⭐ |

**필수 작업 총 예상 시간: 약 10시간 30분**

### 우선순위 Medium (문서화)
| Phase | Task | 예상 시간 | 난이도 |
|-------|------|----------|-------|
| Phase 6 | Storybook 문서화 (6.1-6.2) | 135분 | ⭐⭐⭐ |
| Phase 8.1 | README 작성 | 45분 | ⭐⭐ |

**문서화 총 예상 시간: 약 3시간**

### 우선순위 Low (심화)
| Phase | Task | 예상 시간 | 난이도 |
|-------|------|----------|-------|
| Phase 7 | Dark Mode 구현 (7.1-7.2) | 75분 | ⭐⭐⭐ |

**심화 총 예상 시간: 약 1시간 15분**

---

## 전체 프로젝트 예상 소요 시간
- **필수 작업**: 10.5시간
- **문서화**: 3시간
- **심화 기능**: 1.25시간
- **버퍼 (디버깅, 테스트)**: 3시간

**총 예상 시간: 약 17-20시간**

---

## 학습 목표 달성 체크리스트

### Atomic Design Pattern 이해
- [ ] Atomic Design의 개념 이해 (컴포넌트 조합과 재사용성)
- [ ] 폴더 구조는 개발 편의성에 맞춰 조정 가능함을 이해
- [ ] shadcn/ui의 `components/ui/` 단순 구조 이해

### CSS-in-JS vs TailwindCSS
- [ ] 인라인 스타일의 문제점 체감
- [ ] 하드코딩된 스타일 값의 유지보수 어려움 이해
- [ ] TailwindCSS 유틸리티 우선 접근법 이해
- [ ] CSS 변수 기반 테마 시스템 이해

### 현대적인 도구 학습
- [ ] CVA를 통한 Variants 패턴 학습
- [ ] shadcn/ui CLI 사용법 이해
- [ ] Radix UI 기반 접근성 구현 이해
- [ ] Storybook으로 컴포넌트 문서화

### 아키텍처 설계
- [ ] UI 컴포넌트와 도메인 로직 분리
- [ ] Custom Hooks를 통한 상태 관리
- [ ] React Hook Form + Zod로 검증 분리
- [ ] 컴포지션 패턴 이해

---

## 참고 자료
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [CVA 공식 문서](https://cva.style/docs)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [Storybook 공식 문서](https://storybook.js.org/docs/react/get-started/introduction)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Radix UI](https://www.radix-ui.com/)
