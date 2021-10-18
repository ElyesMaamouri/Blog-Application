import axios from "axios";

const baseURL = "http://localhost:4000/api";

export const addArticle = (data) => {
  const token = localStorage.getItem("userDetails");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/articles", data, config)
      .then((res) => {
        console.log("errr", res.data);
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
