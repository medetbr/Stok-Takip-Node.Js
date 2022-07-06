import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { imageUploadAction, userUpdateAction } from "../../redux/actions/user";
import _ from "lodash";
function Profile() {
  const { user } = useSelector((state) => state.userLogin);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const dispatch = useDispatch();
  const imageHandler = (e) => {
    if (e.target.files[0].type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(e.target.files[0]);
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      username: user?.username,      
    },
    onSubmit: async (values, bag) => {
      const oldUserInfo = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,       
      };

      if (!_.isEqual(oldUserInfo, values )||imgPreview) {
        let isError = null;
        if (img) {
          const multipartFile = new FormData();
          multipartFile.append("image", img);
          await dispatch(imageUploadAction(multipartFile,user._id, values)); 
          setImgPreview(null)         
        } else {
          isError = await dispatch(userUpdateAction(user._id, values));
          setImgPreview(null)         
        }

        isError
          ? bag.setErrors({ general: isError })
          : bag.setStatus({
              message: "Bilgileriniz başarılı bir şekilde güncellenmiştir.",
            });
      } else {
        bag.setErrors({
          general:
            "Bilgilerinizin güncellenmesi için bilgilerinizde bir değişiklik yapılması gerekiyor.",
        });
      }
    },
  });
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Hesabım</h4>
          </div>
          {formik.errors.general && (
            <div
              style={{ margin: "25px 30px 10px 25px" }}
              className="alert alert-danger"
            >
              {formik.errors.general}
            </div>
          )}
          {formik.status?.message && (
            <div
              style={{ margin: "25px 30px 10px 25px" }}
              className="alert alert-success"
            >
              {formik.status.message}
            </div>
          )}
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="pr-1 col-md-6">
                  <div className="form-group">
                    <label>Ad</label>
                    <input
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div className="pl-1 col-md-6">
                  <div className="form-group">
                    <label>Soyad</label>
                    <input
                      name="surname"
                      value={formik.values.surname}
                      onChange={formik.handleChange}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="pr-1 col-md-7">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div className="pl-1 col-md-5">
                  <div className="form-group">
                    <label>Kullanıcı Adı</label>
                    <input
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-updated">
                Güncelle
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card-user card">
          <div className="card-body">
            <div className="author">
              <img
                className="profile-img avatar border-gray"
                src={
                  imgPreview
                    ? imgPreview
                    : user.profileImage
                    ? `images/${user.profileImage}`
                    : "assets/noAvatar.png"
                }
              />
              <h5 className="profile-change-title">
                <label htmlFor="img-change">değiştir</label>{" "}
                <input onChange={imageHandler} id="img-change" type="file" />
              </h5>
              <h5>{user.name+" "+user.surname}</h5>
            </div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
