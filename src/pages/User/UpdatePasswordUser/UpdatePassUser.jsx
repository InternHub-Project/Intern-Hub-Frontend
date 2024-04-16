import classes from "./UpdatePassUser.module.css";
import { Button } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import UpdatePassUserSchema from "./UpdatepassUserSchema/UpdatePassUserSchema.jsx";
import { HTTP_METHODS, httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import {
  NOTIFICATION_TYPES,
  showNotification,
} from "../../../core/helperMethods/showNotification.js";

export default function UpdatePassUser() {
  let email;
  if (localStorage.getItem("gmail")) {
    email = localStorage.getItem("gmail");
  } else {
    email = "Please Go To Forget Password First";
  }

  function updatePassword(values) {
    const data = { email, ...values };

    if (
      data.code === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      showNotification("Wrong in one of the inputs", NOTIFICATION_TYPES.ERROR);
    } else {
      delete data.confirmPassword;
      httpRequest(
        API_CONFIG.endpoints.auth.setPassword,
        HTTP_METHODS.PUT,
        data,
      ).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          showNotification("Success update password");
          setTimeout(() => {
            location.href = "/LoginUser";
          }, 1000);
        }
      });
    }
  }

  function resendCode() {
    httpRequest(API_CONFIG.endpoints.auth.resendCode, HTTP_METHODS.POST, {
      email,
    }).then((res) => {
      if (res.status === 200) {
        showNotification("Code sent successfully");
      }
    });
  }

  return (
    <div className={classes.style}>
      <div className={classes.titleHeader}>
        <p className={classes.title}>Update password to user</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "50px auto 0px",
          paddingBottom: "50px",
        }}
      >
        <>
          <Formik
            initialValues={{
              code: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={UpdatePassUserSchema}
            onSubmit={updatePassword}
          >
            <Form className={classes.form}>
              <div>
                <label className={classes.label} htmlFor="firstName">
                  Email:
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="firstName"
                  readOnly
                  className={classes.field}
                  value={`${email}`}
                />
              </div>
              <br />
              <div>
                <label className={classes.label} htmlFor="code">
                  Code:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="code"
                  type="text"
                  name="code"
                  placeholder="Enter code"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  style={{ color: "red" }}
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
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <br />

              <div>
                <label className={classes.label} htmlFor="confirmPassword">
                  Confirm password:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <br />
              <div>
                <Button style={{ width: "100%" }} type="submit">
                  Update Password{" "}
                </Button>
              </div>

              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Button
                  fullWidth
                  onClick={() => {
                    resendCode();
                  }}
                  style={{
                    color: "rgb(34,139,230)",
                    backgroundColor: "#ffffff00",
                  }}
                >
                  Resend code
                </Button>
              </div>
            </Form>
          </Formik>
        </>
      </div>
    </div>
  );
}
