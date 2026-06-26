import { Alert, Container } from "@mantine/core";
import TodosApp from "./Todos";

export default function ZustandMain() {
  return (
    <Container size="sm" py="xl">
      <Alert color="teal" title="Zustand demo" mb="lg">
        Function components + <code>useTodoStore</code> hook, no Provider needed
      </Alert>
      <TodosApp />
    </Container>
  );
}
