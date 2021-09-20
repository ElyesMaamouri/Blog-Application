const initState = {
  registerInfo: null,
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
    default:
      return state;
  }
};

export default authReducer;
