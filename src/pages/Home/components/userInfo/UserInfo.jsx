// import {
//   Avatar,
//   Box,
//   Button,
//   Group,
//   Text,
//   UnstyledButton,
// } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
import classes from "./UserInfo.module.css";
// import Search from "./component/search/Search";
// import axios from "axios";

/* eslint-disable react-hooks/rules-of-hooks */
import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  useMantineTheme,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconStar,
  IconSettings,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconFile,
  IconEdit,
  IconRepeat,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

// const user = {
//   name: "Jane Spoonfighter",
//   email: "janspoon@fighter.dev",
//   image:
//     "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
// };

export function UserInfo() {
  const user = localStorage.getItem("userId");
  const userData = JSON.parse(user);
  // console.log(userData);

  function logout() {
    localStorage.clear();
    notifications.show({
      message: "Success logout",
      color: "green",
    });
    setTimeout(() => {
      if (userData.companyId) {
        location.href = "/LoginCompanies";
      } else {
        location.href = "/LoginUser";
      }
    }, 500);
  }

  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={16}>
                  <Avatar
                    src={
                      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                    }
                    alt={"fff"}
                    radius="xl"
                    size={40}
                  />
                  <div style={{ flex: 1 }}>
                    <Box>
                      {userData.name ? (
                        <Text>{userData.name}</Text>
                      ) : (
                        <Text size="sm" fw={500}>
                          {userData.firstName} {userData.lastName}
                        </Text>
                      )}
                    </Box>
                    <Text c="dimmed" size="xs">
                      {userData.email}
                    </Text>
                  </div>
                  <IconChevronDown
                    style={{ width: rem(15), height: rem(15) }}
                    stroke={1.5}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconFile
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.green[6]}
                    stroke={1.5}
                  />
                }
              >
                My Application
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved Jobs
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconEdit
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Edit Resume
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>

              <Menu trigger="hover">
                <Menu.Target>
                  <Group>
                    <Menu.Item
                      leftSection={
                        <IconSettings
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      Account settings
                      <IconChevronDown
                        size="0.9rem"
                        style={{ marginLeft: "15px" }}
                        stroke={1.5}
                      />
                    </Menu.Item>
                  </Group>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconSwitchHorizontal
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Change Password
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconRepeat
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Change Email
                  </Menu.Item>

                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Delete Account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Menu.Item
                onClick={() => {
                  logout();
                }}
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}
