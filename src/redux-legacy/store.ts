import { combineReducers, createStore, type Action } from "redux";

// --- Types -------------------------------------------------------------------

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type VisibilityFilter = "SHOW_ALL" | "SHOW_ACTIVE" | "SHOW_COMPLETED";

export type RootState = {
  todos: Todo[];
  visibilityFilter: VisibilityFilter;
};

// --- Action type constants (the pre-RTK way) --------------------------------

export const ADD_TODO = "ADD_TODO" as const;
export const TOGGLE_TODO = "TOGGLE_TODO" as const;
export const REMOVE_TODO = "REMOVE_TODO" as const;
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER" as const;

// --- Action creators ---------------------------------------------------------

export function addTodo(text: string) {
  return { type: ADD_TODO, payload: { text } } as const;
}

export function toggleTodo(id: number) {
  return { type: TOGGLE_TODO, payload: { id } } as const;
}

export function removeTodo(id: number) {
  return { type: REMOVE_TODO, payload: { id } } as const;
}

export function setVisibilityFilter(filter: VisibilityFilter) {
  return { type: SET_VISIBILITY_FILTER, payload: { filter } } as const;
}

export type TodoAction = ReturnType<
  | typeof addTodo
  | typeof toggleTodo
  | typeof removeTodo
  | typeof setVisibilityFilter
>;

// --- Reducers ----------------------------------------------------------------

let nextTodoId = 1;

function todosReducer(state: Todo[] = [], action: Action): Todo[] {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: nextTodoId++,
          text: (action as ReturnType<typeof addTodo>).payload.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === (action as ReturnType<typeof toggleTodo>).payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case REMOVE_TODO:
      return state.filter(
        (todo) =>
          todo.id !== (action as ReturnType<typeof removeTodo>).payload.id,
      );
    default:
      return state;
  }
}

function visibilityFilterReducer(
  state: VisibilityFilter = "SHOW_ALL",
  action: Action,
): VisibilityFilter {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return (action as ReturnType<typeof setVisibilityFilter>).payload.filter;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
});

// --- Selectors (plain functions, no createSlice) -----------------------------

export function getVisibleTodos(state: RootState): Todo[] {
  switch (state.visibilityFilter) {
    case "SHOW_ACTIVE":
      return state.todos.filter((todo) => !todo.completed);
    case "SHOW_COMPLETED":
      return state.todos.filter((todo) => todo.completed);
    default:
      return state.todos;
  }
}

export function getActiveTodoCount(state: RootState): number {
  return state.todos.filter((todo) => !todo.completed).length;
}

// --- Store -------------------------------------------------------------------
export const store = createStore(rootReducer);
