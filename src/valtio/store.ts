import { proxy } from "valtio";
import type { Todo, VisibilityFilter } from "../types";

let nextTodoId = 1;

export const todoState = proxy({
  todos: [] as Todo[],
  visibilityFilter: "SHOW_ALL" as VisibilityFilter,
});

export type TodoState = typeof todoState;

// --- Actions (mutate the proxy directly) -------------------------------------

export function addTodo(text: string) {
  todoState.todos.push({
    id: nextTodoId++,
    text,
    completed: false,
  });
}

export function toggleTodo(id: number) {
  const todo = todoState.todos.find((item) => item.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

export function removeTodo(id: number) {
  todoState.todos = todoState.todos.filter((item) => item.id !== id);
}

export function setVisibilityFilter(filter: VisibilityFilter) {
  todoState.visibilityFilter = filter;
}

// --- Selectors (read from snapshot in components) ----------------------------

export function selectVisibleTodos(state: {
  todos: readonly Todo[];
  visibilityFilter: VisibilityFilter;
}) {
  switch (state.visibilityFilter) {
    case "SHOW_ACTIVE":
      return state.todos.filter((todo) => !todo.completed);
    case "SHOW_COMPLETED":
      return state.todos.filter((todo) => todo.completed);
    default:
      return state.todos;
  }
}

export function selectActiveTodoCount(state: { todos: readonly Todo[] }) {
  return state.todos.filter((todo) => !todo.completed).length;
}
