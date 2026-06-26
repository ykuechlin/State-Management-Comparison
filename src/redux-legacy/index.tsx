import { Alert } from "@mantine/core";
import { Provider } from "react-redux";
import TodosApp from "./Todos";
import { store } from "./store";

export default function ReduxLegacyMain() {
  return (
    <Provider store={store}>
      <Alert color="yellow" title="Legacy Redux demo" mb="lg">
        Class components + <code>connect()</code> HOC, no Redux Toolkit
      </Alert>
      <TodosApp />
    </Provider>
  );
}
