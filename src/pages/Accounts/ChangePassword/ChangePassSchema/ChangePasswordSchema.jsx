import * as yup from "yup";

const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current Password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});

export default ChangePasswordSchema;