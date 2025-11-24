# Legacy Design System Improvement Specification (EN)

## 📋 Table of Contents
1. [Overview](#overview)
2. [Identified Issues](#identified-issues)
3. [Task Breakdown](#task-breakdown)
4. [Priority and Estimated Timeline](#priority-and-estimated-timeline)

---

## Overview

### Project Goal
Identify issues in the legacy design system (`packages/before/`) and migrate to a modern design system (`packages/after/`) to achieve:
- Consistent component API design
- Systematic style management with TailwindCSS + CVA
- Accessible components based on shadcn/ui
- Clear separation of domain logic and UI
- Component documentation through Storybook

---

## Identified Issues

### 1. Inconsistent Component API ⚠️

#### 1.1 Props Naming Inconsistency
**Problem:**
```typescript
// FormInput.tsx - uses "width" prop
<FormInput width="full" helpText="Help text" />

// FormSelect.tsx - uses "size" prop
<FormSelect size="md" helpText="Help text" />

// FormTextarea.tsx - no size/width prop
<FormTextarea helpText="Help text" />
```

**Impact:** Developers must remember different APIs for each component, leading to inconsistent UX

#### 1.2 Size/Variant Value Inconsistency
**Problem:**
```typescript
// Button: "sm", "md", "lg"
<Button size="sm" variant="primary" />

// Badge: "small", "medium", "large"
<Badge size="small" type="primary" />

// Alert: different variant names
<Alert variant="error" />  // Button uses "danger"
```

**Impact:** Same concepts expressed differently across components, causing confusion

---

### 2. Domain Logic Mixed into UI Components 🚨

#### 2.1 Button Component (`packages/before/src/components/atoms/Button.tsx`)
**Problem:** UI component directly implements business rules
```typescript
// Lines 14-16: Domain-specific props
entityType?: 'user' | 'post';
action?: 'create' | 'edit' | 'delete' | 'publish' | 'archive';
entity?: any;

// Lines 36-75: Business rule handling
if (entityType === 'user' && action === 'delete' && entity.role === 'admin') {
  actualDisabled = true; // Admins cannot be deleted
}
```

**Impact:**
- Reduced reusability (cannot be used in other projects)
- Increased testing complexity
- Violates Single Responsibility Principle (SRP)

#### 2.2 Badge Component (`packages/before/src/components/atoms/Badge.tsx`)
**Problem:** Directly handles domain states
```typescript
// Lines 9-13: Domain-specific props
status?: 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
userRole?: 'admin' | 'moderator' | 'user' | 'guest';
priority?: 'high' | 'medium' | 'low';
paymentStatus?: 'paid' | 'pending' | 'failed' | 'refunded';

// Lines 32-114: Domain-specific mapping logic
```

**Impact:** Badge must know all domain contexts

#### 2.3 FormInput Component (`packages/before/src/components/molecules/FormInput.tsx`)
**Problem:** UI component performs business validation
```typescript
// Lines 18-20: Domain-specific props
fieldType?: 'username' | 'email' | 'postTitle' | 'slug' | 'normal';
entityType?: 'user' | 'post';
checkBusinessRules?: boolean;

// Lines 57-63: Domain rules (reserved word check)
const reservedWords = ['admin', 'root', 'system', 'administrator'];

// Lines 69-74: Domain rules (company email only)
if (!val.endsWith('@company.com') && !val.endsWith('@example.com')) {
  setInternalError('Only company emails are allowed');
}
```

**Impact:** Form validation logic tightly coupled to UI component

#### 2.4 Table Component (`packages/before/src/components/organisms/Table.tsx`)
**Problem:** Contains domain-specific rendering logic
```typescript
// Lines 24-30: Domain-specific props
entityType?: 'user' | 'post';
onEdit?: (item: any) => void;
onDelete?: (id: number) => void;
onPublish?: (id: number) => void;
onArchive?: (id: number) => void;
onRestore?: (id: number) => void;

// Lines 107-202: renderCell method with domain branching
if (entityType === 'user') {
  if (columnKey === 'role') {
    return <Badge userRole={value} showIcon />;
  }
  // ... more domain logic
}
```

**Impact:** Table must know both User and Post domains, not extensible

---

### 3. Mixed Styling Approaches 🎨

#### 3.1 CSS Classes + Inline Styles Mixed
**Problem:**
```typescript
// packages/before/src/pages/ManagementPage.tsx

// Lines 225-238: Inline styles
<div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
  <h1 style={{
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  }}>

// Lines 207-218: Inline styles with hardcoded values
<input
  style={{
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '300px',
  }}
/>
```

**Impact:**
- Lack of style consistency
- No design tokens
- Not reusable
- Difficult to implement responsive design

#### 3.2 Hardcoded Color Values
**Problem:** Hardcoded colors in `packages/before/src/styles/components.css`
```css
/* Lines 24-26 */
.btn-primary {
  background-color: #1976d2;  /* Hardcoded */
  color: #fff;
  border-color: #1565c0;
}

/* Lines 44-46 */
.btn-danger {
  background-color: #d32f2f;  /* Hardcoded */
  color: #fff;
  border-color: #c62828;
}
```

**Impact:**
- All values must be manually updated when design system changes
- Difficult to support dark mode
- Hard to maintain consistency

---

### 4. Lack of Type Safety ⚠️

#### 4.1 Overuse of Any Type
**Problem:**
```typescript
// Table.tsx lines 15, 21
data?: any[];
onRowClick?: (row: any) => void;

// Button.tsx line 16
entity?: any;

// ManagementPage.tsx line 25
const [formData, setFormData] = useState<any>({});
```

**Impact:**
- No type checking
- Increased risk of runtime errors
- Poor IDE autocomplete support

---

### 5. Accessibility Issues ♿

#### 5.1 Modal Component (`packages/before/src/components/organisms/Modal.tsx`)
**Problem:**
```typescript
// No ESC key support
// No focus trap
// Missing role and aria-labelledby attributes
// Line 38: Only closes on click
<div className="modal-overlay" onClick={onClose}>
```

**Required Improvements:**
- Close modal with ESC key
- Focus trap (restrict focus to modal)
- Add `role="dialog"`, `aria-modal="true"`
- Connect `aria-labelledby`

#### 5.2 Alert Component (`packages/before/src/components/organisms/Alert.tsx`)
**Problem:**
```typescript
// Lines 38-41: Close button missing aria-label
<button onClick={onClose} className="alert-close">
  ×
</button>
```

**Required Improvements:**
- Add `aria-label="Close alert"`
- Add `role="alert"`

#### 5.3 Table Component Accessibility
**Problem:**
```typescript
// Line 230: Sortable header missing aria-sort
<th onClick={() => sortable && handleSort(column.key)}>
```

**Required Improvements:**
- Add `aria-sort` attribute
- Support keyboard navigation

---

### 6. Misuse of Atomic Design Pattern 📁

#### 6.1 Folder Structure Issues
**Current Structure:**
```
components/
├── atoms/      # Button, Badge
├── molecules/  # FormInput, FormSelect
└── organisms/  # Header, Card, Modal, Table
```

**Problems:**
1. **Ambiguous Classification Criteria**: Is Card an atom or molecule? Depends on content
2. **Complex Import Paths**: `../../../components/atoms/Button`
3. **Slows Development**: Time wasted deciding "where does this belong?"
4. **Difficult to Refactor**: Moving a component requires updating all imports

**Improved Approach:**
```
components/
└── ui/         # All reusable UI components (shadcn/ui approach)
    ├── button.tsx
    ├── badge.tsx
    ├── input.tsx
    └── ...
```

---

## Task Breakdown

## Phase 1: Project Setup and Environment Configuration

### Task 1.1: Initialize After Package
**Goal:** Create new React + TypeScript project

**Actions:**
```bash
cd packages/after
npm create vite@latest . -- --template react-ts
npm install
```

**Checklist:**
- [ ] Create Vite + React + TypeScript project
- [ ] Create basic folder structure (`src/components/ui`, `src/lib`, `src/hooks`)
- [ ] Verify `npm run dev` runs

**Estimated Time:** 15 minutes

---

### Task 1.2: Install and Configure TailwindCSS
**Goal:** Install TailwindCSS v4 and basic configuration

**Actions:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**`tailwind.config.js` Configuration:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

**`src/index.css` Configuration:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

**Checklist:**
- [ ] TailwindCSS installed
- [ ] `tailwind.config.js` configured
- [ ] CSS variable-based color system set up
- [ ] Dark mode support prepared
- [ ] Verify TailwindCSS classes work

**Estimated Time:** 30 minutes

---

### Task 1.3: Initialize shadcn/ui
**Goal:** Set up shadcn/ui CLI and create basic structure

**Actions:**
```bash
npx shadcn-ui@latest init
```

**CLI Prompts:**
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: Yes
- Component location: `./src/components/ui`
- Utils location: `./src/lib/utils`
- React Server Components: No
- Icons: lucide-react

**Create `src/lib/utils.ts`:**
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Checklist:**
- [ ] shadcn/ui CLI initialized
- [ ] `src/lib/utils.ts` created
- [ ] `src/components/ui/` folder created
- [ ] Required dependencies installed (`clsx`, `tailwind-merge`, `lucide-react`)

**Estimated Time:** 20 minutes

---

### Task 1.4: Install CVA (Class Variance Authority)
**Goal:** Install CVA for variant pattern implementation

**Actions:**
```bash
npm install class-variance-authority
```

**Example Usage:**
```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
```

**Checklist:**
- [ ] CVA installed
- [ ] Understand basic variant pattern
- [ ] Verify TypeScript type inference

**Estimated Time:** 15 minutes

---

### Task 1.5: Install and Configure Storybook
**Goal:** Install Storybook and create basic structure

**Actions:**
```bash
npx storybook@latest init
```

**`.storybook/main.ts` Configuration:**
```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",  // Accessibility addon
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
```

**`.storybook/preview.ts` Configuration:**
```typescript
import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

**Checklist:**
- [ ] Storybook installed
- [ ] `npm run storybook` runs successfully
- [ ] Accessibility addon installed
- [ ] TailwindCSS styles applied

**Estimated Time:** 30 minutes

---

## Phase 2: Basic UI Component Migration

### Task 2.1: Implement Button Component
**Goal:** Install and customize shadcn/ui Button

**Actions:**
```bash
npx shadcn-ui@latest add button
```

**Improvements:**
1. **Remove Domain Logic**: Remove `entityType`, `action`, `entity` props
2. **Consistent API**: Define variant/size with CVA
3. **Improved Accessibility**: Proper type attributes

**`src/components/ui/button.tsx` (Customized):**
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Before/After Comparison:**
```typescript
// ❌ Before (with domain logic)
<Button
  entityType="user"
  action="delete"
  entity={user}
  variant="danger"
>
  {/* Button automatically determines text and disabled state */}
</Button>

// ✅ After (pure UI component)
<Button
  variant="destructive"
  disabled={user.role === 'admin'}  // Business logic handled by parent
  onClick={handleDelete}
>
  Delete User
</Button>
```

**Checklist:**
- [ ] shadcn/ui Button installed
- [ ] Domain logic removed
- [ ] Variants defined: default, destructive, outline, secondary, ghost, link
- [ ] Sizes defined: default, sm, lg, icon
- [ ] Accessibility verified (focus visible, disabled state)
- [ ] TypeScript type safety verified

**Estimated Time:** 45 minutes

---

### Task 2.2: Write Button Storybook Stories
**Goal:** Document Button component and visualize all variants

**`src/components/ui/button.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-2">
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
```

**Checklist:**
- [ ] All variant stories written
- [ ] All size stories written
- [ ] Disabled state story
- [ ] AllVariants combination story
- [ ] Verified with Accessibility addon
- [ ] Interactive testing with Controls

**Estimated Time:** 30 minutes

---

### Task 2.3: Implement Badge Component
**Goal:** Pure Badge component without domain logic

**Actions:**
```bash
npx shadcn-ui@latest add badge
```

**Improvements:**
1. **Remove Domain Logic**: Remove `status`, `userRole`, `priority`, `paymentStatus` props
2. **Consistent Variant Names**: "type" → "variant"
3. **Simple API**: Content passed via children

**`src/components/ui/badge.tsx` (Customized):**
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

**Before/After Comparison:**
```typescript
// ❌ Before (with domain logic)
<Badge
  status="published"  // Automatically determines color and text
  userRole="admin"
/>

// ✅ After (pure UI component)
<Badge variant="default">
  {post.status === 'published' ? 'Published' : 'Draft'}
</Badge>
<Badge variant="destructive">
  {user.role === 'admin' ? 'Admin' : 'User'}
</Badge>
```

**Domain-specific Badge helper function (optional):**
```typescript
// src/components/domain/post-badge.tsx
import { Badge } from '@/components/ui/badge';

type PostStatus = 'published' | 'draft' | 'archived';

const statusConfig: Record<PostStatus, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  published: { label: 'Published', variant: 'default' },
  draft: { label: 'Draft', variant: 'secondary' },
  archived: { label: 'Archived', variant: 'outline' },
};

export function PostStatusBadge({ status }: { status: PostStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
```

**Checklist:**
- [ ] shadcn/ui Badge installed
- [ ] Domain logic removed
- [ ] Variants defined: default, secondary, destructive, outline
- [ ] Simple API verified
- [ ] Understand domain-specific helper pattern

**Estimated Time:** 30 minutes

---

### Task 2.4: Implement Alert Component with Accessibility Improvements
**Goal:** Install shadcn/ui Alert and improve accessibility

**Actions:**
```bash
npx shadcn-ui@latest add alert
```

**Improvements:**
1. **Accessibility**: Add `role="alert"`, `aria-label`
2. **Consistent Variant**: "error" → "destructive"
3. **Icon System**: Use lucide-react icons

**`src/components/ui/alert.tsx` (Customized):**
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => {
  const Icon = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle2,
    warning: AlertCircle,
  }[variant || "default"]

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-4 w-4" />
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

**Before/After Comparison:**
```typescript
// ❌ Before
<Alert variant="error" title="Error" onClose={handleClose}>
  <button onClick={onClose} className="alert-close">×</button>
  Cannot load data
</Alert>

// ✅ After
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Cannot load data
  </AlertDescription>
</Alert>
```

**Checklist:**
- [ ] shadcn/ui Alert installed
- [ ] `role="alert"` added
- [ ] Icon system implemented
- [ ] Variants defined: default, destructive, success, warning
- [ ] AlertTitle, AlertDescription components separated
- [ ] Accessibility verified (Storybook a11y addon)

**Estimated Time:** 40 minutes

---

## Phase 3: Form Component Migration and API Unification

### Task 3.1: Implement Input Component
**Goal:** Input component with consistent API

**Actions:**
```bash
npx shadcn-ui@latest add input
```

**Improvements:**
1. **Remove Domain Logic**: Remove `fieldType`, `entityType`, `checkBusinessRules`
2. **Unify API**: Same props structure for FormInput, FormSelect, FormTextarea
3. **Separate Validation**: Remove validation logic from UI component (move to React Hook Form + Zod)

**`src/components/ui/input.tsx`:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

**Checklist:**
- [ ] shadcn/ui Input installed
- [ ] Domain logic removed
- [ ] forwardRef supports ref forwarding
- [ ] Accessibility verified (focus visible)
- [ ] Disabled state styling verified

**Estimated Time:** 20 minutes

---

### Task 3.2: Implement Form Component (React Hook Form Integration)
**Goal:** Provide consistent form structure with shadcn/ui Form component

**Actions:**
```bash
npx shadcn-ui@latest add form
npm install react-hook-form @hookform/resolvers zod
```

**`src/components/ui/form.tsx` (provided by shadcn/ui):**
- FormField
- FormItem
- FormLabel
- FormControl
- FormDescription
- FormMessage

**Usage Example:**
```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores allowed"),
  email: z.string()
    .email("Invalid email format")
    .refine((email) => email.endsWith("@company.com"), {
      message: "Only company emails allowed",
    }),
})

function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

**Before/After Comparison:**
```typescript
// ❌ Before (validation logic in UI component)
<FormInput
  name="username"
  value={formData.username}
  onChange={(value) => setFormData({ ...formData, username: value })}
  fieldType="username"
  entityType="user"
  checkBusinessRules={true}  // UI component checks business rules
  error={errors.username}
/>

// ✅ After (validation logic in Zod schema)
<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Checklist:**
- [ ] shadcn/ui Form installed
- [ ] React Hook Form installed
- [ ] Zod installed
- [ ] Form validation example written
- [ ] Domain validation logic moved to Zod schema
- [ ] Error message display verified

**Estimated Time:** 60 minutes

---

### Task 3.3: Implement Select and Textarea Components
**Goal:** Select and Textarea with consistent API like Input

**Actions:**
```bash
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
```

**`src/components/ui/textarea.tsx` Customization:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
```

**Form Integration Example:**
```typescript
<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="accessibility">Accessibility</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="content"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Content</FormLabel>
      <FormControl>
        <Textarea placeholder="Enter content" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Checklist:**
- [ ] Select component installed and tested
- [ ] Textarea component installed and tested
- [ ] React Hook Form integration verified
- [ ] Consistent styling verified
- [ ] Accessibility verified

**Estimated Time:** 40 minutes

---

## Phase 4: Complex Component Migration

### Task 4.1: Implement Card Component
**Goal:** Simple and flexible Card component

**Actions:**
```bash
npx shadcn-ui@latest add card
```

**`src/components/ui/card.tsx`:**
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

**Usage Example:**
```typescript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Checklist:**
- [ ] Card component installed
- [ ] Understand composition pattern (Card, CardHeader, CardContent, CardFooter)
- [ ] Variant removed (customize with TailwindCSS)
- [ ] Flexible layout verified

**Estimated Time:** 30 minutes

---

### Task 4.2: Implement Modal (Dialog) Component with Accessibility Improvements
**Goal:** Accessible Dialog component

**Actions:**
```bash
npx shadcn-ui@latest add dialog
```

**Improvements:**
1. **Accessibility**: Radix UI provides focus trap, ESC key support automatically
2. **Consistent API**: Dialog, DialogContent, DialogHeader composition
3. **Portal Usage**: Renders to body

**`src/components/ui/dialog.tsx` (provided by shadcn/ui):**
- Dialog (root)
- DialogTrigger
- DialogContent
- DialogHeader
- DialogTitle
- DialogDescription
- DialogFooter

**Before/After Comparison:**
```typescript
// ❌ Before (lacking accessibility)
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Title"
  size="large"
  showFooter
  footerContent={<Button onClick={onClose}>Close</Button>}
>
  Content
</Modal>

// ✅ After (Radix UI-based accessibility)
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>
        Description (optional)
      </DialogDescription>
    </DialogHeader>
    <div>Content</div>
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Accessibility Improvements:**
- ✅ Close with ESC key
- ✅ Focus trap (focus restricted to modal)
- ✅ `role="dialog"`, `aria-modal="true"` automatically added
- ✅ `aria-labelledby`, `aria-describedby` automatically connected
- ✅ Close by clicking overlay
- ✅ Prevent body scroll when modal open

**Checklist:**
- [ ] Dialog component installed
- [ ] Accessibility features tested (ESC key, focus trap)
- [ ] Understand DialogHeader, DialogTitle, DialogDescription structure
- [ ] Portal rendering verified
- [ ] Verified with Storybook a11y addon

**Estimated Time:** 45 minutes

---

### Task 4.3: Implement Table Component and Separate Domain Logic
**Goal:** Domain-agnostic generic Table component

**Actions:**
```bash
npx shadcn-ui@latest add table
```

**Improvements:**
1. **Remove Domain Logic**: Remove `entityType`, `renderCell` logic
2. **Improved Column Definition**: Include render function in column definition
3. **Accessibility**: Add `aria-sort`

**`src/components/ui/table.tsx` (provided by shadcn/ui):**
```typescript
// Basic Table components
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
```

**Custom DataTable Component (domain-neutral):**
```typescript
// src/components/ui/data-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column<T> {
  key: string
  header: string
  cell?: (row: T) => React.ReactNode  // Custom rendering
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick?.(row)}
            className={onRowClick ? "cursor-pointer" : ""}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.cell
                  ? column.cell(row)
                  : row[column.key as keyof T] as React.ReactNode
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

**Before/After Comparison:**
```typescript
// ❌ Before (with domain logic)
<Table
  data={users}
  entityType="user"  // Table must know user domain
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// ✅ After (domain-neutral)
<DataTable
  columns={[
    { key: 'id', header: 'ID' },
    { key: 'username', header: 'Username' },
    {
      key: 'role',
      header: 'Role',
      cell: (user) => <Badge>{user.role}</Badge>  // Domain logic outside
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (user) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleEdit(user)}>Edit</Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={user.role === 'admin'}  // Business rule outside
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]}
  data={users}
/>
```

**Checklist:**
- [ ] shadcn/ui Table installed
- [ ] DataTable wrapper component written
- [ ] Domain logic removed
- [ ] Understand column render function pattern
- [ ] Pagination (optional)
- [ ] Sorting (optional)

**Estimated Time:** 60 minutes

---

## Phase 5: Page Migration and Architecture Improvements

### Task 5.1: Refactor ManagementPage - Separate Domain Logic
**Goal:** Separate UI and business logic

**Actions:**

#### 5.1.1 Create Custom Hooks

**`src/hooks/use-users.ts` (User domain logic):**
```typescript
import { useState, useEffect } from 'react'
import { userService, type User } from '@/services/userService'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await userService.getAll()
      setUsers(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load users')
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    try {
      await userService.create(data)
      await loadUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const updateUser = async (id: number, data: Partial<User>) => {
    try {
      await userService.update(id, data)
      await loadUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id)
      await loadUsers()
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refresh: loadUsers,
  }
}
```

**`src/hooks/use-posts.ts` (Post domain logic):**
```typescript
// Implement with same pattern
```

#### 5.1.2 Create Domain-specific Components

**`src/components/domain/user-table-columns.tsx`:**
```typescript
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { User } from '@/services/userService'

export function getUserTableColumns(
  onEdit: (user: User) => void,
  onDelete: (id: number) => void
) {
  return [
    { key: 'id', header: 'ID' },
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      cell: (user: User) => {
        const roleConfig = {
          admin: { label: 'Admin', variant: 'destructive' as const },
          moderator: { label: 'Moderator', variant: 'default' as const },
          user: { label: 'User', variant: 'secondary' as const },
        }
        const config = roleConfig[user.role]
        return <Badge variant={config.variant}>{config.label}</Badge>
      }
    },
    {
      key: 'status',
      header: 'Status',
      cell: (user: User) => {
        const statusConfig = {
          active: { label: 'Active', variant: 'default' as const },
          inactive: { label: 'Inactive', variant: 'secondary' as const },
          suspended: { label: 'Suspended', variant: 'destructive' as const },
        }
        const config = statusConfig[user.status]
        return <Badge variant={config.variant}>{config.label}</Badge>
      }
    },
    { key: 'createdAt', header: 'Created' },
    { key: 'lastLogin', header: 'Last Login' },
    {
      key: 'actions',
      header: 'Actions',
      cell: (user: User) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onEdit(user)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={user.role === 'admin'}
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]
}
```

**`src/components/domain/user-form.tsx`:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

// Separate validation logic to Zod schema
const userFormSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only alphanumeric characters and underscores allowed')
    .refine((val) => {
      const reservedWords = ['admin', 'root', 'system', 'administrator']
      return !reservedWords.includes(val.toLowerCase())
    }, {
      message: 'This username is reserved'
    }),
  email: z.string()
    .email('Invalid email format')
    .refine((email) => {
      return email.endsWith('@company.com') || email.endsWith('@example.com')
    }, {
      message: 'Only company emails (@company.com or @example.com) allowed'
    }),
  role: z.enum(['user', 'moderator', 'admin']),
  status: z.enum(['active', 'inactive', 'suspended']),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>
  onSubmit: (data: UserFormValues) => void
  onCancel: () => void
}

export function UserForm({ defaultValues, onSubmit, onCancel }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'user',
      status: 'active',
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

#### 5.1.3 Refactor ManagementPage

**`src/pages/management-page.tsx`:**
```typescript
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DataTable } from '@/components/ui/data-table'
import { useUsers } from '@/hooks/use-users'
import { usePosts } from '@/hooks/use-posts'
import { getUserTableColumns } from '@/components/domain/user-table-columns'
import { getPostTableColumns } from '@/components/domain/post-table-columns'
import { UserForm } from '@/components/domain/user-form'
import { PostForm } from '@/components/domain/post-form'

export function ManagementPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('posts')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const users = useUsers()
  const posts = usePosts()

  const currentData = activeTab === 'users' ? users : posts

  const handleCreate = async (data: any) => {
    const result = activeTab === 'users'
      ? await users.createUser(data)
      : await posts.createPost(data)

    if (result.success) {
      setIsCreateDialogOpen(false)
      setSuccessMessage(`${activeTab === 'users' ? 'User' : 'Post'} created successfully`)
    } else {
      setErrorMessage(result.error || 'Failed to create')
    }
  }

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (data: any) => {
    if (!selectedItem) return

    const result = activeTab === 'users'
      ? await users.updateUser(selectedItem.id, data)
      : await posts.updatePost(selectedItem.id, data)

    if (result.success) {
      setIsEditDialogOpen(false)
      setSelectedItem(null)
      setSuccessMessage(`${activeTab === 'users' ? 'User' : 'Post'} updated successfully`)
    } else {
      setErrorMessage(result.error || 'Failed to update')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete?')) return

    const result = activeTab === 'users'
      ? await users.deleteUser(id)
      : await posts.deletePost(id)

    if (result.success) {
      setSuccessMessage('Deleted successfully')
    } else {
      setErrorMessage(result.error || 'Failed to delete')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Management System</h1>
        <p className="text-muted-foreground">Manage users and posts</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create New
            </Button>
          </div>

          {successMessage && (
            <Alert className="mb-4" variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {errorMessage && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="users">
            <DataTable
              columns={getUserTableColumns(handleEdit, handleDelete)}
              data={users.users}
            />
          </TabsContent>

          <TabsContent value="posts">
            <DataTable
              columns={getPostTableColumns(handleEdit, handleDelete, posts.publishPost, posts.archivePost)}
              data={posts.posts}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create New {activeTab === 'users' ? 'User' : 'Post'}
            </DialogTitle>
          </DialogHeader>
          {activeTab === 'users' ? (
            <UserForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          ) : (
            <PostForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit {activeTab === 'users' ? 'User' : 'Post'}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            activeTab === 'users' ? (
              <UserForm
                defaultValues={selectedItem}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            ) : (
              <PostForm
                defaultValues={selectedItem}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditDialogOpen(false)}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

**Summary of Improvements:**
1. ✅ Removed inline styles → Use TailwindCSS classes
2. ✅ Separated domain logic to Custom Hooks
3. ✅ Separated form validation logic to Zod schema
4. ✅ Separated domain-specific components (user-form, post-form)
5. ✅ Separated table rendering logic to column definitions
6. ✅ Moved business rules to page level

**Checklist:**
- [ ] Write Custom Hooks (use-users, use-posts)
- [ ] Write domain-specific Form components
- [ ] Write domain-specific Table Columns
- [ ] Refactor ManagementPage
- [ ] Remove all inline styles
- [ ] Verify functionality

**Estimated Time:** 120 minutes

---

## Phase 6: Storybook Documentation

### Task 6.1: Write Stories for All UI Components
**Goal:** Document all variants and states of each component in Storybook

**Actions:**

#### Create Story Files for Each Component
- `button.stories.tsx` (completed)
- `badge.stories.tsx`
- `alert.stories.tsx`
- `input.stories.tsx`
- `select.stories.tsx`
- `textarea.stories.tsx`
- `card.stories.tsx`
- `dialog.stories.tsx`
- `table.stories.tsx`

**Example: `badge.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
```

**Checklist:**
- [ ] All UI component stories completed
- [ ] Include examples for each variant and size
- [ ] Set up interactive controls
- [ ] Verified with Accessibility addon
- [ ] Verify automatic documentation generation

**Estimated Time:** 90 minutes

---

### Task 6.2: Write Stories for Domain Components
**Goal:** Show real usage examples with composite component stories

**Actions:**

**`user-form.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { UserForm } from './user-form';

const meta = {
  title: 'Domain/UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
  args: {
    onSubmit: (data) => console.log('Create:', data),
    onCancel: () => console.log('Cancel'),
  },
};

export const EditMode: Story = {
  args: {
    defaultValues: {
      username: 'johndoe',
      email: 'john@company.com',
      role: 'moderator',
      status: 'active',
    },
    onSubmit: (data) => console.log('Update:', data),
    onCancel: () => console.log('Cancel'),
  },
};
```

**`management-page.stories.tsx` (full page):**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ManagementPage } from './management-page';

const meta = {
  title: 'Pages/ManagementPage',
  component: ManagementPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

**Checklist:**
- [ ] UserForm, PostForm stories written
- [ ] ManagementPage story written
- [ ] Include real usage scenarios
- [ ] Use mock data

**Estimated Time:** 45 minutes

---

## Phase 7: Advanced Features - Dark Mode Support

### Task 7.1: Implement Dark Mode
**Goal:** CSS variable-based dark mode support

**Actions:**

#### 7.1.1 Set Up Dark Mode Provider
```bash
npm install next-themes
```

**`src/components/theme-provider.tsx`:**
```typescript
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

#### 7.1.2 Add Provider to App
**`src/App.tsx`:**
```typescript
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      {/* Your app */}
    </ThemeProvider>
  )
}
```

**Checklist:**
- [ ] ThemeProvider implemented
- [ ] Theme settings saved to localStorage
- [ ] System theme support (follows OS settings)
- [ ] All components verified in dark mode

**Estimated Time:** 45 minutes

---

### Task 7.2: Implement Dark Mode Toggle Button
**Goal:** UI for users to easily switch themes

**Actions:**
```bash
npx shadcn-ui@latest add dropdown-menu
```

**`src/components/theme-toggle.tsx`:**
```typescript
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**Add to ManagementPage:**
```typescript
import { ThemeToggle } from "@/components/theme-toggle"

export function ManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Management System</h1>
          <p className="text-muted-foreground">Manage users and posts</p>
        </div>
        <ThemeToggle />
      </div>
      {/* ... */}
    </div>
  )
}
```

**Checklist:**
- [ ] ThemeToggle component implemented
- [ ] Light/Dark/System options provided
- [ ] Icon animation verified
- [ ] Accessibility verified (sr-only text)
- [ ] Integrated into page

**Estimated Time:** 30 minutes

---

## Phase 8: Final Review and Documentation

### Task 8.1: Update README
**Goal:** Document Before/After comparison and improvements

**Actions:**

**Write `packages/after/README.md`:**
```markdown
# Modern Design System (After)

