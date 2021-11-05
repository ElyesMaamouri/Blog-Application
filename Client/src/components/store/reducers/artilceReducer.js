const initState = {
  articleInfo: null,
  listArticleInfo: null,
  deleteArticleInfo: null,
  updateArticleInfo: null,
  listArticlePerPage: null,
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
      return {
        ...state,
        deleteArticleInfo: action.payload,
      };
    case "DELETE_ARTICLE_ERROR":
      return {
        ...state,
        deleteArticleInfo: action.deleteArticleInfo,
      };
    case "UPDATE_ARTICLE_SUCCESS":
      return {
        ...state,
        updateArticleInfo: action.payload,
      };
    case "UPDATE_ARTICLE_ERROR":
      return {
        ...state,
        updateArticleInfo: action.updateArticleInfo,
      };
    case "GET_ARTICLE_SUCCESS":
      return {
        ...state,
        listArticlePerPage: action.payload,
      };
    case "GET_ARTICLE_ERROR":
      return {
        ...state,
        listArticlePerPage: action.listArticlePerPage,
      };
    case "RESET_INITIAL_STATE":
      return {
        ...state,
        updateArticleInfo: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
