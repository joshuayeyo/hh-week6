# Coding Standards

This document defines the coding standards and best practices for this project, specifically designed for AI-driven development efficiency and consistency.

## Overview

- **Tech Stack**: React 19+ with TypeScript, Vite
- **AI-First Approach**: Standards designed for Claude Code instances to maintain consistent quality
- **Automated Compliance**: Rules that can be automatically verified and enforced
- **Efficiency Focus**: Optimized for rapid development while maintaining high standards

---

## Naming Conventions

### Functions

- **camelCase**
- **Verb + Noun pattern** for clear action expression
- **Use full names** instead of abbreviations

```javascript
// ✅ Good
getDaysInMonth, formatWeek, convertEventToDateRange;

// ❌ Avoid
monthDays, weekFormat, eventToRange;
```

**Example**:
- 🙆🏻‍♂️: `aespaKarina`
- 🙅🏻‍♂️: `aspKrna`

### Variables

- **camelCase**

```javascript
// ✅ Good
const eventList = [];
const selectedDate = '2024-01-01';

// ❌ Avoid
const EventList = [];
const selected_date = '2024-01-01';
```

### Components

- **PascalCase** for classes and factory functions
- **Descriptive names** that indicate purpose

```javascript
// ✅ Good
CalendarHeader, EventForm, ScheduleCard;

// ❌ Avoid
Header, Form, Card;
```

### Constants

- **UPPER_SNAKE_CASE**

```javascript
// ✅ Good
const AESPA_MEMBERS = ['Karina', 'Winter', 'Giselle', 'Ningning'];
const NOTIFICATION_OPTIONS = [
  { value: 1, label: '1분 전' },
  { value: 10, label: '10분 전' }
];

// ❌ Avoid
const aespaMembers = [...];
const notificationOptions = [...];
```

### Files and Folders

- **Folders**: kebab-case
- **Component Files**: PascalCase with `.tsx` extension
    - `EventCard.tsx` (component)
    - `CalendarHeader.tsx` (component)
- **Type Files**: kebab-case with `.types.ts` extension (in `src/types/` directory)
    - `event-card.types.ts` (component props)
    - `calendar.types.ts` (shared types)
- **Utility Files**: kebab-case with `.ts` extension
    - `date-utils.ts` (utility)
    - `format-helpers.ts` (helpers)
- **Test Files**: Same name as source with `.spec.ts` or `.spec.tsx`
    - `EventCard.spec.tsx` (component test)
    - `date-utils.spec.ts` (utility test)

---

## Import/Export Standards

### Import Order

Always maintain this specific order:

1. **React imports**
2. **External libraries**
3. **Internal components**
4. **Type imports**
5. **Utility functions**
6. **Constants**
7. **Styles**

```typescript
// React
import { useState, useEffect } from 'react';

// External libraries
import dayjs from 'dayjs';

// Internal components
import { CalendarHeader } from '@/components/CalendarHeader';

// Type imports
import type { EventCardProps } from '@/types/event-card.types';
import type { CalendarEvent } from '@/types/calendar.types';

// Utility functions
import { formatDate } from '@/utils/date-utils';

// Constants
import { NOTIFICATION_OPTIONS } from '@/constants/options';

// Styles
import styles from './Calendar.module.css';
```

### Export Standards

- **Prefer named exports** over default exports

```typescript
// ✅ Good - Named exports
export const formatDate = (date: Date): string => { ... };
export const getDaysInMonth = (year: number, month: number): number => { ... };

// ❌ Avoid - Default export
export default function formatDate(date: Date): string { ... }
```

- **Module-level re-exports** for better organization

```typescript
// date-utils.ts
export { fillZero } from './dates/fill-zero';
export { formatDate } from './dates/format-date';
export { getDaysInMonth } from './dates/get-days-in-month';
```

---

## File Organization

### File Length

- **Target**: Keep code files under **80 lines** including comments
- **Exception handling**: If code exceeds 80 lines, add comment at the top explaining why
- **Test file exemption**: E2E and integration test files may exceed this limit
- **Exemptions**: Documentation files (.md, .json) are exempt

### File Documentation

- **Bilingual descriptions**: Add file description at the top in English and Korean

```typescript
// Calendar component managing the display of week and month views
// 주간 및 월간 뷰 표시를 관리하는 캘린더 컴포넌트

export const Calendar = ({ events, onDateSelect }: CalendarProps) => {
  // ...
};
```

---

## React Component Standards

### Component Structure

All React components must follow this structure:

1. **Style constants at the top** - All inline styles as constants
2. **Props type definition** - Separated in `src/types/*.types.ts`
3. **Component implementation**
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

