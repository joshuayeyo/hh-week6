## Description

Form 관련 컴포넌트(Input, Select, Checkbox, Textarea)를 CVA 기반으로 재구성합니다.
기존 molecules/ 폴더의 Form 컴포넌트를 primitives/ 또는 forms/ 카테고리로 이동하고 순수 UI 컴포넌트로 재작성합니다.

**목표**: 도메인 로직이 분리된 재사용 가능한 Form UI 컴포넌트 구축

- Input 컴포넌트 CVA 기반 구현
- Select 컴포넌트 CVA 기반 구현
- Checkbox 컴포넌트 CVA 기반 구현
- Textarea 컴포넌트 CVA 기반 구현
- 기존 molecules/Form* 컴포넌트 삭제

**선행 작업**: Issue 005 (shadcn/ui 설치 및 기본 컴포넌트)

## Todo

### Task 6.1: Input 컴포넌트 구현

- [ ] Input 컴포넌트 CVA 기반 구현
- [ ] variants 정의: default, error
- [ ] sizes 정의: default, sm, lg
- [ ] Input.stories.tsx 작성

### Task 6.2: Select 컴포넌트 구현

- [ ] Select 컴포넌트 CVA 기반 구현
- [ ] SelectTrigger, SelectContent, SelectItem 분리
- [ ] Select.stories.tsx 작성

### Task 6.3: Checkbox 컴포넌트 구현

- [ ] Checkbox 컴포넌트 CVA 기반 구현
- [ ] Checkbox.stories.tsx 작성

### Task 6.4: Textarea 컴포넌트 구현

- [ ] Textarea 컴포넌트 CVA 기반 구현
- [ ] Textarea.stories.tsx 작성

### Task 6.5: 폴더 구조 정리

- [ ] 기존 molecules/ 폴더 삭제
- [ ] forms/ 또는 primitives/에 통합
- [ ] index.ts export 정리

### Task 6.6: 검증

- [ ] Storybook에서 컴포넌트 확인
- [ ] TypeScript 에러 없음 확인

## ETC

### 현재 molecules/ 구조

```
molecules/
├── FormCheckbox.tsx
├── FormInput.tsx
├── FormSelect.tsx
├── FormTextarea.tsx
└── index.ts
```

### 목표 구조

```
forms/
├── Input.tsx
├── Select.tsx
├── Checkbox.tsx
├── Textarea.tsx
└── index.ts
```

### 참고 문서

- [shadcn/ui Input](https://ui.shadcn.com/docs/components/input)
- [shadcn/ui Select](https://ui.shadcn.com/docs/components/select)
- [shadcn/ui Checkbox](https://ui.shadcn.com/docs/components/checkbox)
- [shadcn/ui Textarea](https://ui.shadcn.com/docs/components/textarea)
