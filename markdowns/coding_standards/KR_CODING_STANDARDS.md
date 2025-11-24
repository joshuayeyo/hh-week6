# 코딩 표준

이 문서는 본 프로젝트의 코딩 표준과 모범 사례를 정의하며, AI 기반 개발 효율성과 일관성을 위해 특별히 설계되었습니다.

## 개요

- **기술 스택**: React 19+ with TypeScript, Vite
- **AI 우선 접근**: Claude Code 인스턴스가 일관된 품질을 유지하도록 설계된 표준
- **자동화된 준수**: 자동으로 검증하고 적용할 수 있는 규칙
- **효율성 중심**: 높은 표준을 유지하면서 신속한 개발에 최적화

---

## 네이밍 규칙

### 함수

- **camelCase** 사용
- **동사 + 명사 패턴**으로 명확한 동작 표현
- **축약형 대신 풀네임** 사용

```typescript
// ✅ Good
getDaysInMonth, formatWeek, convertEventToDateRange;

// ❌ Avoid
monthDays, weekFormat, eventToRange;
```

**예시**:
- 🙆🏻‍♂️: `aespaKarina`
- 🙅🏻‍♂️: `aspKrna`

### 변수

- **camelCase** 사용

```typescript
// ✅ Good
const eventList: Event[] = [];
const selectedDate: string = '2024-01-01';

// ❌ Avoid
const EventList = [];
const selected_date = '2024-01-01';
```

### 컴포넌트

- **PascalCase** 사용
- 목적을 나타내는 **설명적 이름**

```typescript
// ✅ Good
CalendarHeader, EventForm, ScheduleCard;

// ❌ Avoid
Header, Form, Card;
```

### 상수

- **UPPER_SNAKE_CASE** 사용

```typescript
// ✅ Good
const AESPA_MEMBERS = ['Karina', 'Winter', 'Giselle', 'Ningning'] as const;
const NOTIFICATION_OPTIONS = [
  { value: 1, label: '1분 전' },
  { value: 10, label: '10분 전' }
] as const;

// ❌ Avoid
const aespaMembers = [...];
const notificationOptions = [...];
```

### 파일과 폴더

- **폴더**: kebab-case
- **컴포넌트 파일**: PascalCase, `.tsx` 확장자
    - `EventCard.tsx` (컴포넌트)
    - `CalendarHeader.tsx` (컴포넌트)
- **타입 파일**: kebab-case, `.types.ts` 확장자 (`src/types/` 디렉토리)
    - `event-card.types.ts` (컴포넌트 props)
    - `calendar.types.ts` (공유 타입)
- **유틸리티 파일**: kebab-case, `.ts` 확장자
    - `date-utils.ts` (유틸리티)
    - `format-helpers.ts` (헬퍼)
- **테스트 파일**: 소스 파일과 동일한 이름, `.spec.ts` 또는 `.spec.tsx`
    - `EventCard.spec.tsx` (컴포넌트 테스트)
    - `date-utils.spec.ts` (유틸리티 테스트)

---

## Import/Export 표준

### Import 순서

항상 다음 순서를 유지합니다:

1. **React imports**
2. **외부 라이브러리**
3. **내부 컴포넌트**
4. **타입 imports**
5. **유틸리티 함수**
6. **상수**
7. **스타일**

```typescript
// React
import { useState, useEffect } from 'react';

// 외부 라이브러리
import dayjs from 'dayjs';

// 내부 컴포넌트
import { CalendarHeader } from '@/components/CalendarHeader';

// 타입 imports
import type { EventCardProps } from '@/types/event-card.types';
import type { CalendarEvent } from '@/types/calendar.types';

// 유틸리티 함수
import { formatDate } from '@/utils/date-utils';

// 상수
import { NOTIFICATION_OPTIONS } from '@/constants/options';

// 스타일
import styles from './Calendar.module.css';
```

### Export 표준

- **Named export 선호** (default export 대신)

```typescript
// ✅ Good - Named exports
export const formatDate = (date: Date): string => { ... };
export const getDaysInMonth = (year: number, month: number): number => { ... };

// ❌ Avoid - Default export
export default function formatDate(date: Date): string { ... }
```

- **모듈 레벨 re-export**로 구조화

```typescript
// date-utils.ts
export { fillZero } from './dates/fill-zero';
export { formatDate } from './dates/format-date';
export { getDaysInMonth } from './dates/get-days-in-month';
```

---

## 파일 구조

### 파일 길이

- **목표**: 코드 파일을 **80줄 이하**로 유지 (주석 포함)
- **예외 처리**: 80줄 초과 시, 파일 상단에 이유를 주석으로 명시
- **테스트 파일 예외**: E2E 및 통합 테스트 파일은 제한 없음
- **예외 대상**: 문서 파일 (.md, .json)

### 파일 문서화

- **이중 언어 설명**: 파일 상단에 영문과 한글로 설명 추가

