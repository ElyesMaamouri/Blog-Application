const initState = {
  commentInfo: null,
  listCommentsInfo: null,
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        commentInfo: action.payload,
      };
    case "ADD_COMMENT_ERROR":
      return {
        ...state,
        commentInfo: action.commentInfo,
      };

    case "LIST_OF_COMMENTS_SUCCESS":
      return {
        ...state,
        listCommentsInfo: action.payload,
      };
    case "LIST_OF_COMMENTS_ERROR":
      return {
        ...state,
        listCommentsInfo: action.commentInfo,
      };

    case "RESET_INITIAL_STATE_COMMENT":
      return {
        ...state,
        commentInfo: action.payload,
      };
    default:
      return state;
  }
};
export default commentReducer;
