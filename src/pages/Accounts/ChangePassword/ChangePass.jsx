import classes from "./ChangePass.module.css";
import { Button } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { notifications } from "@mantine/notifications";
import ChangePasswordSchema from "./ChangePassSchema/ChangePasswordSchema.jsx";
import { httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";


export default function ChangePass() {
  const token=JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")).data.token:JSON.parse(localStorage.getItem("companyInfo")).data.token
  function changePassword(values) {
    const data = {currentPassword:values.currentPassword,newPassword:values.newPassword,confirmPassword:values.confirmPassword};
    if (
      data.currentPassword === "" ||
      data.newPassword === "" ||
      data.confirmPassword === ""
    ) {
      notifications.show({
        message: "Wrong in one of the inputs",
        color: "red",
      });
      
    } else {
      delete data.confirmPassword
      httpRequest(API_CONFIG.endpoints.accounts.changePassword,"PUT",data,{Authorization:`internHub__${token}`})
    }
  }

  return (
    <div className={classes.style}>
      <div className={classes.titleHeader}>
        <p className={classes.title}>Change password</p>
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
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={changePassword}
          >
            <Form className={classes.form}>
              <div>
                <label className={classes.label} htmlFor="password">
                  Current Password:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <br />
              <div>
                <label className={classes.label} htmlFor="password">
                  New Password:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <br />
              <div>
                <label className={classes.label} htmlFor="confirmPassword">
                  Confirm Password:
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
                  Change Password{" "}
                </Button>
              </div>
            </Form>
          </Formik>
        </>
      </div>
    </div>
  );
}