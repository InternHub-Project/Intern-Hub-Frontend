import * as yup from "yup";

const RegisterUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 6 characters")
    .max(30, "Firs name must be at most 30 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be at least 6 characters")
    .max(30, "Last name must be at most 30 characters"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

//Regex

export default RegisterUserSchema;
