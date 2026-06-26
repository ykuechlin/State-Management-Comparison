import { Alert, Container } from "@mantine/core";
import { Provider } from "react-redux";
import TodosApp from "./Todos";
import { store } from "./store";

export default function ReduxToolkitMain() {
  return (
    <Provider store={store}>
      <Container size="sm" py="xl">
        <Alert color="blue" title="Modern Redux Toolkit demo" mb="lg">
          Function components + <code>useSelector</code> / <code>useDispatch</code> hooks
        </Alert>
        <TodosApp />
      </Container>
    </Provider>
  );
}
