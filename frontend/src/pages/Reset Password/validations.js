import * as yup from "yup";

const validations = yup.object().shape({
  password: yup
  .string()
  .min(6, "Şifre en az 6 karakterden oluşmalıdır")
  .required("Bu alan boş bırakılamaz."),
confirmPassword: yup
  .string()
  .oneOf([yup.ref("password")], "Girdiğiniz şifreler aynı değil.")
  .required("Bu alan boş bırakılamaz."),
});
export default validations;
