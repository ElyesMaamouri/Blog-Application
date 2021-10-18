import axios from "axios";

const baseURL = "http://localhost:4000/api";

export const listCategories = () => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/categories")
      .then((res) => {
        console.log("errr", res.data);
        dispatch({ type: "GET_CATEGORY_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "GET_CATEGORY_ERROR",
          payload: err.response.data,
        });
      });
  };
};
