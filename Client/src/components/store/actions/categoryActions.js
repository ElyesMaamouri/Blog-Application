import axios from "axios";

const baseURL = "http://localhost:4000/api";

export const listCategories = () => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/categories")
      .then((res) => {
        console.log("res cat", res);
        dispatch({ type: "GET_CATEGORY_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "GET_CATEGORY_ERROR",
          payload: err.response,
        });
      });
  };
};

export const listCategoryById = (id) => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/categories/" + id)
      .then((res) => {
        console.log("ress cat id", res);
        dispatch({
          type: "GET_GATEGORY_BY_ID_SUCCESS",
          payload: res.data.category,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_GATEGORY_BY_ID_ERROR",
          payload: err.response.data,
        });
      });
  };
};
