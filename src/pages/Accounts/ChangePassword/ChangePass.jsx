import classes from "./ChangePass.module.css";
import { Button } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { notifications } from "@mantine/notifications";
import ChangePasswordSchema from "./ChangePassSchema/ChangePasswordSchema.jsx";
import axios from "axios";



export default function ChangePass() {

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
      axios({
        method: 'put',
        url: "https://api.codesplus.online/api/v1/account/changePassword",
        headers:{
          "Content-Type": "application/json",
          "Authorization": "internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM1NjEyMTEsImV4cCI6MTcxMzY0NzYxMX0.5oYzlUE6wKXn0fckkCRvEDag1RObmN-BdUAJb2PPmzs",
        },data
      }).then((res=>{
        console.log(res);
        notifications.show({
          message: `${res.data.message}`,
          color: "green",
        });
      })).catch((err=>{
        console.log(err);
        notifications.show({
          message: `${err.response.data.message}`,
          color: "red",
        });
      }))
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