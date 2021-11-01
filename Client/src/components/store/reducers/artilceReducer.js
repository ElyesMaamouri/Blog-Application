const initState = {
  articleInfo: null,
  listArticleInfo: null,
  deleteArticleInfo: null,
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
    case "LIST_ARTICLE_SUCCESS":
      return {
        ...state,
        listArticleInfo: action.payload,
      };
    case "LIST_ARTICLE_ERROR":
      return {
        ...state,
        listArticleInfo: action.listArticleInfo,
      };
    case "DELETE_ARTICLE_SUCCESS":
      console.log("reducer", action.payload);
      return {
        ...state,
        deleteArticleInfo: action.payload,
      };
    case "DELETE_ARTICLE_ERROR":
      return {
        ...state,
        deleteArticleInfo: action.deleteArticleInfo,
      };
    default:
      return state;
  }
};

export default articleReducer;
