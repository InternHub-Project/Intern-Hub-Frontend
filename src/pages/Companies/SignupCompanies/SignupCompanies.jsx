import classes from "./SignupCompanies.module.css";
import { Button, Divider, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { GoogleButton } from "./ButtonGoogle/GoogleButton";
import RegisterCompaniesSchema from "./RegisterCompaniesSchema/RegisterCompaniesSchema";
import { HTTP_METHODS, httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { showNotification } from "../../../core/helperMethods/showNotification.js";

export default function SignupCompanies() {
  function addCompanies(values) {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
        address: values.address,
        city: values.city,
        country: values.country,
        state:values.state,
      field: values.field,
    };

    if (
      data.name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.address.address === "" ||
      data.address.city === "" ||
      data.address.country === "" ||
      data.field === "" 
    ) {
      notifications.show({
        message: "Wrong in one of the inputs",
        color: "red",
      });
    } else {
      httpRequest(
        API_CONFIG.endpoints.auth.company.signup,
        HTTP_METHODS.POST,
        data,
      ).then((res) => {
        if (res.status === 201) {
          showNotification("Success register");
          setTimeout(() => {
            location.href = "/LoginCompanies";
          }, 1000);
        }
      });
    }
  }

  return (
    <div className={classes.style}>
      <div className={classes.titleHeader}>
        <p className={classes.title}>Sign-up to companies and apply for free</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className={classes.underline}></p>
        </div>
        <p className={classes.companies}>
          1,50,000+ companies hiring on Internships
        </p>
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
              name: "",
              email: "",
              password: "",
              address: "",
              city: "",
              state: "",
              country: "",
              postcode: "",
              field: "",
            }}
            validationSchema={RegisterCompaniesSchema}
            onSubmit={addCompanies}
          >
            <Form className={classes.form}>
              <Group grow mb="md" mt="md">
                <GoogleButton
                  radius="xl"
                  onClick={() => {
                    location.href =
                      "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=827625755886-edpmpa7jsvq8al2v03utohjqg4j2sd3b.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Finternshala.com%2Flogin%2Fgoogle&scope=profile%20email&response_type=code&state=eyAicm9sZSIgOiAidXNlciIsICJzdWNjZXNzX3BhZ2UiIDogIi9zdHVkZW50L2Rhc2hib2FyZCIsICJ1dG1fc291cmNlIiA6ICJpc19oZWFkZXJfaG9tZXBhZ2UiICwgInV0bV9tZWRpdW0iIDogIiIsICJ1dG1fY2FtcGFpZ24iIDogIiIgfQ%2C%2C&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow";
                  }}
                >
                  <span className={classes.btnGoogle}>Sign in with Google</span>
                </GoogleButton>
              </Group>
              <Divider
                label="OR"
                labelPosition="center"
                my="lg"
                color="black"
              />

              <div>
                <label className={classes.label} htmlFor="name">
                  Name:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <br />
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
                  placeholder="Email address"
                />
                <ErrorMessage
                  name="email"
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
                <label className={classes.label} htmlFor="field">
                  Field:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="field"
                  type="text"
                  name="field"
                  placeholder="Field"
                />
                <ErrorMessage
                  name="field"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <br />

              <div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div>
                    <label className={classes.label} htmlFor="address">
                      Address:
                    </label>
                    <br />

                    <Field
                      className={classes.field}
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <label className={classes.label} htmlFor="city">
                      City:
                    </label>
                    <br />

                    <Field
                      className={classes.field}
                      id="city"
                      type="text"
                      name="city"
                      placeholder="City"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <div>
                    <label className={classes.label} htmlFor="state">
                      State:
                    </label>
                    <br />

                    <Field
                      className={classes.field}
                      id="state"
                      type="text"
                      name="state"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className={classes.label} htmlFor="country">
                      Country:
                    </label>
                    <br />

                    <Field
                      className={classes.field}
                      id="country"
                      type="text"
                      name="country"
                      placeholder="Country"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
              </div>

              <br />
              <Text fz={12} mb={8}>
                {" "}
                <span className={classes.signing}>
                  By signing up, you agree to our{" "}
                </span>{" "}
                <span style={{ color: "#00A5EC", fontWeight: 500 }}>
                  Terms and Conditions.
                </span>
              </Text>
              <div>
                <Button style={{ width: "100%" }} type="submit">
                  Register{" "}
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-5px",
                    marginBottom: "-10px",
                  }}
                >
                  <p className={classes.loginNow}>Already registered? </p>
                  <a
                    href="/LoginCompanies"
                    style={{ color: "#00A5EC", textDecoration: "none" }}
                  >
                    Login
                  </a>
                </div>
              </div>
            </Form>
          </Formik>
        </>
      </div>
    </div>
  );
}
