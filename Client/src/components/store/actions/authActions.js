import axios from "axios";
const baseURL = "http://localhost:4000/api";

export const signUp = (user) => {
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/signup", user)
      .then((res) => {
        dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", payload: err.data });
      });
  };
};

export const signIn = (data) => {
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/signin", data)
      .then((res) => {
        console.log("ress", res);
        localStorage.setItem("userDetails", res.data.userToken);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.message });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", payload: err.response.data.message });
      });
  };
};
