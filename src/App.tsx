import { AppShell, Button, Container, Group, Title } from "@mantine/core";
import { Link, Outlet } from "@tanstack/react-router";

const links = [
  { label: "Redux legacy", to: "/redux-legacy" },
  { label: "Redux toolkit", to: "/redux-toolkit" },
  { label: "Zustand", to: "/zustand" },
  { label: "Jotai", to: "/jotai" },
  { label: "Valtio", to: "/valtio" },
  { label: "XState store", to: "/xstate-store" },
];

export default function App() {
  return (
    <AppShell header={{ height: 64 }}>
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group align="center" h="100%" gap="sm">
            <Link to="/" style={{ flex: 1, textDecoration: "none", color: "inherit" }}>
              <Title size="xl">Overview of State management</Title>
            </Link>
            {links.map((l) => (
              <Button component={Link} to={l.to} key={l.to} variant="subtle">
                {l.label}
              </Button>
            ))}
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
