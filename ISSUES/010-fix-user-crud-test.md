## Description

ManagementPage 사용자 CRUD 테스트가 실패하는 문제를 수정합니다.

**문제 원인**:
- 테스트에서 모달 내 input 요소를 찾지 못함
- `document.querySelector('input[name="name"]')` 가 null 반환
- 모달이 열리기 전에 input을 찾으려 시도하거나, selector가 맞지 않음

**에러 메시지**:
```
Error: expect(received).toBeInTheDocument()
received value must be an HTMLElement or an SVGElement.
```

**목표**:
- 사용자 CRUD 테스트가 정상 통과하도록 수정
- 테스트 안정성 향상

## Todo

- [x] EntityFormFields Input/Select/Textarea에 name 속성 추가
- [x] 테스트 통과 확인

## ETC

### 참고

- 테스트 파일: `src/pages/__tests__/ManagementPage.test.tsx`
- 관련 컴포넌트: `ManagementPage.tsx`, `EntityFormFields.tsx`
