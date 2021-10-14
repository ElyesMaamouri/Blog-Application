import axios from "axios";
import jwt_decode from "jwt-decode";

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

export const recoverPassword = (data) => {
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/recoverpassword", data)
      .then((res) => {
        dispatch({
          type: "RECOVER_PASSWORD_SUCCESS",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        // const message = err.response.data.message;
        // const codeMessage = err.response.status;
        dispatch({
          type: "RECOVER_PASSWORD_ERROR",
          payload: err.response.data.message,
        });
      });
  };
};

export const resetPassword = (data) => {
  const config = {
    headers: { Authorization: `Bearer ${data.resetPasswordToken}` },
  };
  return (dispatch, getState) => {
    axios
      .put(baseURL + "/reset-password", data, config)
      .then((res) => {
        dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: res.data.message });
      })
      .catch((err) => {
        console.log("data", err.response);
        dispatch({
          type: "RESET_PASSWORD_ERROR",
          payload: err.response.data.message,
        });
      });
  };
};

export const updateProfile = (data) => {
  console.log("data back", data);
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const userToken = jwt_decode(localStorage.getItem("userDetails"));

  return (dispatch, getState) => {
    axios
      .patch(baseURL + "/users/" + userToken.id, data, config)
      .then((res) => {
        console.log("res sucess", res);
        dispatch({ type: "PROFILE_UPDATE_SUCCESS", payload: res.data.message });
      })
      .catch((err) => {
        console.log("ressp err", err.response);
        dispatch({
          type: " PROFILE_UPDATE_ERROR",
          payload: err.response.data.message,
        });
      });
  };
};
