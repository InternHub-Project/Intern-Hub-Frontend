import { Text } from "@mantine/core";
import classes from "./Home.module.css";
export default function Home() {
  return (
    <div>
       <Text mt={100} mb={100} className={classes.home}>Home page</Text>
{/*
      <div style={{ display: "flex", gap: "2rem", marginTop: "20px" }}>
        <div style={{ display: "grid" }}>
          <a href="/SignupCompanies">SignupCompanies</a>
          <a href="/LoginCompanies">LoginCompanies</a>
          <a href="/ForgetPassCompanies">ForgetPasswordCompanies</a>
          <a href="/UpdatePasswordCompanies">UpdatePasswordCompanies</a>
        </div>

        <div style={{ display: "grid" }}>
          <a href="/SignupUser">SignupUser</a>
          <a href="/LoginUser">LoginUser</a>
          <a href="/ForgetPasswordUser">ForgetPasswordUser</a>
          <a href="/UpdatePasswordUser">UpdatePasswordUser</a>
        </div>
      </div> */}
    </div>
  );
}
