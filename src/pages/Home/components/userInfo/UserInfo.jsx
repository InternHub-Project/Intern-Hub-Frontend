import classes from "./UserInfo.module.css";

import cx from "clsx";
import { useState } from "react";
import {
  Avatar,
  Box,
  Burger,
  Container,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconEdit,
  IconFile,
  IconLogout,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import {
  HTTP_METHODS,
  httpRequest,
} from "../../../../core/utils/httpRequest.js";
import APP_CONFIG from "../../../../core/utils/apiConfig.js";
import { useNavigate } from "react-router-dom";

export function UserInfo() {
  const navigate=useNavigate()
  const user = localStorage.getItem("userId");
  const userData = JSON.parse(user);

  function logout() {
    // navigate to login page
      if(JSON.parse(localStorage.getItem("userInfo")).data.userId){
      location.href = "LoginUser";
      } else if(JSON.parse(localStorage.getItem("userInfo")).data.companyId){
          location.href = "LoginCompanies";
      }
      else{
        location.href = "LoginUser";
      }
    localStorage.clear();
    httpRequest(APP_CONFIG.endpoints.user.logout, HTTP_METHODS.POST).then(
      (res) => {
        console.log(res);
  },
);
}

const handleChangePassword=()=>{
    navigate("/changePassword");
}
const handleProfile=()=>{
    navigate("/user_profile");
}
const handleApplication=()=>{
  navigate("/user/myapps")
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
                    {user ? (
                      <>
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
                      </>
                    ) : (
                      <></>
                    )}
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
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Profile
              </Menu.Item>

            <Menu.Item
                  onClick={handleProfile}
                leftSection={
                  <IconEdit
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Edit Profile
              </Menu.Item>

              {/* user || company application */}
              <Menu.Item
              onClick={handleApplication}
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

              {/* saved jobs */}
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
                  onClick={handleChangePassword}
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
                    color="red"
                    leftSection={
                      <IconTrash
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                   Delete Acoount
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
