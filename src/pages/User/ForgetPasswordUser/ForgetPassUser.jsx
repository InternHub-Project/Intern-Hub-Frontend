import classes from "./ForgetPassUser.module.css";
import {Button, Title} from "@mantine/core";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ForgetPassUserSchema from "./ForgetPassUserSchema/ForgetPassUserSchema";
import {notifications} from "@mantine/notifications";
import {httpRequest} from "../../../utils/httpRequest.js";
import API_CONFIG from "../../../utils/apiConfig.js";

export default function ForgetPassUser() {


    function sendCode(values) {

        const data = {email: values.email};

        httpRequest(API_CONFIG.endpoints.auth.forgetPassword, HTTP_METHODS.POST, data).then((res) => {
            if (res.status === 200) {
                notifications.show({
                    message: "Check your email",
                    color: "green",
                });
            }
        });

    }

    return (
        <div className={classes.style}>
            <div>
                <Title ta="center" mt={"50px"} className={classes.title}>
                    Forget password to user
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
                    }}
                    validationSchema={ForgetPassUserSchema}
                    onSubmit={sendCode}
                >
                    <Form className={classes.form}>
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
                                placeholder="Email"
                            />
                            <ErrorMessage
                                style={{color: "red"}}
                                name="email"
                                component={"div"}
                            />
                        </div>
                        <br/>
                        <div>
                            <Button
                                type="submit"
                                style={{width: "100%", margin: "10px auto 10px"}}
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
