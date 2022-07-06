import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCheckToken, fetchResetPassword } from "../../Api/user";
import validationSchema from "./validations";

function ResetPassword() {
  const {id, token } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetchCheckToken(token);
      res?.error && setErr(res.error)
      setLoading(false)
    })();
  }, [setErr]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const data = await fetchResetPassword(id, token, values);
        bag.setStatus({ message: data });
        navigate("/sign-in");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  if(err){
    return(
      <div className="page-wrapper bg-gra-01 p-t-45 p-b-50">
      <div className="wrapper wrapper--w790">
        <div className="card card-5">
          <div className="card-body py-4" style={{fontSize:"20px",textAlign:"center"}}>            
          {err}
        </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <>
    {!loading&&<div className="page-wrapper bg-gra-01 p-t-45 p-b-50">
      <div className="wrapper wrapper--w790">
        <div className="card card-5">
          <div className="card-heading">
            
           <h2 className="title">Yeni Şifre Oluştur</h2>
           </div>

          <div className="card-body">
            {formik.status && (
              <div className="alert alert-success">{formik.status.message}</div>
            )}
            {formik.errors.general && (
              <>
                <div className="alert alert-danger">
                  {formik.errors.general}
                </div>
              </>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-row">
                <div className="name">Yeni Şifre</div>
                <div className="value">
                  <div className="input-group-desc">
                    <div className="errorInputText">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    <input
                      onChange={formik.handleChange}
                      name="password"
                      onBlur={formik.handleBlur}
                      type="password"
                      className={`form-control 
                                ${
                                  formik.touched.password &&
                                  formik.errors.password &&
                                  "errorInput"
                                }`}
                      placeholder="Yeni şifrenizi girin..."
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Yeni Şifre Tekrar</div>
                <div className="value">
                  <div className="input-group-desc">
                    <input
                      onChange={formik.handleChange}
                      name="confirmPassword"
                      type="password"
                      onBlur={formik.handleBlur}
                      className={`form-control 
                              ${
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword &&
                                "errorInput"
                              }`}
                      placeholder="Yeni şifrenizi onaylayın..."
                    />
                    <div className="errorInputText">
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </div>
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
    </div>}</>
  );
}

export default ResetPassword;
