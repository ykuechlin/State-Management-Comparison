import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { Todo, VisibilityFilter } from "../types";

let nextTodoId = 1;

export const useTodoStore = create(
  combine(
    {
      todos: [] as Todo[],
      visibilityFilter: "SHOW_ALL" as VisibilityFilter,
    },
    (set) => ({
      addTodo: (text: string) => {
        set((state) => ({
          todos: [...state.todos, { id: nextTodoId++, text, completed: false }],
        }));
      },
      toggleTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        }));
      },
      removeTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      setVisibilityFilter: (filter: VisibilityFilter) => {
        set({ visibilityFilter: filter });
      },
    }),
  ),
);

export type TodoStore = ReturnType<typeof useTodoStore.getState>;

export const selectVisibleTodos = (state: TodoStore) => {
  switch (state.visibilityFilter) {
    case "SHOW_ACTIVE":
      return state.todos.filter((todo) => !todo.completed);
    case "SHOW_COMPLETED":
      return state.todos.filter((todo) => todo.completed);
    default:
      return state.todos;
  }
};

export const selectActiveTodoCount = (state: TodoStore) =>
  state.todos.filter((todo) => !todo.completed).length;
