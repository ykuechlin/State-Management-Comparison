import { Alert, Container } from "@mantine/core";
import TodosApp from "./Todos";

export default function ValtioMain() {
  return (
    <Container size="sm" py="xl">
      <Alert color="orange" title="Valtio demo" mb="lg">
        Function components + <code>useSnapshot</code> to read, mutate the{" "}
        <code>proxy</code> directly
      </Alert>
      <TodosApp />
    </Container>
  );
}
