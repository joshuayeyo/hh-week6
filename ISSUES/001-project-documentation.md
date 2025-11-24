## Description
프로젝트의 AI 기반 개발 워크플로우와 코딩 표준을 문서화하여 Claude Code 인스턴스가 일관된 품질로 작업할 수 있도록 환경을 구성합니다.

**기술 스택**: React 19, TypeScript, Vite, Vitest

이 이슈는 다음을 포함합니다:
- Claude Code 설정 파일 (CLAUDE.md)
- 개발자/리뷰어 페르소나 정의 (React 19 + TypeScript)
- 코딩 표준 문서화 (영문/한글) - React 컴포넌트 표준 포함
- 개발 워크플로우 문서화 (영문/한글)
- 이슈/PR/리뷰 템플릿 정의

## Todo
- [x] Claude Code 메인 설정 파일 작성 (CLAUDE.md)
- [x] Developer 페르소나 정의 (.claude/personas/DEVELOPER.md)
- [x] Code Reviewer 페르소나 정의 (.claude/personas/PM.md)
- [x] 코딩 표준 문서 작성 (markdowns/coding_standards/)
  - [x] CODING_STANDARDS.md (영문)
  - [x] KR_CODING_STANDARDS.md (한글)
- [x] 개발 워크플로우 문서 작성 (markdowns/dev_workflow/)
  - [x] DEV_WORKFLOW.md (영문)
  - [x] KR_DEV_WORKFLOW.md (한글)
- [x] 템플릿 문서 작성 (markdowns/)
  - [x] ISSUE_TEMPLATE.md
  - [x] KR_PULL_REQUEST_TEMPLATE.md
  - [x] REVIEW_TEMPLATE.md
- [x] 레거시 디자인 시스템 개선 명세서 작성 (markdowns/spec/)
  - [x] improvement-spec-en.md (영문)
  - [x] improvement-spec-kr.md (한글)
- [x] 순차적으로 논리적 단위로 커밋 생성
  - [x] Docs(001): Create project documentation issue
  - [x] Docs(001): Add Developer and Code Reviewer personas
  - [x] Docs(001): Add coding standards documentation
  - [x] Docs(001): Add development workflow documentation
  - [x] Docs(001): Add issue, PR, and review templates
  - [x] Docs(001): Add Claude Code configuration file
  - [x] Docs(001): Add legacy design system improvement specification

## ETC
### 문서화 구조
```
.
├── CLAUDE.md                          # Claude Code 메인 설정
├── .claude/
│   └── personas/
│       ├── DEVELOPER.md               # 개발자 페르소나
│       └── PM.md                      # 코드 리뷰어 페르소나
├── markdowns/
│   ├── coding_standards/
│   │   ├── CODING_STANDARDS.md        # 코딩 표준 (영문)
│   │   └── KR_CODING_STANDARDS.md     # 코딩 표준 (한글)
│   ├── dev_workflow/
│   │   ├── DEV_WORKFLOW.md            # 개발 워크플로우 (영문)
│   │   └── KR_DEV_WORKFLOW.md         # 개발 워크플로우 (한글)
│   ├── issue_template/
│   │   └── ISSUE_TEMPLATE.md          # 이슈 템플릿
│   ├── pull_request_template/
│   │   └── KR_PULL_REQUEST_TEMPLATE.md # PR 템플릿
│   └── review_template/
│       └── REVIEW_TEMPLATE.md         # 코드 리뷰 템플릿
└── ISSUES/
    └── 001-project-documentation.md   # 이 이슈 파일
```

### 핵심 원칙 (React 19 + TypeScript)
- **기술 스택**: React 19, TypeScript (strict mode), Vite
- **파일 길이**: 코드 파일 80줄 제한 (예외는 문서화)
- **함수 길이**: 15-20줄 최대
- **네이밍**: camelCase, PascalCase, UPPER_SNAKE_CASE
- **Props 분리 (CRITICAL)**: 모든 props를 `src/types/*.types.ts`에 분리
- **스타일 상수화 (CRITICAL)**: 모든 인라인 스타일을 파일 최상단에 상수로 선언
- **Import 순서**: React → External → Internal → Types → Utils → Constants → Styles
- **불변성**: spread 연산자 사용
- **타입 안전성**: TypeScript strict mode, `any` 금지
- **테스트**: 코드와 함께 작성
- **커밋**: 원자적이고 논리적 단위

### 커밋 전략
각 문서 그룹을 논리적 단위로 나누어 순차적으로 커밋:
1. ✅ 이슈 문서 (작업 계획)
2. ✅ 페르소나 파일 (개발자/리뷰어 역할 정의)
3. ✅ 코딩 표준 (개발 가이드라인)
4. ✅ 개발 워크플로우 (프로세스 정의)
5. ✅ 템플릿 파일 (이슈/PR/리뷰)
6. ✅ 메인 설정 파일 (전체 통합)
7. ✅ 개선 명세서 (레거시 시스템 분석)

### 완료 내역
- **총 7개 커밋** 완료
- **React 19 + TypeScript** 기반 프로젝트 문서화 완료
- **Props 분리, 스타일 상수화** 등 핵심 원칙 정립
- **AI 기반 개발 워크플로우** 완전히 구축
