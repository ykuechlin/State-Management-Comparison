import { useSnapshot } from "valtio/react";
import { type SubmitEvent, useState } from "react";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import type { VisibilityFilter } from "../types";
import {
  addTodo,
  removeTodo,
  selectActiveTodoCount,
  selectVisibleTodos,
  setVisibilityFilter,
  todoState,
  toggleTodo,
} from "./store";

function AddTodo() {
  const [input, setInput] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) {
      return;
    }
    addTodo(text);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group align="flex-end" gap="sm">
        <TextInput
          flex={1}
          placeholder="What needs to be done?"
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
        />
        <Button type="submit">Add</Button>
      </Group>
    </form>
  );
}

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
};

function TodoItem({ id, text, completed }: TodoItemProps) {
  return (
    <Paper withBorder p="sm" radius="sm">
      <Group justify="space-between" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <Checkbox checked={completed} onChange={() => toggleTodo(id)} />
          <Text
            td={completed ? "line-through" : undefined}
            c={completed ? "dimmed" : undefined}
          >
            {text}
          </Text>
        </Group>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => removeTodo(id)}
          aria-label="Remove todo"
        >
          ×
        </ActionIcon>
      </Group>
    </Paper>
  );
}

function TodoList() {
  const snap = useSnapshot(todoState);
  const todos = selectVisibleTodos(snap);

  if (todos.length === 0) {
    return (
      <Paper withBorder p="md" radius="sm">
        <Text c="dimmed" ta="center">
          No todos yet. Add one above!
        </Text>
      </Paper>
    );
  }

  return (
    <Stack gap="xs">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </Stack>
  );
}

type FilterLinkProps = {
  filter: VisibilityFilter;
  children: string;
};

function FilterLink({ filter, children }: FilterLinkProps) {
  const snap = useSnapshot(todoState);
  const isActive = filter === snap.visibilityFilter;

  return (
    <Button
      variant={isActive ? "filled" : "light"}
      size="compact-sm"
      onClick={() => setVisibilityFilter(filter)}
    >
      {children}
    </Button>
  );
}

function Footer() {
  const snap = useSnapshot(todoState);
  const activeCount = selectActiveTodoCount(snap);

  return (
    <Group justify="space-between" mt="md">
      <Text size="sm" c="dimmed">
        {activeCount} item{activeCount === 1 ? "" : "s"} left
      </Text>
      <Group gap="xs">
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </Group>
    </Group>
  );
}

export default function TodosApp() {
  return (
    <Stack gap="md">
      <Title order={1} ta="center">
        todos
      </Title>
      <AddTodo />
      <TodoList />
      <Footer />
    </Stack>
  );
}