## 🎯 Improvements

### 1. Consistent Component API
**Before:**
- FormInput: `width="full"`
- FormSelect: `size="md"`
- FormTextarea: no size/width prop

**After:**
- All Form components use same API
- Consistent interface with React Hook Form integration

### 2. Separation of Domain Logic and UI
**Before:**
```typescript
<Button entityType="user" action="delete" entity={user} />
```

**After:**
```typescript
<Button variant="destructive" disabled={user.role === 'admin'} onClick={handleDelete}>
  Delete
</Button>
```

### 3. Improved Type Safety
- Removed `any` types
- Type inference through CVA variants
- Runtime validation with Zod

### 4. Improved Accessibility
- Radix UI-based components (Dialog, Select, etc.)
- Automatic ARIA attributes
- Keyboard navigation support

### 5. Modern Tooling
- TailwindCSS: Utility-first styling
- CVA: Variant pattern
- shadcn/ui: Copy-paste components
- Storybook: Component documentation

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
npm run storybook
\`\`\`

## 📦 Installed Packages

- React + TypeScript + Vite
- TailwindCSS v4
- shadcn/ui
- class-variance-authority (CVA)
- Radix UI
- React Hook Form + Zod
- Storybook
- lucide-react (icons)
```

**Checklist:**
- [ ] Before/After comparison table written
- [ ] Improvements documented in detail
- [ ] Execution instructions specified
- [ ] Screenshots added (optional)

