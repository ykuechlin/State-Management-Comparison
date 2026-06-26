import { Alert } from "@mantine/core";
import TodosApp from "./Todos";

export default function JotaiMain() {
  return (
    <>
      <Alert color="grape" title="Jotai demo" mb="lg">
        Function components + <code>useAtom</code> / <code>useAtomValue</code> /{" "}
        <code>useSetAtom</code>, atomic state
      </Alert>
      <TodosApp />
    </>
  );
}
