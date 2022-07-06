import axios from "axios";

export const fetchRegister = async (userData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/`,
    userData
  );
  return data;
};
export const fetchLogin = async (userData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/login`,
    userData
  );
  return data;
};
export const fetchUserImageUpload = async (img) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/update-profile-image`,
    img,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  return data;
};
export const fetchUserUpdate = async (id, userData) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/${id}`,
    userData,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  return data;
};
export const fetchCheckToken = async (token) => {
    try {
     const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/users/check-token`,
      {token:token}
    );
    return data;
    } catch (er) {
      return er.response.data 
    }
    
  };
export const fetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/me`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  return data;
};
export const fetchForgotPassword = async (email) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/reset-password`,
    email
  );
  return data;
};
export const fetchResetPassword = async (id, token, newPassword) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/users/reset-password/${id}/${token}`,
    newPassword
  );
  return data;
};
