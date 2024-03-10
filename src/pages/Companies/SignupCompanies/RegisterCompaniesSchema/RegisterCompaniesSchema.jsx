import * as yup from "yup";


const RegisterCompaniesSchema = yup.object().shape({
  name: yup
  .string()
  .required("Name is required")
  .min(6, "Name must be at least 6 characters")
  .max(30, "Name must be at most 30 characters"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  address: yup 
    .string()
    .required("Address is required")
    .max(50, "Address must be at most 50 characters"),
  city: yup
    .string()
    .required("City is required")
    .max(30, "City must be at most 30 characters"),
  country: yup 
    .string()
    .required("Country is required")
    .max(30, "Country must be at most 30 characters"),
  field: yup 
    .string()
    .required("Field is required")
    .max(30, "Field must be at most 30 characters"),
});

//Regex

export default RegisterCompaniesSchema;
