import * as yup from "yup";

const validations = yup.object().shape({
  name: yup.string().min(3,"Ad en az 3 karakterden oluşmalıdır.").required("Bu alan boş bırakılamaz."),  
  surname: yup.string().min(2,"Soyad en az 2 karakterden oluşmalıdır.").required("Bu alan boş bırakılamaz."),  
  username: yup.string().min(3,"Kullanıcı Adı en az 3 karakterden oluşmalıdır.").required("Bu alan boş bırakılamaz."),
  email: yup.string().email("Geçerli bir email girin").required("Bu alan boş bırakılamaz."),
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
