## Description

Dark mode 지원 및 토글 버튼을 구현합니다.
과제 심화 요구사항입니다.

**목표**:
- 시스템 설정 기반 다크모드 자동 감지
- 수동 토글 버튼으로 모드 전환
- 사용자 선택 localStorage 저장

## Todo

### Task 9.1: Dark mode 기반 설정

- [ ] CSS 변수 다크모드 값 추가
- [ ] `prefers-color-scheme` 미디어 쿼리 적용
- [ ] html `class="dark"` 토글 방식 구현

### Task 9.2: Theme Provider 구현

- [ ] ThemeContext 생성
- [ ] useTheme hook 생성
- [ ] localStorage 연동

### Task 9.3: Toggle 버튼 구현

- [ ] ThemeToggle 컴포넌트 생성
- [ ] Header에 토글 버튼 추가
- [ ] 아이콘 (sun/moon) 적용

### Task 9.4: 검증

- [ ] 라이트/다크 전환 동작 확인
- [ ] 새로고침 후 설정 유지 확인
- [ ] Storybook에서 확인

## ETC

### 참고

- TailwindCSS dark mode: `darkMode: 'class'`
- shadcn/ui는 CSS 변수 기반으로 이미 다크모드 준비됨
