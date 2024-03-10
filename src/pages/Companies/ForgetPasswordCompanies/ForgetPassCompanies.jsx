import classes from "./ForgetPassCompanies.module.css";
import { Button, Title } from "@mantine/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ForgetPassCompaniesSchema from "./ForgetPassCompaniesSchema/ForgetPassCompaniesSchema";
import axios from "axios";
import { notifications } from "@mantine/notifications";


export default function ForgetPassCompanies() {

  function sendCode(values) {
    const data = { "email": values.email };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
axios({
  method:"post",
  url:"http://54.159.209.90/api/v1/auth/forgetPassword/company",
  headers:myHeaders,
  data:data

}).then((res=>{
  console.log(res);
  if (res.status == 200) {
          notifications.show({
            message: "please check your Email",
            color: "green",
          })
          // setTimeout(()=>{
          //   location.href="/"
          // },1000)
        }
})).catch((err=>{
  console.log(err);
  // if(err.response.data.errors[0].length>1){
  //   notifications.show({
  //     message: `${err.response.data.errors[0].message[0]}`,
  //     color: "red",
  //   });
  // }
  // else{
  //   notifications.show({
  //     message: `${err.response.data.errors[0].message}`,
  //     color: "red",
  //   });
  // }
 
}))
  }

  return (
    <div className={classes.style}>
      <div>
        <Title ta="center" mt={"50px"} className={classes.title}>
          Forget password to companies
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
          validationSchema={ForgetPassCompaniesSchema}
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