**Estimated Time:** 45 minutes

---

### Task 8.2: Verify Checklist
**Goal:** Verify all required and advanced requirements completed

**Required Implementation:**
- [ ] Design system implemented in after package
- [ ] PostManagement page migration completed
- [ ] Major component stories written in Storybook
- [ ] README with before/after comparison and improvements

**Advanced Implementation:**
- [ ] Dark mode support
- [ ] Dark mode toggle button

**Additional Verification:**
- [ ] Domain logic removed from all components
- [ ] Consistent API design verified
- [ ] No TypeScript errors
- [ ] Accessibility verified (Storybook a11y addon)
- [ ] Code review and refactoring

**Estimated Time:** 30 minutes

---

## Priority and Estimated Timeline

### High Priority (Required)
| Phase | Task | Estimated Time | Difficulty |
|-------|------|----------------|-----------|
| Phase 1 | Project setup (1.1-1.5) | 110 min | ⭐⭐ |
| Phase 2 | Button, Badge, Alert implementation (2.1-2.4) | 145 min | ⭐⭐⭐ |
| Phase 3 | Form component migration (3.1-3.3) | 120 min | ⭐⭐⭐⭐ |
| Phase 4 | Card, Dialog, Table implementation (4.1-4.3) | 135 min | ⭐⭐⭐⭐ |
| Phase 5 | ManagementPage refactoring (5.1) | 120 min | ⭐⭐⭐⭐⭐ |

