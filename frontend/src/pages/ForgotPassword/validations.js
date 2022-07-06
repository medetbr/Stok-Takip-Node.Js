import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Geçerli bir email girin").required("Bu alan boş bırakılamaz."),
});
export default validations;
