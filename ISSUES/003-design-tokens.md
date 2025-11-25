## Description

`packages/before/`의 하드코딩된 컬러 값을 분석하여 `packages/after/`의 CSS 변수 기반 디자인 토큰으로 매핑합니다.

**목표**: 일관된 디자인 시스템을 위한 디자인 토큰 정의
- before 패키지 컬러 분석 및 정리
- CSS 변수에 before 컬러 매핑 (Primitives → Semantics 참조 구조)
- 다크 모드 컬러 정의
- TailwindCSS @theme 블록 업데이트

**참조 문서**: `markdowns/spec/improvement-spec-en.md` - Section 3.2

## Todo

### Task 3.1: Before 패키지 컬러 분석

- [x] `packages/before/src/` 전체 컬러 값 추출
- [x] 컬러 용도별 분류 (Primary, Secondary, Destructive, Success, Warning, Info)
- [x] ~~HSL 값으로 변환~~ → HEX 유지 (변경 사유 참조)

### Task 3.2: CSS 변수 매핑

- [x] `primitives.css` 원시 컬러 팔레트 정의 (Material Design 기준 통일)
- [x] `semantics.css` 의미 기반 토큰 정의 (Primitives 참조 방식)
- [x] `index.css` TailwindCSS @theme 블록 업데이트
- [x] `.dark` 클래스 다크 모드 컬러 정의

### Task 3.3: 추가 시맨틱 컬러 정의

- [x] Success 컬러 추가 (`--success`, `--success-foreground`, `--success-light`, etc.)
- [x] Warning 컬러 추가 (`--warning`, `--warning-foreground`, `--warning-light`, etc.)
- [x] Info 컬러 추가 (`--info`, `--info-foreground`, `--info-light`, etc.)
- [x] Neutral 컬러 추가 (`--neutral`, `--neutral-foreground`, `--neutral-light`, etc.)

### Task 3.4: 검증

- [x] Storybook에서 컬러 확인
- [x] 다크 모드 전환 테스트

## ETC

### 변경 사유: HSL → HEX + var() 참조 방식

기존 계획은 HSL 값으로 변환하여 직접 정의하는 방식이었으나, **Primitives 참조 방식**으로 변경함.

**변경 이유:**
1. **단일 진실 공급원 (Single Source of Truth)** - 색상값은 Primitives에만 정의되고, Semantics는 참조만 함
2. **유지보수 용이** - Primitives 값 하나 바꾸면 관련 Semantic 토큰 전부 자동 업데이트
3. **일관성 보장** - 실수로 다른 색상값을 넣는 것을 방지
4. **Material Design 통일** - before 패키지에서 혼용된 Tailwind/Material 컬러를 Material Design 기준으로 통일

**파일 구조:**
```
primitives.css (HEX 원시 컬러)
    ↓ var() 참조
semantics.css (의미 기반 토큰)
    ↓ var() 참조
index.css (@theme로 Tailwind 연결)
```

### Before 패키지 컬러 매핑 결과

| before 원본 | Material Design 통일 | 용도 |
|------------|---------------------|------|
| #007bff | → #1976d2 (blue-600) | Primary |
| #ef4444 | → #d32f2f (red-600) | Destructive |
| #ed6c02 | → #f57c00 (orange-600) | Warning |
| #f7fafc, #f0f0f0 | → #fafafa (gray-50) | Background |
| #1a202c | → #212121 (gray-900) | Text Primary |
| #718096, #6b7280 | → #757575 (gray-600) | Text Secondary |
| #d1d5db, #e5e7eb, #ddd | → #e0e0e0 (gray-300) | Border |

### 다음 단계

- Issue 004: 추가 디자인 토큰 (Typography, Spacing, Shadow) + components.css 토큰 적용
- Issue 005: Button 컴포넌트 구현
- Issue 006: Badge 컴포넌트 구현
- Issue 007: Alert 컴포넌트 구현

### 참조 링크

- [Material Design Color System](https://m2.material.io/design/color/the-color-system.html)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
