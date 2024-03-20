  import classes from './LoginCompanies.module.css'
  import { Button, Title } from "@mantine/core";
  import { notifications } from "@mantine/notifications";
  import { ErrorMessage, Field, Form, Formik } from "formik";
  import loginUserSchema from './LoginCompaniesSchema/LoginCompaniesSchema';
  import axios from 'axios';



  
  export default function LoginCompanies() {



    function loginUser(values) {
      const data={"email":values.email,"password":values.password}
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      axios({
        method:"post",
        url:"http://54.159.209.90/api/v1/auth/company/login",
        headers:myHeaders,
        withCredentials: true,
        data:data
      }).then((res=>{
        console.log(res);
        if (res.status == 200) {
          notifications.show({
            message: "Success register",
            color: "green",
          })
          setTimeout(()=>{
            location.href="/"
          },1000)
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        }
      })).catch((err=>{
        console.log(err);
        if(err.response.data.message){
          notifications.show({
            message: `${err.response.data.message}`,
            color: "red",
          });
        }
      }))
    }
    return (
      <div className={classes.style}>
        <div>
          <Title ta="center" className={classes.title}>
            Welcome back com! 
          </Title>
          
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px auto 0px",
            paddingBottom: "50px",
          }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginUserSchema}
            onSubmit={loginUser}
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
                  style={{ color: "red" }}
                  name="password"
                  component={"div"}
                />
              </div>
              <br />
              <div
                  style={{
                    textAlign: "end",
                    fontWeight: 500,
                    color: "rgb(51,51,51)",
                    marginTop:"-20px",
                    marginBottom:"-8px"
                  }}>
                  <a
                    href="/ForgetPassCompanies"
                    style={{ textDecoration: "none", color: "#00A5EC", margin:"0px" }}>
                    Forget password?
                  </a>
                </div>
              <br />

              <div>
                <Button
                  type="submit"
                  style={{ width: "100%", margin: "0px auto 0px" }}>
                  Login
                </Button>
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: 500,
                    marginRight: "5px",
                    color: "rgb(51,51,51)",
                    marginBottom:"0px"
                  }}>
                  don{"'"}t have an account?{" "}
                  <a
                    href="/SignupCompanies"
                    style={{ textDecoration: "none", color: "#00A5EC" }}>
                    Register now
                  </a>
                </p>
              
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
