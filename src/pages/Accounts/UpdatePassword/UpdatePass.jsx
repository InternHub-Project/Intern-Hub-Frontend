import classes from "./UpdatePass.module.css";
import { Button } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { notifications } from "@mantine/notifications";
import { httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import UpdatePasswordSchema from "./UpdatepassSchema/UpdatePasswordSchema.jsx";
import {  showNotification } from "../../../core/helperMethods/showNotification.js";
import { useNavigate } from "react-router-dom";



export default function UpdatePassUser() {
  const navigate = useNavigate();

  let email;
  const type=localStorage.getItem("type")
  if (localStorage.getItem("email")) {
    email = localStorage.getItem("email");
  } else {
    email = "Please Go To Forget Password First";
  }

  function updatePassword(values) {
    const data = {email,type,password:values.password,code:values.code,confirmPassword:values.confirmPassword};
    if (
      data.code === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      notifications.show({
        message: "Wrong in one of the inputs",
        color: "red",
      });
    } else {
      delete data.confirmPassword;
      httpRequest(API_CONFIG.endpoints.auth.setPassword, "PUT", data).then(
        (res) => {
          if (res.status === 200) {
            notifications.show({
              message: "Success update password",
              color: "green",
            });
            if(type=="user"){
              setTimeout(() => {
                navigate("/LoginUser");
              }, 1000);
            }
            else{
              setTimeout(() => {
                navigate("/LoginCompanies");
              }, 1000);
            }
           localStorage.clear()
          }
        }
      );
    }
  }

  function resendCode() {
    httpRequest(API_CONFIG.endpoints.auth.resendCode, "POST", { email,type }).then(
      (res) => {
        if (res.status === 200) {
        showNotification("Check your email")
        }
      }
    );
  }

  return (
    <div className={classes.style}>
      <div className={classes.titleHeader}>
        <p className={classes.title}>Update password</p>
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
              type: "User", // Default value for type
            }}
            validationSchema={UpdatePasswordSchema}
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
                <label className={classes.label} htmlFor="type">
                  Type:
                </label>
                <br />
                <Field
                  as="input"
                  className={classes.field}
                  id="type"
                  name="type"
                  value={`${type}`}
                  readOnly
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
                  style={{ color: "rgb(34,139,230)", backgroundColor: "#ffffff00" }}
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