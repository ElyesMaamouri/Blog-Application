const initState = {
  categoryInfo: null,
  categoryByIdInfo: null,
  listCategoriesInfo: null,
  createCategoryInfo: null,
  updateCategoryInfo: null,
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
    case "GET_GATEGORIES_SUCCESS":
      return {
        ...state,
        listCategoriesInfo: [action.payload],
      };
    case "GET_GATEGORIES_ERROR":
      return {
        ...state,
        listCategoriesInfo: action.listCategoriesInfo,
      };

    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        createCategoryInfo: action.payload,
      };
    case "ADD_CATEGORY_ERROR":
      return {
        ...state,
        createCategoryInfo: action.payload,
      };
    case "UPDATE_CATEGORY_SUCCESS":
      return {
        ...state,
        updateCategoryInfo: action.payload,
      };
    case "UPDATE_CATEGORY_ERROR":
      return {
        ...state,
        updateCategoryInfo: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
