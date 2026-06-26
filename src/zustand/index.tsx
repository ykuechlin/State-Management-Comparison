import { Alert } from "@mantine/core";
import TodosApp from "./Todos";

export default function ZustandMain() {
  return (
    <>
      <Alert color="teal" title="Zustand demo" mb="lg">
        Function components + <code>useTodoStore</code> hook, no Provider needed
      </Alert>
      <TodosApp />
    </>
  );
}
