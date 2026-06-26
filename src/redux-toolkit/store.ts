import {
  combineReducers,
  configureStore,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { Todo, VisibilityFilter } from "../types";

// --- Slices ------------------------------------------------------------------

let nextTodoId = 1;

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    todoAdded(state, action: PayloadAction<{ text: string }>) {
      state.push({
        id: nextTodoId++,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action: PayloadAction<{ id: number }>) {
      const todo = state.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todoRemoved(state, action: PayloadAction<{ id: number }>) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

const visibilityFilterSlice = createSlice({
  name: "visibilityFilter",
  initialState: "SHOW_ALL" as VisibilityFilter,
  reducers: {
    visibilityFilterChanged(_state, action: PayloadAction<VisibilityFilter>) {
      return action.payload;
    },
  },
});

export const { todoAdded, todoToggled, todoRemoved } = todosSlice.actions;
export const { visibilityFilterChanged } = visibilityFilterSlice.actions;

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
  visibilityFilter: visibilityFilterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// --- Selectors ---------------------------------------------------------------

const selectTodos = (state: RootState) => state.todos;
const selectVisibilityFilter = (state: RootState) => state.visibilityFilter;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectVisibilityFilter],
  (todos, visibilityFilter) => {
    switch (visibilityFilter) {
      case "SHOW_ACTIVE":
        return todos.filter((todo) => !todo.completed);
      case "SHOW_COMPLETED":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
);

export const selectActiveTodoCount = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => !todo.completed).length,
);

// --- Typed hooks -------------------------------------------------------------

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
