const initState = {
  categoryInfo: null,
  categoryByIdInfo: null,
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

    case "GET_GATEGORY_BY_ID_SUCCESS":
      return {
        ...state,
        categoryByIdInfo: [action.payload],
      };
    case "GET_GATEGORY_BY_ID_ERROR":
      return {
        ...state,
        categoryByIdInfo: action.categoryInfo,
      };
    default:
      return state;
  }
};

export default categoryReducer;
