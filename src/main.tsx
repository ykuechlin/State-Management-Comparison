import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import ReduxLegacyMain from "./redux-legacy";
import ReduxToolkitMain from "./redux-toolkit";
import ZustandMain from "./zustand";
import JotaiMain from "./jotai";
import ValtioMain from "./valtio";
import XStateStoreMain from "./xstate-store";
import Home from "./Home";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
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

const zustandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zustand",
  component: ZustandMain,
});

const jotaiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jotai",
  component: JotaiMain,
});

const valtioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/valtio",
  component: ValtioMain,
});

const xstateStoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xstate-store",
  component: XStateStoreMain,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    reduxLegacyRoute,
    reduxToolkit,
    zustandRoute,
    jotaiRoute,
    valtioRoute,
    xstateStoreRoute,
  ]),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
