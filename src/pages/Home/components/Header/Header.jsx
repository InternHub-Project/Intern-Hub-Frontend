import classes from "./Header.module.css";
import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserInfo } from "./../userInfo/UserInfo";
import Search from "./../userInfo/component/search/Search";

const links = [
  { id: 1, link: "/", label: "Home" },
  { id: 2, link: "/jobs", label: "Jobs" },
  { id: 3, link: "/internships", label: "Internships" },
];

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  // const theme = useMantineTheme();

  const active = window.location.pathname.split("/")[1] || "/";

  const items = links.map((link) => {
    return (
      <a
        key={link.id}
        href={link.link}
        className={classes.link}
        data-active={link.link.endsWith(active) || undefined}
        onClick={() => {}}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Box display={"flex"} className={classes.styleMobile}  style={{ alignItems: "center" }}>
            <Box display={"flex"} style={{ alignItems: "center" }}>
              <img
                src="src/pages/Home/components/Logo/WhatsApp Image 2024-03-18 at 05.38.27_e1f021fa.jpg"
                alt=""
                width={"150px"}
                height={"100px"}
              />
              <Box ml={-50}>
                <Text c={"rgb(34,139,230)"} fz={25} fw={700}>
                  Intern
                </Text>
                <Text fz={25} fw={700} mt={-13}>
                  Hub
                </Text>
              </Box>
            </Box>
            <Group h="100%" gap={0} visibleFrom="lg" ml={30}>
              {items}
            </Group>
          </Box>

          <Group visibleFrom="lg" mr={25}>
            <Search />
            {localStorage.length ? (
              <UserInfo />
            ) : (
              <>
                <Button
                  onClick={() => {
                    location.href = "/LoginUser";
                  }}
                  variant="outline"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    location.href = "/SignupCompanies";
                  }}
                >
                  Company Sign-up
                </Button>
                <Button
                  onClick={() => {
                    location.href = "/SignupUser";
                  }}
                >
                  User Sign-up
                </Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="lg"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="lg"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/jobs" className={classes.link}>
            Jobs
          </a>
          <a href="/internships" className={classes.link}>
            Internships
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
