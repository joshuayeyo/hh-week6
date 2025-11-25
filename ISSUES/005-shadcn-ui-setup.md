## Description

shadcn/ui를 설치하고 기본 UI 컴포넌트(Button, Badge, Alert)를 구현합니다.
기존 레거시 컴포넌트의 도메인 로직을 제거하고 순수 UI 컴포넌트로 재구성합니다.

**목표**: 도메인 로직이 분리된 재사용 가능한 UI 컴포넌트 구축

- shadcn/ui CLI 설치 및 초기화
- Button 컴포넌트 구현 (CVA variants)
- Badge 컴포넌트 구현
- Alert 컴포넌트 구현
- 기존 atoms/molecules/organisms 폴더 구조를 components/ui로 변경

**선행 작업**: Issue 004 (디자인 토큰 확장)

## Todo

### Task 5.1: shadcn/ui 초기화

- [ ] `npx shadcn@latest init` 실행
- [ ] components.json 설정 확인
- [ ] 기존 components 폴더 백업 또는 삭제

### Task 5.2: Button 컴포넌트 구현

- [ ] `npx shadcn@latest add button` 실행
- [ ] 도메인 로직 제거 (entityType, action, entity props 제거)
- [ ] CVA variants 정의: default, destructive, outline, secondary, ghost, link
- [ ] CVA sizes 정의: default, sm, lg, icon
- [ ] Button.stories.tsx 업데이트 (기존 스토리와 통합)

### Task 5.3: Badge 컴포넌트 구현

- [ ] `npx shadcn@latest add badge` 실행
- [ ] 도메인 로직 제거 (status, userRole, priority, paymentStatus props 제거)
- [ ] CVA variants 정의: default, secondary, destructive, outline
- [ ] Badge.stories.tsx 업데이트

### Task 5.4: Alert 컴포넌트 구현

- [ ] `npx shadcn@latest add alert` 실행
- [ ] 접근성 개선 (role="alert" 확인)
- [ ] variants 정의: default, destructive, success, warning
- [ ] AlertTitle, AlertDescription 분리
- [ ] Alert.stories.tsx 업데이트

### Task 5.5: 폴더 구조 정리

- [ ] 기존 atoms/, molecules/, organisms/ 폴더 삭제
- [ ] components/ui/ 구조로 통합
- [ ] index.ts export 정리

### Task 5.6: 검증

- [ ] Storybook에서 컴포넌트 확인
- [ ] TypeScript 에러 없음 확인
- [ ] 기존 스토리와의 호환성 확인

## ETC

### Before (현재 문제점)

```typescript
// Button.tsx - 도메인 로직이 UI 컴포넌트에 포함됨
<Button
  entityType="user"
  action="delete"
  entity={user}
/>
```

### After (목표)

```typescript
// Button.tsx - 순수 UI 컴포넌트
<Button
  variant="destructive"
  disabled={user.role === 'admin'}  // 비즈니스 로직은 외부에서 처리
  onClick={handleDelete}
>
  Delete
</Button>
```

### 참고 문서

- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [CVA 공식 문서](https://cva.style/docs)
- markdowns/spec/improvement-spec-en.md Phase 2

### 다음 단계

- Issue 006: Form 컴포넌트 마이그레이션 (Input, Select, Textarea, Form)
- Issue 007: 복합 컴포넌트 마이그레이션 (Card, Dialog, Table)
