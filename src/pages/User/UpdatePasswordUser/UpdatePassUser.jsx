import classes from "./UpdatePassUser.module.css";
import {Button} from "@mantine/core";
import {ErrorMessage, Field, Form, Formik} from "formik";
import UpdatepassUserSchema from "./UpdatepassUserSchema/UpdatepassUserSchema";
import {notifications} from "@mantine/notifications";
import {httpRequest} from "../../../utils/httpHelper.js";
import API_CONFIG from "../../../utils/apiConfig.js";

export default function UpdatePassUser() {

    let email
    if (localStorage.getItem("gmail")) {
        email = localStorage.getItem("gmail")
    } else {
        email = "Please Go To ForgetPassword First"
    }

    function updatePassword(values) {

        const data = {email, ...values};

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
            httpRequest(API_CONFIG.endpoints.setPassword, "PUT", data).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    notifications.show({
                        message: "Success update password",
                        color: "green",
                    });
                    setTimeout(() => {
                        location.href = "/LoginUser";
                    }, 1000);
                }

            }).catch((err) => {
                // console.log(err.response.data);
                if (err.response.data.message)
                    notifications.show({
                        message: `${err.response.data.message}`,
                        color: "red",
                    });
            });
        }
    }

    function resendCode() {
        httpRequest(API_CONFIG.endpoints.resendCode, "POST", {email}).then((res) => {
            if (res.status === 200) {
                notifications.show({
                    message: "Check your email",
                    color: "green",
                });
            }
        }).catch((err) => {
            if (err.response.data.message)
                notifications.show({
                    message: `${err.response.data.message}`,
                    color: "red",
                });
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
                        validationSchema={UpdatepassUserSchema}
                        onSubmit={updatePassword}
                    >
                        <Form className={classes.form}>
                            <div>
                                <label className={classes.label} htmlFor="firstName">
                                    Email:
                                </label>
                                <br/>
                                <input type="email" name="email" id="firstName" readOnly
                                       className={classes.field}
                                       value={`${email}`}
                                />
                            </div>
                            <br/>
                            <div>
                                <label className={classes.label} htmlFor="code">
                                    Code:
                                </label>
                                <br/>

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

                            <div>
                                <label className={classes.label} htmlFor="confirmPassword">
                                    Confirm password:
                                </label>
                                <br/>

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
                                    style={{color: "red"}}
                                />
                            </div>

                            <br/>
                            <div>

                                <Button style={{width: "100%"}} type="submit">
                                    Update Password{" "}
                                </Button>

                            </div>


                            <div style={{textAlign: "center", marginTop: "10px"}}>

                                <Button fullWidth onClick={() => {
                                    resendCode()
                                }} style={{color: "rgb(34,139,230)", backgroundColor: "#ffffff00"}}>
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
