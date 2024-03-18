import * as yup from "yup";

const UpdatepassUserSchema = yup.object().shape({
  code: yup.string().required("Code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

//Regex

export default UpdatepassUserSchema;
