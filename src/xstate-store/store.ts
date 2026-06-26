import { createStore } from "@xstate/store";
import type { Todo, VisibilityFilter } from "../types";

export const todoStore = createStore({
  context: {
    todos: [] as Todo[],
    visibilityFilter: "SHOW_ALL" as VisibilityFilter,
    nextTodoId: 1,
  },
  on: {
    addTodo: (context, event: { text: string }) => ({
      ...context,
      todos: [
        ...context.todos,
        {
          id: context.nextTodoId,
          text: event.text,
          completed: false,
        },
      ],
      nextTodoId: context.nextTodoId + 1,
    }),
    toggleTodo: (context, event: { id: number }) => ({
      ...context,
      todos: context.todos.map((todo) =>
        todo.id === event.id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }),
    removeTodo: (context, event: { id: number }) => ({
      ...context,
      todos: context.todos.filter((todo) => todo.id !== event.id),
    }),
    setVisibilityFilter: (context, event: { filter: VisibilityFilter }) => ({
      ...context,
      visibilityFilter: event.filter,
    }),
  },
});

export type TodoSnapshot = ReturnType<typeof todoStore.getSnapshot>;

export function selectVisibleTodos(snapshot: TodoSnapshot) {
  const { todos, visibilityFilter } = snapshot.context;

  switch (visibilityFilter) {
    case "SHOW_ACTIVE":
      return todos.filter((todo) => !todo.completed);
    case "SHOW_COMPLETED":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

export function selectActiveTodoCount(snapshot: TodoSnapshot) {
  return snapshot.context.todos.filter((todo) => !todo.completed).length;
}

export function selectVisibilityFilter(snapshot: TodoSnapshot) {
  return snapshot.context.visibilityFilter;
}
