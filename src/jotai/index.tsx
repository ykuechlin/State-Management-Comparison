import { Alert, Container } from "@mantine/core";
import TodosApp from "./Todos";

export default function JotaiMain() {
  return (
    <Container size="sm" py="xl">
      <Alert color="grape" title="Jotai demo" mb="lg">
        Function components + <code>useAtom</code> / <code>useAtomValue</code> /{" "}
        <code>useSetAtom</code>, atomic state
      </Alert>
      <TodosApp />
    </Container>
  );
}
