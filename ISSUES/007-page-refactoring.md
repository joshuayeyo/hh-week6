## Description

App.tsx와 ManagementPage.tsx를 새로운 컴포넌트 구조에 맞게 리팩토링합니다.
기존 atoms, molecules, organisms 경로를 새로운 카테고리 기반 구조로 변경합니다.

**목표**:
- 새로운 컴포넌트 구조 적용으로 빌드 에러 해결
- ManagementPage 648줄 → 150줄 이하로 분리
- 순수 UI 컴포넌트와 도메인 로직 분리

**문제점**:
- App.tsx: `./components/organisms` 경로 참조 (삭제됨)
- ManagementPage.tsx: `../components/atoms`, `../components/molecules`, `../components/organisms` 참조 (삭제됨)
- ManagementPage.tsx: 648줄로 80줄 제한 초과
- FormInput, FormSelect 등 도메인 로직이 포함된 컴포넌트 사용

**선행 작업**: Issue 006 (Form 컴포넌트)

## Todo

### Task 7.1: App.tsx 리팩토링

- [x] Header import 경로 수정 (organisms → layout)
- [x] 빌드 확인

### Task 7.2: ManagementPage 분리 설계

- [x] 페이지 구조 분석
- [x] 분리할 컴포넌트 목록 정의
- [x] hooks 분리 계획

### Task 7.3: Custom Hooks 분리

- [x] useEntityData hook 생성 (데이터 로드/CRUD)
- [x] useEntityForm hook 생성 (폼 상태 관리)
- [x] useAlert hook 생성 (알림 상태 관리)

### Task 7.4: 컴포넌트 분리

- [x] EntityTabs 컴포넌트 분리
- [x] StatsGrid 컴포넌트 분리
- [x] EntityTable 컴포넌트 분리 (Table wrapper)
- [x] EntityFormFields 컴포넌트 분리

### Task 7.5: ManagementPage 리팩토링

- [x] import 경로 수정
- [x] 분리된 컴포넌트/hooks 적용
- [x] 150줄 이하로 축소 (648줄 → 150줄)

### Task 7.6: 검증

- [x] npm run dev 정상 동작
- [x] TypeScript 에러 없음
- [x] npm run build 성공

## ETC

### Before (이전 구조)

```
ManagementPage.tsx (648줄)
├── 상태 관리 (10+ useState)
├── 데이터 로드 로직
├── CRUD 핸들러
├── 통계 계산 로직
├── 테이블 컬럼 정의
└── 렌더링 (모달 2개 포함)
```

### After (완료된 구조)

```
pages/
├── ManagementPage.tsx (150줄)
└── management/
    ├── types.ts
    ├── hooks/
    │   ├── index.ts
    │   ├── useEntityData.ts
    │   ├── useEntityForm.ts
    │   └── useAlert.ts
    ├── components/
    │   ├── index.ts
    │   ├── EntityTabs.tsx
    │   ├── StatsGrid.tsx
    │   ├── EntityTable.tsx
    │   └── EntityFormFields.tsx
    └── constants/
        └── tableColumns.ts
```

### Import 경로 변경

```tsx
// Before
import { Button, Badge } from '../components/atoms';
import { Alert, Table, Modal } from '../components/organisms';
import { FormInput, FormSelect, FormTextarea } from '../components/molecules';

// After
import { Button } from '@/components/primitives';
import { Alert, AlertDescription } from '@/components/feedback';
import { Modal, ModalOverlay, ModalContent, ... } from '@/components/layout';
import { Input, Select, Textarea, Label } from '@/components/forms';
```

### 폴더 구조 결정 사유

**질문**: `pages/management/` 안에 hooks, components를 두는 이유?
`src/hooks/`, `src/components/`에 두지 않은 이유는?

**답변**: Feature-based 구조 채택

```
src/
├── components/     # 공용 UI 컴포넌트 (Button, Modal, Table 등)
├── hooks/          # 공용 hooks (비어있음 - 아직 공용 hook 없음)
└── pages/
    └── management/
        ├── hooks/       # ManagementPage 전용 hooks
        ├── components/  # ManagementPage 전용 컴포넌트
        └── constants/   # ManagementPage 전용 상수
```

**이유**:
1. **응집도**: management hooks/components는 ManagementPage에서만 사용됨
2. **명확한 경계**: 페이지 전용 로직과 공용 UI 컴포넌트 분리
3. **스케일링**: 새 페이지 추가 시 `pages/new-page/` 구조 복제 가능
4. **삭제 용이**: 페이지 삭제 시 관련 코드 일괄 제거 가능

**공용 vs 페이지 전용 기준**:
- `src/components/`: 2개 이상 페이지에서 재사용되는 UI
- `src/hooks/`: 2개 이상 페이지에서 재사용되는 로직
- `pages/[name]/`: 해당 페이지에서만 사용되는 코드

### 참고 문서

- CLAUDE.md: 80줄 제한, 함수 15-20줄 제한
- Issue 005, 006: 새로운 컴포넌트 구조
