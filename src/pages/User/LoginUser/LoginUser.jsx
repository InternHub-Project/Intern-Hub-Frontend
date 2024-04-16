import classes from "./LoginUser.module.css";
import { Button, Title } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import loginUserSchema from "./LoginUserSchema/LoginUserSchema";
import { HTTP_METHODS, httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import {
  NOTIFICATION_TYPES,
  showNotification,
} from "../../../core/helperMethods/showNotification.js";

export default function LoginUser() {
  function loginUser(values) {
    httpRequest(API_CONFIG.endpoints.auth.user.login, HTTP_METHODS.POST, {
      email: values.email,
      password: values.password,
    }).then((result) => {
      showNotification(result.message, NOTIFICATION_TYPES.SUCCESS);
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      setTimeout(() => {
        location.href = "/";
      }, 1000);
    });
  }

  return (
    <div className={classes.style}>
      <div>
        <Title ta="center" className={classes.title}>
          Welcome back User!
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px auto 0px",
          paddingBottom: "50px",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginUserSchema}
          onSubmit={loginUser}
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
              <label className={classes.label} htmlFor="password">
                Password:
              </label>
              <br />
              <Field
                className={classes.field}
                id="password"
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="password"
                component={"div"}
              />
            </div>
            <br />
            <div
              style={{
                textAlign: "end",
                fontWeight: 500,
                color: "rgb(51,51,51)",
                marginTop: "-20px",
                marginBottom: "-8px",
              }}
            >
              <a
                href="/ForgetPasswordUser"
                style={{
                  textDecoration: "none",
                  color: "#00A5EC",
                  margin: "0px",
                }}
              >
                Forget password?
              </a>
            </div>
            <br />

            <div>
              <Button
                type="submit"
                style={{ width: "100%", margin: "0px auto 0px" }}
              >
                Login
              </Button>
              <p className={classes.registerNow} style={{}}>
                don{"'"}t have an account?{" "}
                <a
                  href="/SignupUser"
                  style={{ textDecoration: "none", color: "#00A5EC" }}
                >
                  Register now
                </a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
