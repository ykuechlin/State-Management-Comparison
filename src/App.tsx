import { Alert, Container } from "@mantine/core";
import { Provider } from "react-redux";
import { store, TodosApp } from "./redux-legacy";

export default function App() {
  return (
    <Provider store={store}>
      <Container size="sm" py="xl">
        <Alert color="yellow" title="Legacy Redux demo" mb="lg">
          Class components + <code>connect()</code> HOC, no Redux Toolkit
        </Alert>
        <TodosApp />
      </Container>
    </Provider>
  );
}
