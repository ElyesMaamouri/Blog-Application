import axios from "axios";
const baseURL = "http://localhost:4000/api";
const token = localStorage.getItem("userDetails");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const listCategories = () => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/categories")
      .then((res) => {
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
        console.log("ress catg", res);
        dispatch({
          type: "GET_GATEGORY_BY_ID_SUCCESS",
          payload: res.data,
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

// Admin
export const getListCategories = (page) => {
  return (dispatch, getState) => {
    axios
      .get(baseURL + "/list-categories/?page=" + page, config)
      .then((res) => {
        console.log("res cat", res);
        dispatch({
          type: "GET_GATEGORIES_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_GATEGORIES_ERROR",
          payload: err.response.data,
        });
      });
  };
};

// Admin
export const createCategory = (data) => {
  return (dispatch, getState) => {
    axios
      .post(baseURL + "/categories", data, config)
      .then((res) => {
        dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: res.data.message });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_CATEGORY_ERROR",
          payload: err.response.data,
        });
      });
  };
};

export const updateCategory = (category, id) => {
  return (dispatch, getState) => {
    axios
      .put(baseURL + "/categories/" + id, category, config)
      .then((res) => {
        dispatch({
          type: "UPDATE_CATEGORY_SUCCESS",
          payload: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_CATEGORY_ERROR",
          payload: err.response.data,
        });
      });
  };
};
