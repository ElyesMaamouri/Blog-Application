const initState = {
  articleInfo: null,
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ARTICLE_SUCCESS":
      return {
        ...state,
        articleInfo: action.payload,
      };
    case "ADD_ARTICLE_ERROR":
      return {
        ...state,
        articleInfo: action.articleInfo,
      };
    default:
      return state;
  }
};

export default articleReducer;
