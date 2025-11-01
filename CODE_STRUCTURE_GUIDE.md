# 🧭 Code Organization & File Structure Guide

**Purpose:**
This guide defines how to structure and organize code in a modern **Next.js (App Router)** and **Node.js backend** project to ensure clarity, scalability, and consistency.

---

## 🧠 1. Philosophy

Good architecture is about **separation of concerns**:

* Each file or function does **one clear job**.
* Everything is **easy to locate** and **easy to extend**.
* The flow from **UI → Logic → Data** is intuitive and consistent.

Your project should always be divided into **four logical layers**:

| Layer        | Description                                           | Typical Directories           |
| ------------ | ----------------------------------------------------- | ----------------------------- |
| UI Layer     | User interface components, pages, client interactions | `/app`, `/components`         |
| Logic Layer  | Business logic, validation, reusable functions        | `/lib`, `/hooks`, `/services` |
| Data Layer   | Database models, API routes, external integrations    | `/server`, `/db`, `/app/api`  |
| Shared Layer | Types, constants, utils shared across layers          | `/types`, `/utils`            |

---

## 🏗️ 2. Recommended Folder Structure

```
/app
  /dashboard
    page.tsx                  # Server Component (default)
    DashboardClient.tsx       # Client Component (UI)
    actions.ts                # Server Actions (e.g., createPost, deleteUser)
  /api
    /users
      route.ts                # API endpoint handler (if needed)
/components
  Button.tsx
  Input.tsx
  Navbar.tsx
  /shared                    # Reusable components across features
    CheckboxCard.tsx
    NumberInput.tsx
  /debug                     # Feature-specific components
    DebugStateModal.tsx
/lib
  auth.ts                     # Authentication helpers
  fetcher.ts                 # API fetch wrapper
  formatDate.ts               # Generic formatting helpers
/hooks
  useFetch.ts
  useToggle.ts
  use-calculations.ts        # Business logic hooks
  use-debug-state.ts         # Feature-specific hooks
/server
  db.ts                       # Database connection (Drizzle/Neon)
  userService.ts              # Business logic and queries
  /calculations              # Calculation business logic
    index.ts
    time-calculations.ts
    area-calculations.ts
    types.ts
  /constants                 # Calculation constants
    calculation-constants.ts
/utils
  constants.ts
  validators.ts
  /formatters.ts             # Formatting utilities
/types
  index.ts                    # Shared TypeScript types and enums
  common.ts                   # Common types used across features
```

---

## ⚙️ 3. File Placement Rules

| Type                          | Directory                              | Description                                                                        |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| **UI Components**             | `/components`                          | Purely visual or interactive components, reusable across pages.                    |
| **Page Components**           | `/app/{route}/page.tsx`                | Server components for routing and layout.                                          |
| **Client Components**         | `/app/{route}/ComponentNameClient.tsx` | Interactive components using `use client`.                                         |
| **Server Actions**            | `/app/{route}/actions.ts`              | Functions marked with `"use server"` that perform backend tasks (DB writes, etc.). |
| **APIs**                      | `/app/api/{resource}/route.ts`         | REST or RPC routes (server-side).                                                  |
| **Database Logic**            | `/server`                              | All direct database access (Drizzle/Prisma queries).                               |
| **Business Logic / Services** | `/server/services/`                    | Abstracted logic that interacts with DB or APIs.                                   |
| **Helpers / Utils**           | `/lib` or `/utils`                     | Generic utilities (formatters, parsers, etc.).                                     |
| **Hooks**                     | `/hooks`                               | Reusable client-side or server-side hooks.                                         |
| **Types**                     | `/types`                               | Shared TypeScript types and schema definitions.                                    |

---

## 🔁 4. Function Placement Guidelines

Use this decision tree to decide where a function belongs:

1. **Does it access the database or environment secrets?**
   → Place in `/server` or `/app/api`.

2. **Is it handling form submission or server action logic?**
   → Place in `/app/{page}/actions.ts`.

3. **Is it specific to a single page or component?**
   → Keep it inside that file (inline or just below component).

4. **Is it reusable across multiple pages/components?**
   → Place in `/lib` or `/utils`.

