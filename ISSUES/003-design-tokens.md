## Description

`packages/before/`의 하드코딩된 컬러 값을 분석하여 `packages/after/`의 CSS 변수 기반 디자인 토큰으로 매핑합니다.

**목표**: 일관된 디자인 시스템을 위한 디자인 토큰 정의
- before 패키지 컬러 분석 및 정리
- CSS 변수에 before 컬러 매핑
- 다크 모드 컬러 정의
- TailwindCSS @theme 블록 업데이트

**참조 문서**: `markdowns/spec/improvement-spec-en.md` - Section 3.2

## Todo

### Task 3.1: Before 패키지 컬러 분석

- [ ] `packages/before/src/styles/components.css` 컬러 값 추출
- [ ] 컬러 용도별 분류 (Primary, Secondary, Destructive, Success, Warning, Info)
- [ ] HSL 값으로 변환

### Task 3.2: CSS 변수 매핑

- [ ] `src/styles/index.css`의 `:root` 변수 업데이트
- [ ] `.dark` 클래스 다크 모드 컬러 정의
- [ ] `@theme` 블록 업데이트

### Task 3.3: 추가 시맨틱 컬러 정의

- [ ] Success 컬러 추가 (`--success`, `--success-foreground`)
- [ ] Warning 컬러 추가 (`--warning`, `--warning-foreground`)
- [ ] Info 컬러 추가 (`--info`, `--info-foreground`)

### Task 3.4: 검증

- [ ] Storybook에서 컬러 확인
- [ ] 다크 모드 전환 테스트

## ETC

### Before 패키지 컬러 분석 결과

| 용도 | HEX | HSL | CSS 변수 |
|------|-----|-----|----------|
| Primary | `#1976d2` | `207 68% 46%` | `--primary` |
| Primary Hover | `#1565c0` | `207 78% 42%` | - |
| Danger/Error | `#d32f2f` | `0 65% 51%` | `--destructive` |
| Success | `#388e3c` | `123 41% 39%` | `--success` |
| Warning | `#f57c00` | `29 100% 48%` | `--warning` |
| Info | `#0288d1` | `199 98% 41%` | `--info` |
| Secondary (Badge) | `#757575` | `0 0% 46%` | `--secondary` |
| Secondary (Button) | `#f5f5f5` | `0 0% 96%` | `--muted` |
| Text Primary | `#333` / `rgba(0,0,0,0.87)` | `0 0% 20%` | `--foreground` |
| Text Secondary | `#666` / `rgba(0,0,0,0.6)` | `0 0% 40%` | `--muted-foreground` |
| Border | `#ccc` / `#ddd` | `0 0% 80%` | `--border` |
| Background | `#fff` | `0 0% 100%` | `--background` |
| Background Alt | `#f5f5f5` / `#fafafa` | `0 0% 96%` | `--muted` |

### 다음 단계

- Issue 004: Button 컴포넌트 구현
- Issue 005: Badge 컴포넌트 구현
- Issue 006: Alert 컴포넌트 구현

### 참조 링크

- [HSL Color Picker](https://hslpicker.com/)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
