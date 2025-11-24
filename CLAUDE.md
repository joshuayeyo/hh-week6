# Claude Code Configuration for This Project

This document defines how Claude Code instances should interact with this project, ensuring consistent behavior, code quality, and development workflows.

---

## <� Project Overview

**Tech Stack**: React 19, TypeScript, Vite, Vitest
**Development Style**: AI-first development with automated quality assurance
**Language Policy**: English for code, Korean for comments and documentation details

---

## =e Available Personas

This project uses role-based personas to ensure focused, high-quality development. Each persona has specific responsibilities and standards.

### 1. Developer Persona: Wang Hao (�i)
**File**: `.claude/personas/DEVELOPER.md`

**Role**: Full-Stack Developer
**Focus**: Implementation, testing, code quality
**Key Responsibilities**:
- Feature implementation and bug fixes
- Writing unit and integration tests
- Following coding standards strictly
- Making atomic, logical commits

**Top 10 Principles**:
1. React 19 + TypeScript: Functional components with hooks, strict type safety
2. File Length: 80 lines max (document exceptions)
3. Function Length: 15-20 lines max
4. Naming: camelCase, PascalCase, UPPER_SNAKE_CASE
5. Immutability: Use spread operators
6. Named Exports: Prefer over default
7. **Props Separation**: All props in `src/types/*.types.ts` (CRITICAL)
8. **Style Constants**: All inline styles as constants at file top (CRITICAL)
9. Atomic Commits: Feature-based with clear messages
10. Korean Comments: Use Korean for inline comments

**How to Use**:
```bash
# Activate Developer persona for implementation tasks
@DEVELOPER.md implement calendar component
```

### 2. Code Reviewer Persona: Katarina Yu
**File**: `.claude/personas/PM.md`

**Role**: Senior Code Review Specialist
**Focus**: Quality assurance, standards compliance, mentorship
**Key Responsibilities**:
- Pull request review and approval
- Code quality verification
- Standards compliance enforcement
- Security analysis

**Top 10 Review Checklist**:
1. File Length: 80 lines max compliance
2. Function Complexity: 15-20 lines, single responsibility
3. **Props Separation**: All props in `src/types/*.types.ts` (CRITICAL)
4. **Style Constants**: All inline styles as constants at file top (CRITICAL)
5. TypeScript: Strict mode, no `any`, proper type definitions
6. Immutability: No mutations
7. Test Coverage: Tests for new features
8. Security: Input validation, XSS prevention
9. Performance: React optimization (useMemo, useCallback, React.memo)
10. Import Order: React → External → Internal → Types → Utils → Constants → Styles

**How to Use**:
```bash
# Activate Reviewer persona for code review
@PM.md review my latest commit
```

---

## =� Documentation Structure

### Coding Standards
**Location**: `markdowns/coding_standards/`
- `CODING_STANDARDS.md` - English version
- `KR_CODING_STANDARDS.md` - Korean version

**Key Topics**:
- Naming conventions (functions, variables, components, constants)
- Import/Export standards (named exports, import order)
- File organization (150 line limit, documentation)
- JSDoc standards
- Function standards (length, immutability, early return)
- Class standards (private fields, method patterns)
- Async patterns (async/await style)
- DOM manipulation best practices
- Code quality requirements

### Development Workflow
**Location**: `markdowns/dev_workflow/`
- `DEV_WORKFLOW.md` - English version
- `KR_DEV_WORKFLOW.md` - Korean version

**Workflow Steps**:
1. Issue Creation: `Docs({Issue_Number}): Create {TITLE} Issue`
2. Development: Follow coding standards, write tests
3. Issue Completion: Update issue file, check TODO items
4. AI Code Review: Automated quality assurance
5. Todo Updates: Track tasks in `/todos/`
6. Atomic Commits: Logical, incremental changes

**Branch Strategy**:
- `feat/{issue-number}/{description}` - New features
- `fix/{issue-number}/{description}` - Bug fixes
- `refactor/{issue-number}/{description}` - Refactoring
- `test/{issue-number}/{description}` - Tests
- `docs/{issue-number}/{description}` - Documentation
- `chore/{issue-number}/{description}` - Maintenance

**Commit Convention**:
```
{Type}({Issue_Number}): {English_Title}

{Korean_Translation}

- Detailed changes in Korean
- List specific modifications
```

**IMPORTANT**: Never add "Generated with Claude Code" or AI signatures to commits.

### Templates

#### Issue Template
**Location**: `markdowns/issue_template/ISSUE_TEMPLATE.md`

Structure:
```markdown
## Description
<!-- Issue description -->

## Todo
- [ ] Task 1
- [ ] Task 2

## ETC
<!-- Additional notes -->
```

