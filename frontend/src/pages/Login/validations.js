import * as yup from "yup";

const validations = yup.object().shape({
  username: yup.string().min(3,"Kullanıcı Adı en az 3 karakterden oluşmalıdır.").required("Bu alan boş bırakılamaz."),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakterden oluşmalıdır")
    .required("Bu alan boş bırakılamaz."),
});
export default validations;
