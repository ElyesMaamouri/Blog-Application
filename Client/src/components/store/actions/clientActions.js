import axios from "axios";
const baseURL = "http://localhost:4000/api";
const token = localStorage.getItem("userDetails");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getListClient = (page) => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/clients/?page=" + page, config)
      .then((res) => {
        dispatch({ type: "GET_CLIENTS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "GET_CLIENTS_ERROR",
          payload: err.response.data,
        });
      });
  };
};

export const removeClient = (idClient) => {
  return (dispatch, getState) => {
    axios
      .delete(baseURL + "/clients/" + idClient, config)
      .then((res) => {
        console.log("ress", res);
        dispatch({
          type: "DELETE_CLIENT_SUCCESS",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CLIENT_ERROR",
          payload: err.response.data.message,
        });
      });
  };
};

export const updateClient = (data, idClient) => {
  return (dispatch, getState) => {
    axios
      .patch(baseURL + "/clients/" + idClient, data, config)
      .then((res) => {
        dispatch({
          type: "UPDATE_CLIENT_SUCCESS",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        console.log("ress", err.response);
        dispatch({
          type: "UPDATE_CLIENT_ERROR",
          payload: err.response.data.message,
        });
      });
  };
};

export const resetStateRemoveClient = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_INITIAL_STATE_REMOVE_CLIENT", payload: "" });
  };
};
