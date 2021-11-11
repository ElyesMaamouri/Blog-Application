import axios from "axios";
const baseURL = "http://localhost:4000/api";
const token = localStorage.getItem("userDetails");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const addCommentToArticle = (data, id) => {
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/articles/" + id + "/comments", data, config)
      .then((res) => {
        console.log("errr", res.data);
        dispatch({ type: "ADD_COMMENT_SUCCESS", payload: res.data.message });
      })
      .catch((err) => {
        dispatch({ type: "ADD_COMMENT_ERROR", payload: err.response });
      });
  };
};

export const getComments = () => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/comments")
      .then((res) => {
        dispatch({ type: "LIST_OF_COMMENTS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "LIST_OF_COMMENTS_ERROR", payload: err.response });
      });
  };
};

export const resetStateComment = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_INITIAL_STATE_COMMENT", payload: "" });
  };
};
