import { useFormik } from "formik";
import validationSchema from "./validations";
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'
import { loginAction } from "../../redux/actions/user";

function Login() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {      
      username: "",
      password: "",    
    },
    validationSchema,
    onSubmit: async (values, bag) => {   
        const isError =await dispatch(loginAction(values));      
        isError && bag.setErrors({ general: isError }); 
    },
  });
  return (
    <div className="page-wrapper bg-gra-01 p-t-45 p-b-50">
    <div className="wrapper wrapper--w790">
        <div className="card card-5">
            <div className="card-heading">
                <h2 className="title">Giriş</h2>
            </div>
           
            <div className="card-body">
            {formik.errors.general && (
           <div style={{position:"absolute",width:"78.5%"}} className="alert alert-danger">{formik.errors.general}</div>
            )}
                <form style={{marginTop:"80px"}} onSubmit={formik.handleSubmit}>                    
                    <div className="form-row">
                        <div className="name">Kullanıcı Adı</div>
                        <div className="value">
                            <div className="input-group-desc">
                            <div className="errorInputText">
                            {formik.touched.username && formik.errors.username}
                          </div>
                            <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name="username"
                            type="text"
                            className={`form-control 
                            ${formik.touched.username && formik.errors.username && "errorInput"}`}
                            placeholder="Kullanıcı adı girin..."
                          />                         
                            </div>
                        </div>
                    </div>                   
                        <div className="form-row">
                        <div className="name">Şifre</div>
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
                                ${formik.touched.password && formik.errors.password && "errorInput"}`}
                                placeholder="Şifrenizi girin..."
                              />
                                                         
                            </div>
                        </div>
                    </div>                   
                    <div><Link to={"/forgot-password"}>Şifrenizi mi unuttunuz?</Link></div>
                    <div style={{marginTop:"10px"}}><Link to={"/sign-up"}>Hesabınız yok mu?</Link></div>
                    <div style={{float:"right"}}>
                        <button className="btn btn--radius-2 btn--blue" type="submit">Giriş</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

  );
}

export default Login;
