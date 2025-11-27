## Description

Form 관련 컴포넌트(Input, Select, Checkbox, Textarea)를 CVA 기반으로 재구성합니다.
기존 molecules/ 폴더의 Form 컴포넌트를 forms/ 카테고리로 이동하고 순수 UI 컴포넌트로 재작성합니다.

**목표**: 도메인 로직이 분리된 재사용 가능한 Form UI 컴포넌트 구축

- Input 컴포넌트 CVA 기반 구현
- Select 컴포넌트 CVA 기반 구현
- Checkbox 컴포넌트 CVA 기반 구현
- Textarea 컴포넌트 CVA 기반 구현
- Label 컴포넌트 CVA 기반 구현
- 기존 molecules/Form* 컴포넌트 삭제

**선행 작업**: Issue 005 (shadcn/ui 설치 및 기본 컴포넌트)

## Todo

### Task 6.1: Input 컴포넌트 구현

- [x] Input 컴포넌트 CVA 기반 구현
- [x] variants 정의: default, error
- [x] sizes 정의: default, sm, lg
- [x] Input.stories.tsx 작성

### Task 6.2: Select 컴포넌트 구현

- [x] Select 컴포넌트 CVA 기반 구현
- [x] Select, SelectOption 분리
- [x] Select.stories.tsx 작성

### Task 6.3: Checkbox 컴포넌트 구현

- [x] Checkbox 컴포넌트 CVA 기반 구현
- [x] Checkbox.stories.tsx 작성

### Task 6.4: Textarea 컴포넌트 구현

- [x] Textarea 컴포넌트 CVA 기반 구현
- [x] Textarea.stories.tsx 작성

### Task 6.5: Label 컴포넌트 구현

- [x] Label 컴포넌트 CVA 기반 구현
- [x] variants 정의: default, error

### Task 6.6: 폴더 구조 정리

- [x] 기존 molecules/ 폴더 삭제
- [x] forms/ 카테고리에 통합
- [x] index.ts export 정리

### Task 6.7: 검증

- [x] Storybook에서 컴포넌트 확인
- [x] TypeScript 에러 없음 확인

## ETC

### Before (molecules/ 구조)

```
molecules/
├── FormCheckbox.tsx  # 도메인 로직 포함
├── FormInput.tsx     # 비즈니스 규칙 검증 포함
├── FormSelect.tsx
├── FormTextarea.tsx
└── index.ts
```

### After (forms/ 구조)

```
forms/
├── Input.tsx      # 순수 UI, CVA variants
├── Select.tsx     # 순수 UI, CVA variants
├── Checkbox.tsx   # 순수 UI, CVA variants
├── Textarea.tsx   # 순수 UI, CVA variants
├── Label.tsx      # 순수 UI, CVA variants
└── index.ts
```

### 최종 컴포넌트 구조

```
components/
├── primitives/   # Button, Badge
├── feedback/     # Alert
├── layout/       # Card, Header, Modal
├── data/         # Table
└── forms/        # Input, Select, Checkbox, Textarea, Label
```

### 참고 문서

- [shadcn/ui Input](https://ui.shadcn.com/docs/components/input)
- [shadcn/ui Select](https://ui.shadcn.com/docs/components/select)
- [shadcn/ui Checkbox](https://ui.shadcn.com/docs/components/checkbox)
- [shadcn/ui Textarea](https://ui.shadcn.com/docs/components/textarea)
