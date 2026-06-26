import { Button, List, Stack, Text, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";

const demos = [
  {
    label: "Redux legacy",
    to: "/redux-legacy",
    summary: "Class components, connect(), manual reducers",
  },
  {
    label: "Redux Toolkit",
    to: "/redux-toolkit",
    summary: "createSlice, hooks, modern Redux",
  },
  {
    label: "Zustand",
    to: "/zustand",
    summary: "Single store hook, no Provider",
  },
  {
    label: "Jotai",
    to: "/jotai",
    summary: "Composable atoms, fine-grained subscriptions",
  },
  {
    label: "Valtio",
    to: "/valtio",
    summary: "Mutable proxy, useSnapshot to read",
  },
  {
    label: "XState Store",
    to: "/xstate-store",
    summary: "Context + event transitions, typed triggers",
  },
];

export default function Home() {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Title order={1}>State Management Comparison</Title>
        <Text c="dimmed" size="lg">
          Six implementations of the same Todo app — same UI, same features, different libraries.
          Pick a demo from the header or the list below to compare how each approach handles state.
        </Text>
      </Stack>

      <Text>
        Every demo supports adding, toggling, and removing todos, plus filtering by All, Active, or
        Completed. The goal is to see the trade-offs side by side: boilerplate vs. ergonomics,
        explicit events vs. direct mutation, monolithic store vs. atoms.
      </Text>

      <Stack gap="xs">
        <Title order={3}>Demos</Title>
        <List spacing="sm">
          {demos.map((demo) => (
            <List.Item key={demo.to}>
              <Button component={Link} to={demo.to} variant="subtle" size="compact-sm">
                {demo.label}
              </Button>
              {" — "}
              {demo.summary}
            </List.Item>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
