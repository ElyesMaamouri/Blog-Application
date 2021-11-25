const initState = {
  listClientInfo: null,
  removeClientInfo: null,
  updateClientInfo: null,
};

const clientReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CLIENTS_SUCCESS":
      return {
        ...state,
        listClientInfo: action.payload,
      };
    case "GET_CLIENTS_ERROR":
      return {
        ...state,
        listClientInfo: action.payload,
      };

    case "DELETE_CLIENT_SUCCESS":
      return {
        ...state,
        removeClientInfo: action.payload,
      };
    case "DELETE_CLIENT_SUCCESS":
      return {
        ...state,
        removeClientInfo: action.payload,
      };

    case "UPDATE_CLIENT_SUCCESS":
      return {
        ...state,
        updateClientInfo: action.payload,
      };
    case "UPDATE_CLIENT_SUCCESS":
      return {
        ...state,
        updateClientInfo: action.payload,
      };
    case "RESET_INITIAL_STATE_REMOVE_CLIENT":
      return {
        ...state,
        removeClientInfo: action.payload,
      };

    default:
      return state;
  }
};

export default clientReducer;
