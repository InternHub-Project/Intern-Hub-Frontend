import classes from "./ForgetPass.module.css";
import { Button, Title } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ForgetPassSchema from "./ForgetPassSchema/ForgetPassSchema";
import { notifications } from "@mantine/notifications";
import { httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { useNavigate } from "react-router-dom";


export default function ForgetPass() {
  const Navigate=useNavigate()
  function sendCode(values) {
    const data = { email: values.email, type: values.type };
    localStorage.setItem("email", values.email)
    localStorage.setItem("type", values.type)
    httpRequest(API_CONFIG.endpoints.auth.forgetPassword, "POST", data).then(
      (res) => {
        if (res.status === 200) {
          notifications.show({
            message: "Check your email",
            color: "green",
          });
          setTimeout(() => {
            Navigate("/UpdatePassword")
            // location.href = "/UpdatePassword";
          }, 1000);
        }
      }
    );
  }

  return (
    <div className={classes.style}>
      <div>
        <Title ta="center" mt={"50px"} className={classes.title}>
          Forget password
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
            type: "", 
          }}
          validationSchema={ForgetPassSchema}
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
            <div>
              <label className={classes.label} htmlFor="type">
                Type:
              </label>
              <br />
              <Field as="select" className={classes.field} id="type" name="type">
                <option value="">Select Type</option>
                <option value="user">User</option>
                <option value="company">Company</option>
              </Field>
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