import {
  fetchForgotPassword,
  fetchLogin,
  fetchMe,
  fetchRegister,
  fetchUserImageUpload,
  fetchUserUpdate,
} from "../../Api/user";
import * as ACTIONS from "../constants/user";

export const loginAction = (userLoginInfo) => async (dispatch) => {
  try {
    const data = await fetchLogin(userLoginInfo);
    dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: data });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (error) {
    return error.response.data?.message;
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    //const data = await fetchLogout()
    dispatch({ type: ACTIONS.USER_LOGOUT });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
  } catch (error) {}
};
export const registerAction = (userRegisterInfo) => async (dispatch) => {
  try {
    const data = await fetchRegister(userRegisterInfo);
    dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: data });
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  } catch (error) {
    return error.response.data?.message;
  }
};
export const imageUploadAction = (img,id,userInfo) => async (dispatch) => {
  try {
   const data = await fetchUserImageUpload(img);
   data&&dispatch(userUpdateAction(id,userInfo))
    return data
  } catch (error) {}
};
export const userUpdateAction = (id,userInfo) => async (dispatch) => {
  try {
    const data = await fetchUserUpdate(id,userInfo);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: ACTIONS.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {}
};
export const forgotMyPasswordAction = (email) => async (dispatch) => {
  try {
    const data = await fetchForgotPassword(email);
    dispatch({ type: ACTIONS.FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    return error.response.data?.message;
  }
};
