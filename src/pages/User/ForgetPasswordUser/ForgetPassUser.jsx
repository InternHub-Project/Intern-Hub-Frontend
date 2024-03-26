/* eslint-disable react-hooks/rules-of-hooks */
import classes from "./ForgetPassUser.module.css";

import { Button, Title } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ForgetPassUserSchema from "./ForgetPassUserSchema/ForgetPassUserSchema";
// import { notifications } from "@mantine/notifications";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function ForgetPassUser() {

  const navigate= useNavigate();
  function sendCode(values) {

    const data = { email: values.email };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    axios({
      method: "post",
      url: "https://api.codesplus.online/api/v1/auth/user/forgotPasswordEmail",
      headers: myHeaders,
      data: data,
    })
      .then((res) => {
        if (res.status == 200) {
          notifications.show({
            message: 'check your Gmail',
            color: "green",
          });
          setTimeout(()=>{
            navigate("/UpdatePasswordUser")
          },1000)
        }
        localStorage.setItem("gmail" , data.email)
      })
      .catch((err) => {
      
          notifications.show({
            message: `${err.response.data.message}`,
            color: "red",
          });
        
      });

  }

  return (
    <div className={classes.style}>
      <div>
        <Title ta="center" mt={"50px"} className={classes.title}>
          Forget password to user
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px 0px 0px",
          paddingBottom: "50px",
        }}
      >
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ForgetPassUserSchema}
          onSubmit={sendCode}
        >
          <Form className={classes.form}>
            <div>
              <label className={classes.label} htmlFor="email">
                Email:
              </label>
              <br />
              <Field
                className={classes.field}
                id="email"
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="email"
                component={"div"}
              />
            </div>
            <br />
            <div>
              <Button
                type="submit"
                style={{ width: "100%", margin: "10px auto 10px" }}
              >
                Send code
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
