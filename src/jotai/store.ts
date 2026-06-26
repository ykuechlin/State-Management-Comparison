import { atom } from "jotai";
import type { Todo, VisibilityFilter } from "../types";

let nextTodoId = 1;

// --- Primitive atoms ---------------------------------------------------------

export const todosAtom = atom<Todo[]>([]);
export const visibilityFilterAtom = atom<VisibilityFilter>("SHOW_ALL");

// --- Action atoms (write-only) -----------------------------------------------

export const addTodoAtom = atom(null, (_get, set, text: string) => {
  set(todosAtom, (todos) => [
    ...todos,
    { id: nextTodoId++, text, completed: false },
  ]);
});

export const toggleTodoAtom = atom(null, (_get, set, id: number) => {
  set(todosAtom, (todos) =>
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  );
});

export const removeTodoAtom = atom(null, (_get, set, id: number) => {
  set(todosAtom, (todos) => todos.filter((todo) => todo.id !== id));
});

export const setVisibilityFilterAtom = atom(
  null,
  (_get, set, filter: VisibilityFilter) => {
    set(visibilityFilterAtom, filter);
  },
);

// --- Derived atoms -----------------------------------------------------------

export const visibleTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const visibilityFilter = get(visibilityFilterAtom);

  switch (visibilityFilter) {
    case "SHOW_ACTIVE":
      return todos.filter((todo) => !todo.completed);
    case "SHOW_COMPLETED":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
});

export const activeTodoCountAtom = atom(
  (get) => get(todosAtom).filter((todo) => !todo.completed).length,
);
