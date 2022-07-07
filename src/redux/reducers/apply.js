import {
  APPLY_ERROR,
  APPLY_LOADING,
  APPLY_SUCCESS,
  APPLY_CLEAR,
} from "redux/actions/apply";

export default (
  state = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: {},
  },
  action
) => {
  switch (action.type) {
    case APPLY_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: {},
      };
    case APPLY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case APPLY_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: action.error,
      };
    case APPLY_CLEAR:
      return {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: {},
      };
    default:
      return state;
  }
};
