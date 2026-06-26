import { Component, type SubmitEvent } from "react";
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
import { connect, type ConnectedProps } from "react-redux";
import type { Dispatch } from "redux";
import {
  addTodo,
  getActiveTodoCount,
  getVisibleTodos,
  removeTodo,
  setVisibilityFilter,
  toggleTodo,
  type RootState,
  type TodoAction,
  type VisibilityFilter,
} from "./store";

// --- Presentational class components -----------------------------------------

type AddTodoProps = {
  addTodo: (text: string) => void;
};

type AddTodoState = {
  input: string;
};

class AddTodo extends Component<AddTodoProps, AddTodoState> {
  state: AddTodoState = { input: "" };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const text = this.state.input.trim();
    if (!text) {
      return;
    }
    this.props.addTodo(text);
    this.setState({ input: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Group align="flex-end" gap="sm">
          <TextInput
            flex={1}
            placeholder="What needs to be done?"
            value={this.state.input}
            onChange={(event) =>
              this.setState({ input: event.currentTarget.value })
            }
          />
          <Button type="submit">Add</Button>
        </Group>
      </form>
    );
  }
}

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

class TodoItem extends Component<TodoItemProps> {
  handleToggle = () => {
    this.props.onToggle(this.props.id);
  };

  handleRemove = () => {
    this.props.onRemove(this.props.id);
  };

  render() {
    const { text, completed } = this.props;
    return (
      <Paper withBorder p="sm" radius="sm">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Checkbox checked={completed} onChange={this.handleToggle} />
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
            onClick={this.handleRemove}
            aria-label="Remove todo"
          >
            ×
          </ActionIcon>
        </Group>
      </Paper>
    );
  }
}

type TodoListProps = {
  todos: Array<{ id: number; text: string; completed: boolean }>;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

class TodoList extends Component<TodoListProps> {
  render() {
    const { todos, toggleTodo, removeTodo } = this.props;

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
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </Stack>
    );
  }
}

type FilterLinkProps = {
  filter: VisibilityFilter;
  currentFilter: VisibilityFilter;
  children: string;
  onSetFilter: (filter: VisibilityFilter) => void;
};

class FilterLink extends Component<FilterLinkProps> {
  handleClick = () => {
    this.props.onSetFilter(this.props.filter);
  };

  render() {
    const { filter, currentFilter, children } = this.props;
    const isActive = filter === currentFilter;

    return (
      <Button
        variant={isActive ? "filled" : "light"}
        size="compact-sm"
        onClick={this.handleClick}
      >
        {children}
      </Button>
    );
  }
}

type FooterProps = {
  activeCount: number;
  currentFilter: VisibilityFilter;
  setVisibilityFilter: (filter: VisibilityFilter) => void;
};

class Footer extends Component<FooterProps> {
  render() {
    const { activeCount, currentFilter, setVisibilityFilter } = this.props;

    return (
      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          {activeCount} item{activeCount === 1 ? "" : "s"} left
        </Text>
        <Group gap="xs">
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={currentFilter}
            onSetFilter={setVisibilityFilter}
          >
            All
          </FilterLink>
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={currentFilter}
            onSetFilter={setVisibilityFilter}
          >
            Active
          </FilterLink>
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={currentFilter}
            onSetFilter={setVisibilityFilter}
          >
            Completed
          </FilterLink>
        </Group>
      </Group>
    );
  }
}

// --- Connected container (the HOC pattern) -----------------------------------

type TodosAppProps = ConnectedProps<typeof connector>;

class TodosApp extends Component<TodosAppProps> {
  render() {
    const {
      todos,
      activeCount,
      visibilityFilter,
      addTodo,
      toggleTodo,
      removeTodo,
      setVisibilityFilter,
    } = this.props;

    return (
      <Stack gap="md">
        <Title order={1} ta="center">
          todos
        </Title>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
        <Footer
          activeCount={activeCount}
          currentFilter={visibilityFilter}
          setVisibilityFilter={setVisibilityFilter}
        />
      </Stack>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: getVisibleTodos(state),
    activeCount: getActiveTodoCount(state),
    visibilityFilter: state.visibilityFilter,
  };
}

function mapDispatchToProps(dispatch: Dispatch<TodoAction>) {
  return {
    addTodo: (text: string) => {
      dispatch(addTodo(text));
    },
    toggleTodo: (id: number) => {
      dispatch(toggleTodo(id));
    },
    removeTodo: (id: number) => {
      dispatch(removeTodo(id));
    },
    setVisibilityFilter: (filter: VisibilityFilter) => {
      dispatch(setVisibilityFilter(filter));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TodosApp);
