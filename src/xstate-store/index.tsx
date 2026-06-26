import { Alert } from "@mantine/core";
import TodosApp from "./Todos";

export default function XStateStoreMain() {
  return (
    <>
      <Alert color="cyan" title="XState Store demo" mb="lg">
        Function components + <code>useSelector</code> + event transitions via{" "}
        <code>store.trigger</code>
      </Alert>
      <TodosApp />
    </>
  );
}
