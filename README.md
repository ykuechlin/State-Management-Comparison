# State Management Comparison

A side-by-side Todo app demo comparing six React state management approaches. Each implementation uses the same UI (Mantine) and the same features — add, toggle, remove todos, and filter by All / Active / Completed — but with different patterns and libraries.

## Getting started

```bash
npm install
npm run dev
```

Use the navigation header to switch between demos:

| Route            | Library         |
| ---------------- | --------------- |
| `/redux-legacy`  | Redux (classic) |
| `/redux-toolkit` | Redux Toolkit   |
| `/zustand`       | Zustand         |
| `/jotai`         | Jotai           |
| `/valtio`        | Valtio          |
| `/xstate-store`  | XState Store    |

## Project structure

```
src/
├── types.ts              # Shared Todo & filter types
├── redux-legacy/         # Class components + connect() HOC
├── redux-toolkit/        # createSlice + hooks
├── zustand/              # combine() middleware store
├── jotai/                # Atoms + derived atoms
├── valtio/               # proxy + useSnapshot
└── xstate-store/         # createStore + event transitions
```

---

## Redux (legacy)

- **The original pattern** — actions in, reducers out, predictable unidirectional data flow
- **Explicit everything** — string action types, action creators, `switch` reducers, `mapStateToProps` / `mapDispatchToProps`
- **Class components + `connect()` HOC** — the React-Redux style from ~2015–2018
- **Great for learning** — every step is visible; nothing is magic
- **Heavy boilerplate** — lots of files and wiring for a simple todo app

---

## Redux Toolkit

- **Redux, but practical** — official modern answer to "Redux is too much work"
- **`createSlice`** — actions + reducer in one place; Immer lets you "mutate" draft state
- **`configureStore`** — sensible defaults (DevTools, middleware) out of the box
- **Hooks API** — `useSelector` / `useDispatch` instead of HOCs
- **Still Redux** — single store, explicit events, great DevTools & ecosystem

---

## Zustand

- **Minimal API** — one `create()` call, no Provider, no context
- **Hook-based** — `useTodoStore(selector)` subscribes to slices of state
- **`combine` middleware** — clean split between state and actions, types inferred
- **Feels like a tiny Redux** — store + actions, but far less ceremony
- **Great default** — simple apps, local/global state, low learning curve

---

## Jotai

- **Atomic state** — many small atoms instead of one big store
- **Bottom-up composition** — primitive atoms + derived atoms (`atom((get) => …)`)
- **Fine-grained updates** — components subscribe only to the atoms they use
- **Split read/write** — `useAtomValue`, `useSetAtom`, write-only action atoms
- **React-first** — feels natural when state is scattered across the component tree

---

## Valtio

- **Mutable proxy** — update state like normal objects (`push`, assign properties)
- **`useSnapshot` to read** — immutable snapshot for React; mutate the proxy to write
- **No actions/reducers required** — just functions that mutate the proxy
- **Very little boilerplate** — closest to "plain JS object" of all options here
- **Great when** — you want simple mutable state without Redux mental overhead

---

## XState Store

- **Events as first-class citizens** — state only changes through named handlers in `on: { … }`
- **Context + transitions** — each handler receives the current context and returns the next state
- **Typed `trigger` API** — `store.trigger.addTodo({ text })` instead of hand-written `{ type, payload }` objects
- **Snapshots** — `useSelector` reads immutable snapshots of `context`, so reads are always consistent
- **Tiny & focused** — ~1kb, no Provider, no middleware, no boilerplate beyond events and context

---

## Quick comparison

| Library           | In one sentence                                       |
| ----------------- | ----------------------------------------------------- |
| **Redux legacy**  | Explicit, verbose, teaches the fundamentals           |
| **Redux Toolkit** | Redux with 90% less boilerplate                       |
| **Zustand**       | One hook, one store, zero Provider                    |
| **Jotai**         | Atoms you compose, not one monolithic store           |
| **Valtio**        | Mutate objects directly, snapshot for React           |
| **XState Store**  | Named events update context, explicit, typed, minimal |

## Tech stack

- React 19 + TypeScript
- Vite
- Mantine UI
- TanStack Router
