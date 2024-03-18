import { Avatar, Box, Button, Group, Text, UnstyledButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./UserInfo.module.css";
import Search from './component/search/Search';

export function UserInfo() {
  const user = localStorage.getItem("info");
  console.log(user.username);
  function logout() {
    localStorage.remove("info");
    notifications.show({
      message: "Success logout",
      color: "green",
    });
    setTimeout(() => {
      location.href = "/login";
    }, 1000);
  }
  return (
    <UnstyledButton className={classes.user}>
      <Search />
      <Group ml={25}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Box>
            <Text size="sm" fw={500}>
              {user.firstName}
            </Text>
            <Text size="sm" fw={500}>
              {user.lastName}
            </Text>
          </Box>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>
        <Button
          bg={"none"}
          type="submit"
          onClick={() => {
            logout();
          }}>
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ color: "black", fontSize: "20px" }}></i>
        </Button>
      </Group>
    </UnstyledButton>
  );
}