```typescript
// Calendar component managing the display of week and month views
// 주간 및 월간 뷰 표시를 관리하는 캘린더 컴포넌트

export const Calendar = ({ events, onDateSelect }: CalendarProps) => {
  // ...
};
```

---

## React 컴포넌트 표준

### 컴포넌트 구조

모든 React 컴포넌트는 다음 구조를 따라야 합니다:

1. **스타일 상수 (파일 최상단)** - 모든 인라인 스타일을 상수로 선언
2. **Props 타입 정의** - `src/types/*.types.ts`에 분리
3. **컴포넌트 구현**
4. **Named export**

```typescript
// src/components/EventCard.tsx
// Event card component displaying event information
// 이벤트 정보를 표시하는 이벤트 카드 컴포넌트

import type { EventCardProps } from '@/types/event-card.types';

// 스타일 상수 (파일 최상단)
const CARD_STYLE = {
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
} as const;

const TITLE_STYLE = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '8px',
} as const;

export const EventCard = ({ title, date, description }: EventCardProps) => {
  return (
    <div style={CARD_STYLE}>
      <h3 style={TITLE_STYLE}>{title}</h3>
      <p>{date}</p>
      <p>{description}</p>
    </div>
  );
};
```

### Props 타입 분리

**중요**: 모든 props는 `src/types/` 디렉토리의 별도 타입 파일에 정의해야 합니다.

```typescript
// src/types/event-card.types.ts
// Type definitions for EventCard component
// EventCard 컴포넌트의 타입 정의

export interface EventCardProps {
  title: string;
  date: string;
  description?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

### 스타일 상수화

**중요**: 모든 인라인 스타일은 파일 최상단에 상수로 선언해야 합니다.

```typescript
// ✅ Good - 스타일을 상수로 선언
const CONTAINER_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
} as const;

const BUTTON_STYLE = {
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
} as const;

export const MyComponent = () => {
  return (
    <div style={CONTAINER_STYLE}>
      <button style={BUTTON_STYLE}>Click me</button>
    </div>
  );
};

