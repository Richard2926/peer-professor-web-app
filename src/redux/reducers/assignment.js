import {
    USER_ASSIGNMENTS_LOADING,
    USER_ASSIGNMENTS_ERROR,
    USER_ASSIGNMENTS_SUCCESS,
    CLEAR_USER_ASSIGNMENTS_ERROR
  } from "redux/actions/assignment";
  
  export default (
    state = {
      isLoading: false,
      isError: false,
      assignments: [],
    },
    action
  ) => {
    switch (action.type) {
      case CLEAR_USER_ASSIGNMENTS_ERROR:
        return {
          ...state,
          isLoading: true,
          isError: false,
          assignments: []

        }
      case USER_ASSIGNMENTS_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case USER_ASSIGNMENTS_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case USER_ASSIGNMENTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          assignments: action.assignments
        };
      default:
        return state;
    }
  };
  