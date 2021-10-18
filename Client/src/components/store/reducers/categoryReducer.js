const initState = {
  categoryInfo: null,
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_SUCCESS":
      return {
        ...state,
        categoryInfo: action.payload,
      };
    case "GET_CATEGORY_ERROR":
      return {
        ...state,
        categoryInfo: action.categoryInfo,
      };
    default:
      return state;
  }
};

export default categoryReducer;
