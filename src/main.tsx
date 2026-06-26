import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import ReduxLegacyMain from "./redux-legacy";
import ReduxToolkitMain from "./redux-toolkit";

const rootRoute = createRootRoute({
  component: App,
});

const reduxLegacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/redux-legacy",
  component: ReduxLegacyMain,
});

const reduxToolkit = createRoute({
  getParentRoute: () => rootRoute,
  path: "/redux-toolkit",
  component: ReduxToolkitMain,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([reduxLegacyRoute, reduxToolkit]),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
