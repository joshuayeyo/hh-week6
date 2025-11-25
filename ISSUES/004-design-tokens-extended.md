## Description

`packages/before/`의 하드코딩된 Typography, Spacing, Shadow 값을 분석하여 디자인 토큰으로 추가하고, `components.css`에 컬러 토큰을 적용합니다.

**목표**: 완전한 디자인 토큰 시스템 구축

- Typography 토큰 추가 (font-size, font-weight, line-height)
- Spacing 토큰 추가 (padding, margin, gap)
- Shadow 토큰 추가 (box-shadow)
- components.css에 기존 컬러 토큰 적용

**선행 작업**: Issue 003 (컬러 토큰 구현)

## Todo

### Task 4.1: 토큰 파일 구조 개선

- [x] `Primitives/` 폴더 생성 및 `Colors.css` 분리
- [x] `Semantics/` 폴더 생성 및 `Colors.css` 분리
- [x] 기존 `primitives.css`, `semantics.css` 삭제
- [x] `index.css` import 경로 수정
- [x] 각 폴더에 `index.css` 생성 (named-export 방식)

### Task 4.2: Before 패키지 값 분석

- [x] Typography 값 추출 (10px, 12px, 14px, 16px, 18px, 20px, 24px, 28px)
- [x] Spacing 값 추출 (4px, 8px, 12px, 16px, 20px, 24px)
- [x] Shadow 값 추출 (card, modal 등)

### Task 4.3: 토큰 정의

- [x] `Primitives/Typography.css` 생성
- [x] `Primitives/Spacing.css` 생성
- [x] `Primitives/Shadow.css` 생성
- [x] `Semantics/Typography.css` 생성
- [x] `Semantics/Spacing.css` 생성
- [x] `Semantics/Shadow.css` 생성

### Task 4.4: index.css @theme 블록 업데이트

- [x] Typography 토큰 Tailwind 연결
- [x] Spacing 토큰 Tailwind 연결
- [x] Shadow 토큰 Tailwind 연결
- [x] 주석 업데이트

### Task 4.5: components.css 토큰 적용

- [x] 버튼 스타일에 토큰 적용
- [x] 폼 스타일에 토큰 적용
- [x] 카드 스타일에 토큰 적용
- [x] 뱃지 스타일에 토큰 적용
- [x] 알림 스타일에 토큰 적용
- [x] 기타 컴포넌트 스타일에 토큰 적용 (체크박스, 텍스트에어리어, 테이블, 모달)

### Task 4.6: 검증

- [ ] Storybook에서 토큰 확인
- [ ] 기존 컴포넌트 스타일 정상 동작 확인

## ETC

### Before 패키지 분석 결과

**Typography:**
| 용도 | 값 |
|------|-----|
| xs | 10px |
| sm | 12px |
| base | 14px |
| md | 15px |
| lg | 16px |
| xl | 18px |
| 2xl | 20px |
| 3xl | 24px |
| 4xl | 28px |

**Spacing:**
| 용도 | 값 |
|------|-----|
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |

**Shadow:**
| 용도 | 값 |
|------|-----|
| sm | card-default |
| md | card-elevated |
| lg | modal |

### 다음 단계

- Issue 005: Button 컴포넌트 구현
- Issue 006: Badge 컴포넌트 구현
- Issue 007: Alert 컴포넌트 구현
