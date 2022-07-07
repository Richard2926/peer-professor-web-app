import {
  CREATE_AUTO_COMPLETE_LOADING,
  CREATE_AUTO_COMPLETE_ERROR,
  CREATE_AUTO_COMPLETE_SUCCESS,

  CREATE_LOADING,
  CREATE_ERROR,
  CREATE_SUCCESS,
  CREATE_CLEAR,
} from "redux/actions/createAssignment";

export default (
  state = {
    isCreateAutoLoading: false,
    createSuggestions: [],

    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case CREATE_AUTO_COMPLETE_LOADING:
      return {
        ...state,
        isCreateAutoLoading: true,
      };
    case CREATE_AUTO_COMPLETE_ERROR:
      return {
        ...state,
        isCreateAutoLoading: false,
        createSuggestions: [],
      };
    case CREATE_AUTO_COMPLETE_SUCCESS:
      return {
        ...state,
        isCreateAutoLoading: false,
        createSuggestions: action.suggestions,
      };
    case CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case CREATE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
    case CREATE_CLEAR:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    default:
      return state;
  }
};
