import { useFormik } from "formik";
import validationSchema from "./validations";
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { registerAction } from "../../redux/actions/user";
function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {leggedIn} = useSelector(state=> state.userLogin)
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async(values, bag) => {  
        const { confirmPassword, ...others } = values;
        const isError =await dispatch(registerAction(others));
        isError && bag.setErrors({general:isError})
        leggedIn && navigate("/sign-in")     
    },
  });
  return (
    
    
    <div className="page-wrapper bg-gra-01 p-t-45 p-b-50">
    <div className="wrapper wrapper--w790">
        <div className="card card-5">
            <div className="card-heading">
                <h2 className="title">Kaydol</h2>
            </div>
           
            <div className="card-body">
            {formik.errors.general && (
           <div className="alert alert-danger">{formik.errors.general}</div>
            )}
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-row mt-2 m-b-55">
                        <div className="name">Ad Soyad</div>
                        <div className="value">
                            <div className="row row-space">
                                <div className="col-2">
                                    <div className="input-group-desc">
                                    <div className="errorInputText">
                                         {formik.touched.name && formik.errors.name}
                                       </div>
                                       <input
                                         onChange={formik.handleChange}
                                         type="text"
                                         name="name"
                                         onBlur={formik.handleBlur}
                                         className={`form-control ${
                                           formik.values.name && !formik.errors.name && "successInput"
                                         } ${formik.touched.name && formik.errors.name && "errorInput"}`}
                                         placeholder="Adınızı girin..."
                                       />
                                     <label className="label--desc" htmlFor="name">Ad</label>                                                                              
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="input-group-desc">
                                    <div className="errorInputText">
                                         {formik.touched.surname && formik.errors.surname}
                                       </div>
                                    <input
                                         onChange={formik.handleChange}
                                         type="text"
                                         name="surname"
                                         onBlur={formik.handleBlur}
                                         className={`form-control  ${
                                           formik.values.surname && !formik.errors.surname && "successInput"
                                         } ${formik.touched.surname && formik.errors.surname && "errorInput"}`}
                                         placeholder="Syadınızı girin..."
                                       />
                                     <label className="label--desc" htmlFor="surname">Soyad</label>                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            ${(formik.errors.general?.id ==="userAlreadyExists" ) && 'errorInput'}
                            ${formik.touched.username && formik.errors.username && "errorInput"}`}
                            placeholder="Kullanıcı adı girin..."
                          />                         
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="name">Email</div>
                        <div className="value">
                            <div className="input-group-desc">
                            <div className="errorInputText">
                                {formik.touched.email && formik.errors.email}
                              </div>
                            <input
                                onChange={formik.handleChange}
                                type="email"
                                name="email"
                                className={`form-control 
                                ${(formik.errors.general?.id ==="emailAlreadyExists" ) && 'errorInput'}
                                ${formik.touched.email && formik.errors.email && "errorInput"}`}
                                onBlur={formik.handleBlur}
                                placeholder="Email girin..."
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
                                ${(formik.values.password&&!formik.errors.password ) && 'successInput'}
                                ${formik.touched.password && formik.errors.password && "errorInput"}`}
                                placeholder="Şifrenizi girin..."
                              />
                                                         
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="name">Şifre Tekrar</div>
                        <div className="value">
                            <div className="input-group-desc">
                            <input
                              onChange={formik.handleChange}
                              name="confirmPassword"
                              type="password"
                              onBlur={formik.handleBlur}
                              className={`form-control 
                              ${(formik.values.confirmPassword&&!formik.errors.confirmPassword ) && 'successInput'}
                              ${formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                "errorInput"
                              }`}
                              placeholder="Şifrenizi onaylayın..."
                            />
                            <div className="errorInputText">
                              {formik.touched.confirmPassword && formik.errors.confirmPassword}
                            </div>                                                         
                            </div>
                        </div>
                    </div>
                    <div><Link to={"/sign-in"}>Zaten bir hesabınız var mı?</Link></div>
                    <div style={{float:"right"}}>
                        <button className="btn btn--radius-2 btn--red" type="submit">Kaydol</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

  );
}

export default Register;
