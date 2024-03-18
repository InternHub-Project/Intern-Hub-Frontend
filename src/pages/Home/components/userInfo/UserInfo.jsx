import {
  Avatar,
  Box,
  Button,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./UserInfo.module.css";
import Search from "./component/search/Search";
import axios from "axios";

export function UserInfo() {
  const user = localStorage.getItem("userInfo");
  const userData = JSON.parse(user);
  console.log(userData);

  function logout() {


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    axios({
      method:"post",
      url:"http://54.159.209.90/api/v1/user/logout",
      headers:myHeaders,
      }).then((res)=>{
        if(res.status==200){

          notifications.show({
            message: "Success logout",
            color: "green",
          });
          setTimeout(() => {
            if(userData.companyId){
              location.href = "/LoginCompanies";
            }else{
              location.href = "/LoginUser";
            }
          }, 1000);

        }
      }).catch((err)=>{
        if(err.response.data.message){
          notifications.show({
            message: `${err.response.data.message}`,
            color: "red",
          });
        }
      })


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
        <Button
          bg={"none"}
          type="submit"
          onClick={() => {
            logout();
          }}
        >
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ color: "black", fontSize: "20px" }}
          ></i>
        </Button>
      </Group>
    </UnstyledButton>
  );
}
