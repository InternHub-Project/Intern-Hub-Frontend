import * as yup from "yup";

const ForgetPassSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

export default ForgetPassSchema;
