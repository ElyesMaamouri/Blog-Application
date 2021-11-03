import axios from "axios";
import decodeTokens from "../../../helpers/decodeToken";
const baseURL = "http://localhost:4000/api";
const token = localStorage.getItem("userDetails");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
const userToken = decodeTokens();
export const addArticle = (data) => {
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/articles", data, config)
      .then((res) => {
        console.log("data blog", res.data);
        dispatch({ type: "ADD_ARTICLE_SUCCESS", payload: res.data.message });
      })
      .catch((err) => {
        console.log("errr", err.response);
        dispatch({
          type: "ADD_ARTICLE_ERROR",
          payload: err.response.data,
        });
      });
  };
};

export const listArticle = () => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/users/" + userToken.id + "/blogs", config)
      .then((res) => {
        dispatch({
          type: "LIST_ARTICLE_SUCCESS",
          payload: res.data.articles,
        });
      })
      .catch((err) => {
        dispatch({
          type: "LIST_ARTICLE_ERROR",
          payload: err.response.data,
        });
      });
  };
};

export const deleteBlog = (idBlog) => {
  return (dispatch, getState) => {
    axios
      .delete(baseURL + "/articles/" + idBlog, config)
      .then((res) => {
        console.log("response delete", res.status);
        dispatch({
          type: "DELETE_ARTICLE_SUCCESS",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_ARTICLE_ERROR",
          payload: err.response.data.message,
        });
      });
  };
};

export const updateArticle = (data, idArticle) => {
  return (dispatch, getState) => {
    axios
      .patch(baseURL + "/articles/" + idArticle, data, config)
      .then((res) => {
        console.log("response update success", res);
        dispatch({
          type: "UPDATE_ARTICLE_SUCCESS",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        console.log("response update err", err.response);
        dispatch({
          type: "UPDATE_ARTICLE_ERROR",
          payload: err.response.data,
        });
      });
  };
};

export const resetState = () => {
  console.log("reset state");
  return (dispatch, getState) => {
    dispatch({ type: "RESET_INITIAL_STATE", payload: "" });
  };
};
