const initState = {
  registerInfo: null,
  loginInfo: null,
  recoverPasswordInfo: null,
  resetPasswordInfo: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        registerInfo: action.payload.message,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,

        registerInfo: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginInfo: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginInfo: action.payload,
      };
    case "RECOVER_PASSWORD_SUCCESS":
      return {
        ...state,
        recoverPasswordInfo: action.payload,
      };
    case "RECOVER_PASSWORD_ERROR":
      return {
        ...state,
        recoverPasswordInfo: action.payload,
      };

    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        resetPasswordInfo: action.payload,
      };

    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        resetPasswordInfo: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
