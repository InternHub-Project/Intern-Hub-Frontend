import classes from "./SignupUser.module.css";
import {Button, Divider, Group, Text} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {GoogleButton} from "./ButtonGoogle/GoogleButton";
import RegisterUserSchema from "./RegisterUserSchema/RegisterUserSchema";
import {httpRequest} from "../../../utils/httpRequest.js";
import API_CONFIG from "../../../utils/apiConfig.js";

export default function SignupUser() {
    console.log("SignupUser");

    function addUser(values) {
        const data = {...values};
        if (
            data.firstName === "" ||
            data.lastName === "" ||
            data.email === "" ||
            data.password === ""
        ) {
            // console.log(data.username);
            notifications.show({
                message: "Wrong in one of the inputs",
                color: "red",
            });
        } else {
            httpRequest(API_CONFIG.endpoints.auth.user.signup, HTTP_METHODS.POST, data).then((res) => {
                if (res.status === 201) {
                    notifications.show({
                        message: "Success register",
                        color: "green",
                    });
                    setTimeout(() => {
                        location.href = "/LoginUser";
                    }, 1000);
                }
            });
        }
    }

    return (
        <div className={classes.style}>
            <div className={classes.titleHeader}>
                <p className={classes.title}>Sign-up to user and apply for free</p>
                <div style={{display: "flex", justifyContent: "center"}}>
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
                                <GoogleButton
                                   
                                    radius="xl"
                                    onClick={() => {
                                        location.href =
                                            "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=827625755886-edpmpa7jsvq8al2v03utohjqg4j2sd3b.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Finternshala.com%2Flogin%2Fgoogle&scope=profile%20email&response_type=code&state=eyAicm9sZSIgOiAidXNlciIsICJzdWNjZXNzX3BhZ2UiIDogIi9zdHVkZW50L2Rhc2hib2FyZCIsICJ1dG1fc291cmNlIiA6ICJpc19oZWFkZXJfaG9tZXBhZ2UiICwgInV0bV9tZWRpdW0iIDogIiIsICJ1dG1fY2FtcGFpZ24iIDogIiIgfQ%2C%2C&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow";
                                    }}
                                >
                                   <span  className={classes.btnGoogle}>
                                    Sign in with Google
                                    </span> 
                                </GoogleButton>
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
                                <br/>

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
                                    style={{color: "red"}}
                                />
                            </div>
                            <br/>
                            <div>
                                <label className={classes.label} htmlFor=" lastName">
                                    Last name:
                                </label>
                                <br/>

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
                                    style={{color: "red"}}
                                />
                            </div>
                            <br/>
                            <div>
                                <label className={classes.label} htmlFor="email">
                                    Email:
                                </label>
                                <br/>

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
                                    style={{color: "red"}}
                                />
                            </div>
                            <br/>

                            <div>
                                <label className={classes.label} htmlFor="password">
                                    Password:
                                </label>
                                <br/>

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
                                    style={{color: "red"}}
                                />
                            </div>


                            <br/>
                            <Text fz={12} mb={8} mt={-5}>
                                {" "}
                                <span className={classes.signing}>

                                By signing up, you agree to our{" "}
                                </span>
                                <span style={{color: "#00A5EC", fontWeight: 500}}>
                  Terms and Conditions.
                </span>
                            </Text>
                            <div>
                                <Button style={{width: "100%"}} type="submit">
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
                                    <p 
                                    className={classes.register}
                                      
                                    >
                                        Already registered?{" "}
                                    </p>
                                    <a
                                        href="/LoginUser"
                                        style={{color: "#00A5EC", textDecoration: "none"}}
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
