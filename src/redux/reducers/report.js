import {
    REPORT_ERROR,
    REPORT_LOADING,
    REPORT_SUCCESS,
  } from "redux/actions/report";
  
  export default (
    state = {
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    action
  ) => {
    switch (action.type) {
      case REPORT_LOADING:
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
        };
      case REPORT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          isSuccess: true,
        };
      case REPORT_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          isSuccess: false,
        };
      default:
        return state;
    }
  };
  