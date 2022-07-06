export const login = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { loggedIn: true, user: action.payload.user };
    case "FORGOT_PASSWORD_SUCCESS":
      return { forgotPasswordInfo: action.payload };
    case "USER_UPDATE_SUCCESS":
      return {loading:false, loggedIn: true, user: action.payload };    
    case "USER_LOGOUT":
      return { loggedIn: false };
    default:
      return state;
  }
};