**Total Required Time: ~10.5 hours**

### Medium Priority (Documentation)
| Phase | Task | Estimated Time | Difficulty |
|-------|------|----------------|-----------|
| Phase 6 | Storybook documentation (6.1-6.2) | 135 min | ⭐⭐⭐ |
| Phase 8.1 | README writing | 45 min | ⭐⭐ |

**Total Documentation Time: ~3 hours**

### Low Priority (Advanced)
| Phase | Task | Estimated Time | Difficulty |
|-------|------|----------------|-----------|
| Phase 7 | Dark Mode implementation (7.1-7.2) | 75 min | ⭐⭐⭐ |

**Total Advanced Time: ~1.25 hours**

---

## Overall Project Estimated Time
- **Required**: 10.5 hours
- **Documentation**: 3 hours
- **Advanced**: 1.25 hours
- **Buffer (debugging, testing)**: 3 hours

**Total Estimated Time: ~17-20 hours**

---

## Learning Objectives Checklist

### Understanding Atomic Design Pattern
- [ ] Understand Atomic Design concepts (component composition and reusability)
- [ ] Understand folder structure can be adjusted for development convenience
- [ ] Understand shadcn/ui's simple `components/ui/` structure

### CSS-in-JS vs TailwindCSS
- [ ] Experience problems with inline styles
- [ ] Understand maintenance difficulties with hardcoded style values
- [ ] Understand TailwindCSS utility-first approach
- [ ] Understand CSS variable-based theme system

### Learning Modern Tools
- [ ] Learn Variants pattern with CVA
- [ ] Understand shadcn/ui CLI usage
- [ ] Understand Radix UI-based accessibility implementation
- [ ] Component documentation with Storybook

### Architecture Design
- [ ] Separate UI components and domain logic
- [ ] State management with Custom Hooks
- [ ] Separate validation with React Hook Form + Zod
- [ ] Understand composition pattern

---

## References
- [TailwindCSS Official Docs](https://tailwindcss.com/docs)
- [CVA Official Docs](https://cva.style/docs)
- [shadcn/ui Official Docs](https://ui.shadcn.com/)
- [Storybook Official Docs](https://storybook.js.org/docs/react/get-started/introduction)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Radix UI](https://www.radix-ui.com/)
