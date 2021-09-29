import axios from "axios";
const baseURL = "http://localhost:4000/api/signup";

export const signUp = (user) => {
  console.log("user api", user);
  return (dispatch, getState) => {
    axios
      .post(baseURL, user)
      .then((res) => {
        dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", payload: err.data });
      });
  };
};
