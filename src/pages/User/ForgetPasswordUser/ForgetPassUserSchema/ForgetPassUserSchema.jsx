import * as yup from "yup";

const ForgetPassUserSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

export default ForgetPassUserSchema;
