import { AppShell, Button, Group, Title } from "@mantine/core";
import { Link, Outlet } from "@tanstack/react-router";

const links = [
  { label: "Redux legacy", to: "/redux-legacy" },
  { label: "Redux toolkit", to: "/redux-toolkit" },
  { label: "Zustand", to: "/zustand" },
];

export default function App() {
  return (
    <AppShell header={{ height: 64 }}>
      <AppShell.Header>
        <Group align="center" h="100%" px="lg">
          <Title flex={1}>Overview of State management</Title>
          {links.map((l) => (
            <Button component={Link} to={l.to} key={l.to}>
              {l.label}
            </Button>
          ))}
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
