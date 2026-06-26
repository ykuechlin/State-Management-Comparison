import { Alert } from "@mantine/core";
import TodosApp from "./Todos";

export default function ValtioMain() {
  return (
    <>
      <Alert color="orange" title="Valtio demo" mb="lg">
        Function components + <code>useSnapshot</code> to read, mutate the <code>proxy</code>{" "}
        directly
      </Alert>
      <TodosApp />
    </>
  );
}
