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
  HoverCard,
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


  const itemsNav = links.map((link) => {
    return (
      <a
        key={link.id}
        href={link.link}
        className={classes.link}
        data-active-nav={link.link.endsWith(active) || undefined}
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
          <Box
            display={"flex"}
            className={classes.styleMobile}
            style={{ alignItems: "center" }}
          >
            <Box display={"flex"} style={{ alignItems: "center" }}>
              <img
                src="https://ik.imagekit.io/abdullahAhmed/internHub/internHub-logo/WhatsApp%20Image%202024-04-18%20at%2019.22.21_b3fd28be.jpg?updatedAt=1713557100914"
                alt=""
                width={"150px"}
                height={"100px"}
              />
              <Box ml={-50}>
                <Text className={classes.inter} fz={25} fw={700}>
                  Intern
                </Text>
                <Text className={classes.hub} fz={25} fw={700} mt={-13}>
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
                <HoverCard width={280} shadow="md">
                  <HoverCard.Target>
                    <Button
                     
                      variant="outline"
                    >
                      Login
                    </Button>
                  </HoverCard.Target>

                  <HoverCard.Dropdown style={{ width: "fit-content" }}>
                    <Button
                      mr={15}
                      onClick={() => {
                        location.href = "/LoginUser";
                      }}
                      variant="outline"
                    >
                      User Login
                    </Button>

                    <Button
                      onClick={() => {
                        location.href = "/LoginCompanies";
                      }}
                      variant="outline"
                    >
                      Company Login
                    </Button>
                  </HoverCard.Dropdown>
                </HoverCard>

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
          
                      {itemsNav}
         

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button  onClick={()=>{location.href="/SignupUser"}}> User Sign-up</Button>
            <Button onClick={()=>{location.href="/SignupCompanies"}}>  Company Sign-up</Button>
          </Group>

          <Group justify="center" grow pb="xl" px="md" mt={-15}>
            <Button variant="outline" onClick={()=>{location.href="/LoginUser"}}>User Login</Button>
            <Button variant="outline" onClick={()=>{location.href="/LoginCompanies"}}>Company Login</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
