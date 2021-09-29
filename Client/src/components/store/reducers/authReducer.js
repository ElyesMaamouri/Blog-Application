const initState = {
  registerInfo: null,
  loginInfo: null,
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
    default:
      return state;
  }
};

export default authReducer;