// ❌ Avoid - 인라인 스타일 직접 사용
export const MyComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button style={{ padding: '8px 16px' }}>Click me</button>
    </div>
  );
};
```

### 컴포넌트 패턴

- **함수형 컴포넌트만 사용**: 훅과 함께 함수형 컴포넌트 사용
- **커스텀 훅**: 재사용 가능한 로직은 커스텀 훅으로 추출
- **Early return**: 조건부 렌더링 시 조기 반환

```typescript
export const UserProfile = ({ userId }: UserProfileProps) => {
  const { data: user, isLoading, error } = useUser(userId);

  // Early return 패턴
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound />;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

---

## TypeScript 표준

### 타입 정의

- **TypeScript 타입 사용**: 모든 데이터 구조에 타입 및 인터페이스 정의
- **타입 파일 분리**: 타입은 `src/types/*.types.ts`에 보관

```typescript
// src/types/event.types.ts
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

// src/utils/date-utils.ts
export const formatDate = (
  date: Date | string,
  format: string = 'YYYY-MM-DD'
): string => {
  // ...
};
```

### 타입 안전성

- **Strict 모드**: 항상 TypeScript strict 모드 사용
- **`any` 금지**: `any` 타입 사용 지양, 필요시 `unknown` 사용
- **적절한 타입 지정**: 모든 함수 매개변수와 반환 값에 타입 지정

```typescript
// ✅ Good - 적절한 타입 지정
export const filterEvents = (
  events: CalendarEvent[],
  predicate: (event: CalendarEvent) => boolean
): CalendarEvent[] => {
  return events.filter(predicate);
};

// ❌ Avoid - any 사용
export const filterEvents = (events: any, predicate: any): any => {
  return events.filter(predicate);
};
```

---

## 함수 표준

### 함수 길이

- **목표**: 함수당 최대 15-20줄
- **단일 책임**: 각 함수는 하나의 명확한 목적을 가져야 함

### 함수 패턴

- **기본값 사용**: 선택적 매개변수에 기본값 제공

```typescript
// ✅ Good
export const fillZero = (value: number | string, size: number = 2): string => {
  return String(value).padStart(size, '0');
};
```

- **불변성 유지**: 원본 데이터 변경 금지, spread 연산자 사용

```typescript
// ✅ Good - 불변성
export const getEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events];
};

export const updateEvent = (
  events: CalendarEvent[],
  id: string,
  updates: Partial<CalendarEvent>
): CalendarEvent[] => {
  return events.map((event) =>
    event.id === id ? { ...event, ...updates } : event
  );
};
```

- **Early Return**: 조건부 로직에서 조기 반환

```typescript
// ✅ Good - Early return
export const findEvent = (
  events: CalendarEvent[],
  id: string
): CalendarEvent | null => {
  const event = events.find((e) => e.id === id);
  if (!event) return null;

  return event;
};
```

---

## React Hooks 표준

### 커스텀 훅

- **네이밍**: `use` 접두사로 시작
- **단일 책임**: 각 훅은 하나의 명확한 목적을 가져야 함
- **타입 안전성**: 모든 매개변수와 반환 값에 적절한 타입 지정

```typescript
// src/hooks/useEvents.ts
export const useEvents = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  }, []);

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { events, addEvent, removeEvent };
};
```

### 훅 패턴

- **내장 훅 사용**: useState, useEffect, useCallback, useMemo
- **의존성**: 항상 올바른 의존성 명시
- **정리 함수**: 필요시 cleanup 함수 반환

```typescript
export const useEventListener = (
  eventName: string,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    window.addEventListener(eventName, handler);

    // Cleanup 함수
    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
};
```

---

## 비동기 패턴

### Async/Await 스타일

- **async/await 선호**: Promise.then() 체이닝 대신 async/await 사용
- **에러 핸들링**: try-catch로 명확한 에러 처리
- **반환 타입 지정**: async 함수의 반환 타입 명시

```typescript
// ✅ Good
export const fetchEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Failed to fetch events');

    const { events } = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to load events');
  }
};
```

---

## 코드 스타일

### 모던 TypeScript

- **ES6+ 문법**: 화살표 함수, 구조 분해, spread/rest 연산자
- **템플릿 리터럴**: 문자열 보간
- **옵셔널 체이닝**: 안전한 속성 접근
- **Nullish coalescing**: 기본값에 `??` 사용

```typescript
// ✅ Good - 모던 문법
export const getEventTitle = (
  events: CalendarEvent[],
  id: string
): string => {
  const event = events.find((e) => e.id === id);
  return event?.title ?? 'No title';
};

export const formatEventSummary = (event: CalendarEvent): string => {
  const { title, date, location = 'TBD' } = event;
  return `${title} - ${date} @ ${location}`;
};
```

### 상수

- **const assertions**: 불변 객체에 `as const` 사용
- **UPPER_SNAKE_CASE**: 상수 값에 사용

```typescript
// ✅ Good
export const REPEAT_TYPES = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export type RepeatType = typeof REPEAT_TYPES[keyof typeof REPEAT_TYPES];
```

---

## React 모범 사례

### 성능 최적화

- **useMemo**: 비용이 많이 드는 계산 메모이제이션
- **useCallback**: 콜백 함수 메모이제이션
- **React.memo**: 불필요한 재렌더링 방지

```typescript
// ✅ useMemo로 비용이 많이 드는 계산 메모이제이션
export const EventList = ({ events }: EventListProps) => {
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  return <div>{/* render sorted events */}</div>;
};

// ✅ useCallback으로 이벤트 핸들러 메모이제이션
export const EventCard = ({ event, onDelete }: EventCardProps) => {
  const handleDelete = useCallback(() => {
    onDelete(event.id);
  }, [event.id, onDelete]);

  return <button onClick={handleDelete}>Delete</button>;
};

// ✅ React.memo로 재렌더링 방지
export const EventCard = React.memo(({ event }: EventCardProps) => {
  return <div>{event.title}</div>;
});
```

### 상태 관리

- **로컬 상태 우선**: 컴포넌트별 상태는 useState 사용
- **상태 끌어올리기**: 공통 부모를 통해 컴포넌트 간 상태 공유
- **전역 상태용 Context**: 앱 전체 상태는 Context API 사용

```typescript
// ✅ 전역 상태용 Context
export const EventContext = createContext<EventContextType | null>(null);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};
```

---

## 코드 품질

### 커밋 전 요구사항

- **ESLint 검증** 통과 필수
- **Prettier 포매팅** 적용

### 문서화

- **복잡한 로직**: 접근 방법을 설명하는 주석 추가
- **Public API**: 공개 함수에 주석 작성

---

## 언어 사용

### 코드 주석

- **한글 선호**: 코드 주석은 한글 사용
- **파일 헤더**: 이중 언어 (영문 + 한글)

```typescript
// Utility functions for date manipulation
// 날짜 조작을 위한 유틸리티 함수들

/**
 * Calculate days in month
 * 월의 일수를 계산합니다
 */
export const getDaysInMonth = (year: number, month: number): number => {
  // 다음 달의 0일 = 현재 달의 마지막 날
  return new Date(year, month + 1, 0).getDate();
};
```

### 커밋 메시지

- **영문 제목**과 한글 본문

```
feat: Add event filtering by category

- 카테고리별 이벤트 필터링 기능 추가
- filterEventsByCategory 함수 구현
```

---

## AI 효율성

- **일관된 패턴**: AI가 코드베이스를 효율적으로 이해하고 확장할 수 있도록 지원
- **명확한 문서화**: 포괄적인 문서를 통해 컨텍스트 유지
- **자동화된 검증**: 자동 준수를 위한 표준 설계