### Props Type Separation

**CRITICAL**: All props must be defined in separate type files in `src/types/` directory.

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

### Style Constants

**CRITICAL**: All inline styles must be declared as constants at the top of the file.

```typescript
// ✅ Good - Styles as constants at the top
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

// ❌ Avoid - Inline styles without constants
export const MyComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button style={{ padding: '8px 16px' }}>Click me</button>
    </div>
  );
};
```

### Component Patterns

- **Functional components only**: Use function components with hooks
- **Custom hooks**: Extract reusable logic into custom hooks
- **Early return**: Return early for conditional rendering

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

## TypeScript Standards

### Type Definitions

- **Use TypeScript types**: Define types and interfaces for all data structures
- **Separate type files**: Keep types in `src/types/*.types.ts`

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

### Type Safety

- **Strict mode**: Always use TypeScript strict mode
- **No `any`**: Avoid using `any` type, use `unknown` if necessary
- **Proper typing**: Type all function parameters and return values

```typescript
// ✅ Good - Proper typing
export const filterEvents = (
  events: CalendarEvent[],
  predicate: (event: CalendarEvent) => boolean
): CalendarEvent[] => {
  return events.filter(predicate);
};

// ❌ Avoid - Using any
export const filterEvents = (events: any, predicate: any): any => {
  return events.filter(predicate);
};
```

---

## Function Standards

### Function Length

- **Target**: 15-20 lines maximum per function
- **Single Responsibility**: Each function should have one clear purpose

### Function Patterns

- **Use default values**: Provide default values for optional parameters

```typescript
// ✅ Good
export const fillZero = (value: number | string, size: number = 2): string => {
  return String(value).padStart(size, '0');
};
```

- **Maintain immutability**: Don't mutate original data, use spread operator

```typescript
// ✅ Good - Immutability
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

- **Early Return**: Quick return in conditional logic

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

## React Hooks Standards

### Custom Hooks

- **Naming**: Start with `use` prefix
- **Single responsibility**: Each hook should have one clear purpose
- **Type safety**: Properly type all parameters and return values

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

### Hook Patterns

- **Use built-in hooks**: useState, useEffect, useCallback, useMemo
- **Dependencies**: Always specify correct dependencies
- **Clean up**: Return cleanup function when necessary

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

## Async Patterns

### Async/Await Style

- **Prefer async/await**: Use async/await instead of Promise.then() chaining
- **Error handling**: Clear error handling with try-catch
- **Type return values**: Properly type async function returns

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

## Code Style

### Modern TypeScript

- **ES6+ syntax**: Arrow functions, destructuring, spread/rest operators
- **Template literals**: String interpolation
- **Optional chaining**: Safe property access
- **Nullish coalescing**: Use `??` for default values

```typescript
// ✅ Good - Modern syntax
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

### Constants

- **const assertions**: Use `as const` for immutable objects
- **UPPER_SNAKE_CASE**: For constant values

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

## React Best Practices

### Performance Optimization

- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize callback functions
- **React.memo**: Prevent unnecessary re-renders

```typescript
// ✅ useMemo for expensive calculations
export const EventList = ({ events }: EventListProps) => {
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  return <div>{/* render sorted events */}</div>;
};

// ✅ useCallback for event handlers
export const EventCard = ({ event, onDelete }: EventCardProps) => {
  const handleDelete = useCallback(() => {
    onDelete(event.id);
  }, [event.id, onDelete]);

  return <button onClick={handleDelete}>Delete</button>;
};

// ✅ React.memo for preventing re-renders
export const EventCard = React.memo(({ event }: EventCardProps) => {
  return <div>{event.title}</div>;
});
```

### State Management

- **Local state first**: Use useState for component-specific state
- **Lift state up**: Share state between components through common parent
- **Context for global state**: Use Context API for app-wide state

```typescript
// ✅ Context for global state
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

## Code Quality

### Pre-commit Requirements

- **ESLint validation** must pass
- **Prettier formatting** applied

### Documentation

- **Complex logic**: Add comments explaining the approach
- **Public APIs**: JSDoc comments for public functions

---

## Language Usage

### Code Comments

- **Prefer Korean** for code comments
- **File header**: Bilingual (English + Korean)

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

### Commit Messages

- **English titles** with Korean body text

```
feat: Add event filtering by category

- 카테고리별 이벤트 필터링 기능 추가
- filterEventsByCategory 함수 구현
```

---

## AI Efficiency

- **Consistent patterns**: Enable AI to understand and extend codebase efficiently
- **Clear documentation**: Maintain context through comprehensive docs
- **Automated verification**: Standards designed for automatic compliance