5. **Is it related to UI state management (e.g., toggles, modals)?**
   → Place in `/hooks`.

---

## 🧩 5. Naming Conventions

| Type           | Convention            | Example                            |
| -------------- | --------------------- | ---------------------------------- |
| Page files     | `page.tsx`            | `/app/dashboard/page.tsx`          |
| Server actions | `actions.ts`          | `/app/posts/actions.ts`            |
| Services       | `<feature>Service.ts` | `userService.ts`                   |
| Components     | PascalCase            | `Navbar.tsx`, `UserCard.tsx`       |
| Hooks          | `use<Functionality>`  | `useFetch.ts`, `useModal.ts`       |
| Utils          | camelCase             | `formatDate.ts`, `generateSlug.ts` |
| Types          | PascalCase            | `User`, `Post`, `ApiResponse`      |

---

## 🧱 6. Standard Layers of a Request

Example flow for a **user signup** request:

```
User clicks "Sign Up" →
  Client Component (SignupForm.tsx)
    ↓ calls →
  Server Action (app/signup/actions.ts)
    ↓ uses →
  Business Logic (server/userService.ts)
    ↓ interacts with →
  Database (server/db.ts)
```

Each layer does **one job** only.

---

## 🧩 7. Server vs Client Guidelines

| Type                               | Should run on | Why                          |
| ---------------------------------- | ------------- | ---------------------------- |
| Database queries                   | Server        | Secure and environment-aware |
| Secret API calls                   | Server        | Hide credentials             |
| DOM manipulation, interactivity    | Client        | Requires browser APIs        |
| Data formatting, schema validation | Shared        | Reusable logic               |

---

## 🌍 8. Example Shared Utilities

### `/utils/formatters.ts`

```ts
// Purpose: Format date objects consistently across the app
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours === 0) {
    return `${mins} min`;
  } else if (mins === 0) {
    return `${hours} hr`;
  } else {
    return `${hours} hr ${mins} min`;
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}
```

### `/server/calculations/index.ts`

```ts
// Purpose: Handle embroidery calculation business logic
import { STANDARD_START_TIME } from '../constants/calculation-constants';
import { calculateBorderTime, calculateFillWorkTime, calculateMotifTime } from './time-calculations';
import type { CalculationState, CalculationResult } from './types';

export function calculateTime(state: CalculationState): CalculationResult {
  // Complex embroidery time calculation logic
  // Returns breakdown by section and total time
}
```

### `/app/dashboard/actions.ts`

```ts
// Purpose: Server Actions for dashboard page
"use server";

import { calculateTime } from "@/server/calculations";
import type { CalculationState } from "@/server/calculations/types";

export async function performCalculation(state: CalculationState) {
  return await calculateTime(state);
}
```

---

## ✅ 9. Summary Checklist

Before committing code:

* [ ] Each file has a clear purpose and correct location
* [ ] Functions are not duplicated; reusable ones live in `/lib` or `/server`
* [ ] No secret logic is exposed to the client
* [ ] Client components are lightweight and declarative
* [ ] Folder names are consistent and meaningful

---

## 📁 10. Current Project Structure (Example)

This guide has been applied to the current embroidery calculation project:

```
/app
  /dashboard
    page.tsx                    # Main dashboard page
    DashboardLayout.tsx         # Layout component
    DashboardHeader.tsx         # Header component
    /sections                   # Section-specific components
    /components                 # Page-specific components

/components
  /shared                       # Reusable UI components
    CheckboxCard.tsx
    NumberInput.tsx
    SectionWrapper.tsx
    StateValueDisplay.tsx
  /debug                        # Debug components
    DebugStateModal.tsx

/hooks
  use-calculations.ts           # Calculation logic hook
  use-debug-state.ts            # Debug state hook

/server
  /calculations                 # Business logic for calculations
    index.ts
    time-calculations.ts
    area-calculations.ts
    types.ts
  /constants                    # Calculation constants
    calculation-constants.ts

/lib
  store                         # State management
    app-state.ts

/types
  common.ts                     # Shared types

/utils
  formatters.ts                 # Utility functions
```

This structure ensures **separation of concerns**, **easy maintenance**, and **scalable development**.
