import classes from "../userInfo/UserInfo.module.css";

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
  IconBrandTelegram,
  IconChevronDown,
  IconEdit,
  IconFile,
  IconLogout,

  // IconRepeat,
  IconSettings,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import {
  HTTP_METHODS,
  httpRequest,
} from "../../../../core/utils/httpRequest.js";
import APP_CONFIG from "../../../../core/utils/apiConfig.js";
import { useNavigate } from "react-router-dom";

export function CompanyInfo() {
    const navigate = useNavigate();

  const company = JSON.parse(localStorage.getItem("companyInfo"));

  function logout() {
    // navigate to login page
    location.href = "LoginCompanies";
    localStorage.clear();
    httpRequest(APP_CONFIG.endpoints.user.logout, HTTP_METHODS.POST).then(
      (res) => {
        console.log(res);
      }
    );
  }

  const handleChangePassword = () => {
    navigate("/changePassword");
  };
  const handleProfile = () => {
    navigate("/edite_company_profile");
  };


  const handleDeleteAccount = () => {
    navigate("/delete_account");
  };

  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container m={0} pl={0} className={classes.mainSection} size="md">
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
                  <Box></Box>
                  <Avatar
                    src={
                        company?.data?.image||"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                    }
                    alt={"fff"}
                    radius="xl"
                    size={40}
                  />
                  <div style={{ flex: 1 }}>
                    
                      <>
                        <Box>
                          {company.data.name ? (
                            <Text>{company.data.name}</Text>
                          ) : (
                            <Text size="sm" fw={500}>
                              company
                            </Text>
                          )}
                        </Box>
                        <Text c="dimmed" size="xs">
                          {company.email}
                        </Text>
                      </>
                   
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
                onClick={() => {
                  navigate("/company_profile");
                }}
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

           

              {/* saved jobs */}
              <Menu.Item
                onClick={() => {
                  location.href = "/chat";
                }}
                leftSection={
                  <IconBrandTelegram
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.green[6]}
                    stroke={1.5}
                  />
                }
              >
                Chat
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
                    onClick={handleDeleteAccount}
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