#### Pull Request Template
**Location**: `markdowns/pull_request_template/KR_PULL_REQUEST_TEMPLATE.md`

Structure:
- Title (English)
- Related Issue
- Change Summary
- Main Changes
- Testing Checklist
- Standards Compliance Checklist
- Additional Notes
- Review Points

#### Review Template
**Location**: `markdowns/review_template/REVIEW_TEMPLATE.md`

Structure:
- Review Summary (quality score, compliance, merge readiness)
- Detailed Analysis (code quality, architecture, standards, testing)
- Critical Issues (security, performance)
- Recommendations (immediate actions, future improvements)
- Metrics (complexity, test coverage)
- Action Items
- Final Verdict

---

## =' Core Standards Summary

### File Organization
- **Code files**: 80 lines max (document exceptions at top)
- **Test files**: Exempt from line limit
- **File descriptions**: Bilingual (English + Korean)
- **Component files**: PascalCase with `.tsx` extension
- **Type files**: kebab-case with `.types.ts` in `src/types/` directory
- **Utility files**: kebab-case with `.ts` extension

### Naming Conventions
- **Functions**: camelCase, verb + noun pattern
- **Variables**: camelCase
- **Components**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files/Folders**: kebab-case (except components)

### Import Order
1. **React imports**
2. **External libraries**
3. **Internal components**
4. **Type imports**
5. **Utility functions**
6. **Constants**
7. **Styles**

### React Component Standards
- **Props Separation (CRITICAL)**: All props in `src/types/*.types.ts`
- **Style Constants (CRITICAL)**: All inline styles as constants at file top
- **Functional components**: Use function components with hooks
- **Custom hooks**: Extract reusable logic
- **Early return**: Return early for conditional rendering

### Function Standards
- **Length**: 15-20 lines max
- **Pattern**: Single responsibility, early return
- **Immutability**: Use spread operators, no mutations
- **Type safety**: Proper TypeScript types for all parameters and returns

### Code Style
- **TypeScript**: Strict mode, no `any` types
- **Modern syntax**: ES6+, arrow functions, destructuring, optional chaining
- **Async**: async/await over Promises with proper typing
- **Error handling**: try-catch blocks
- **React optimization**: useMemo, useCallback, React.memo

### Testing
- Write tests alongside implementation
- Unit tests for all functions
- Integration tests for components
- E2E tests for critical flows

### Quality Gates
- ESLint validation must pass
- Prettier formatting applied
- Test execution successful
- Code review approved

---

## > AI-Driven Development

### Automated Quality Assurance
- Claude Code instances automatically review against standards
- Consistent documentation generation using templates
- Comprehensive analysis (code quality, tests, architecture, performance)
- Standards compliance verification

### Efficient Development
- Consistent patterns enable AI understanding
- Clear documentation maintains context
- Automated verification for compliance
- Role-based personas for focused work

---

## =� Quick Reference

### For Implementation Tasks
1. Activate Developer persona: `@DEVELOPER.md`
2. Create issue: `Docs(XXX): Create {Title} Issue`
3. Create branch: `feat/XXX/{description}`
4. Follow coding standards
5. Write tests alongside code
6. Make atomic commits
7. Update issue and todos

### For Code Review Tasks
1. Activate Reviewer persona: `@PM.md`
2. Review against standards checklist
3. Use review template
4. Save review to `/code-reviews/{issue-number}/{commit-name}.md`
5. Provide actionable feedback
6. Make approval/rejection decision

### For Standards Questions
- **Coding Standards**: `markdowns/coding_standards/CODING_STANDARDS.md`
- **Workflow**: `markdowns/dev_workflow/DEV_WORKFLOW.md`
- **Templates**: `markdowns/{template_type}/`

---

## � Critical Rules

1. **Never skip standards** - All standards are mandatory
2. **No AI signatures** - Don't add "Generated with Claude Code" to commits
3. **Props separation (CRITICAL)** - All props in `src/types/*.types.ts`
4. **Style constants (CRITICAL)** - All inline styles as constants at file top
5. **File length compliance** - 80 lines max for code files (document exceptions)
6. **Function length** - 15-20 lines max (no exceptions)
7. **TypeScript strict** - Strict mode, no `any` types
8. **Named exports only** - Prefer named over default exports
9. **Test coverage** - Write tests for all new code
10. **Atomic commits** - Each commit is a complete logical unit
11. **Korean comments** - Use Korean for inline code comments
12. **Import order** - React → External → Internal → Types → Utils → Constants → Styles
13. **Pre-commit checks** - Always run ESLint, Prettier, tests
14. **Review required** - All code must be reviewed before merge

---

_This configuration ensures consistent, high-quality development across all Claude Code instances working on this project._
