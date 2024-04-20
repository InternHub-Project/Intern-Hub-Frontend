import classes from "./SignupUser.module.css";
import { Button, Divider, Group, Text } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import { GoogleButton } from "./ButtonGoogle/GoogleButton";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import RegisterUserSchema from "./RegisterUserSchema/RegisterUserSchema";
import { HTTP_METHODS, httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import {
  NOTIFICATION_TYPES,
  showNotification,
} from "../../../core/helperMethods/showNotification.js";
import { useNavigate } from "react-router-dom";
export default function SignupUser() {
  const Navigate=useNavigate()
  console.log("SignupUser");

  function addUser(values) {
    const data = { ...values };
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.password === ""
    ) {
      showNotification("Wrong in one of the inputs", NOTIFICATION_TYPES.ERROR);
    } else {
      data.userName=`${data.firstName} ${data.lastName}`
      delete data.firstName
      delete data.lastName
      httpRequest(
        API_CONFIG.endpoints.auth.user.signup,
        HTTP_METHODS.POST,
        data,
      ).then((res) => {
        if (res.status === 201) {
          showNotification("Success register");
          setTimeout(() => {
            location.href = "/LoginUser";
          }, 1000);
        }
      });
    }
  }
const clientId = "660288962062-oute3qb7ecihdoogaqb2nijlht714o7i.apps.googleusercontent.com"
  function handleGoogleLogin (response){
    const accessToken = response?.credential;
    if (accessToken) {
      httpRequest(API_CONFIG.endpoints.auth.user.loginWithGoogle,"POST",JSON.stringify({accessToken})).then((res=>{
        if(res.status==200||res.status==201){
          Navigate("/")
          localStorage.setItem("userInfo",JSON.stringify(res.data))
        }
      }))
    }
  }

  return (
    <div className={classes.style}>
      <div className={classes.titleHeader}>
        <p className={classes.title}>Sign-up to user and apply for free</p>
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
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={RegisterUserSchema}
            onSubmit={addUser}
          >
            <Form className={classes.form}>
              <Group grow mb="md" mt="md">
                <GoogleOAuthProvider   clientId={clientId}
                
                 >
                <GoogleLogin
                 onSuccess={(response)=>{handleGoogleLogin(response)}}
                 onError={(error) => console.error(error)}
                 buttonText="Sign in with Google"/>
                </GoogleOAuthProvider>
             
              </Group>
              <Divider
                label="OR"
                labelPosition="center"
                my="lg"
                color="black"
              />
              <div>
                <label className={classes.label} htmlFor="firstName">
                  First name:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="firstName"
                  type="username"
                  name="firstName"
                  placeholder="firstName"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <br />
              <div>
                <label className={classes.label} htmlFor=" lastName">
                  Last name:
                </label>
                <br />

                <Field
                  className={classes.field}
                  id="lastName"
                  type="username"
                  name="lastName"
                  placeholder="lastName"
                />
                <ErrorMessage
                  name="lastName"
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
              <Text fz={12} mb={8} mt={-5}>
                {" "}
                <span className={classes.signing}>
                  By signing up, you agree to our{" "}
                </span>
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
                  <p className={classes.register}>Already registered? </p>
                  <a
                    href="/LoginUser"
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
