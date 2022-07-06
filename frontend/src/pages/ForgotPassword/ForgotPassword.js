import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCheckToken } from "../../Api/user";
import { forgotMyPasswordAction } from "../../redux/actions/user";
import validationSchema from "./validations";

function ForgotPassword() {
  const dispatch = useDispatch()
  const {forgotPasswordInfo} = useSelector(state=> state.userLogin)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async(values, bag) => {
       const isError =await  dispatch(forgotMyPasswordAction(values));
         isError && bag.setErrors({general:isError})
    },
  });
  return (
    <div className="page-wrapper bg-gra-01 p-t-45 p-b-50">
      <div className="wrapper wrapper--w790">
        <div className="card card-5">
          <div className="card-heading">
            <h2 className="title">Şifre Sıfırla</h2>
          </div>

          <div className="card-body">           
            {forgotPasswordInfo&& (
               <div className="alert alert-success">
               {forgotPasswordInfo}
             </div>
            )}
            {formik.errors.general && (
              <div className="alert alert-danger">
                {formik.errors.general}
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-row">
                <div className="name">Email</div>
                <div className="value">
                  <div className="input-group-desc">
                    <div className="errorInputText">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="email"
                      type="text"
                      className={`form-control 
                            ${formik.errors.general && "errorInput"}
                            ${
                              formik.touched.email &&
                              formik.errors.email &&
                              "errorInput"
                            }`}
                      placeholder="Email girin..."
                    />
                  </div>
                </div>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn--radius-2 btn--blue" type="submit">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
