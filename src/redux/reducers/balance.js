import {
    BALANCE_ERROR,
    BALANCE_LOADING,
    BALANCE_SUCCESS,
  } from "redux/actions/balance";
  
  export default (
    state = {
      isLoading: true,
      isError: false,
      balanceData: {},
    },
    action
  ) => {
    switch (action.type) {
      case BALANCE_LOADING:
        return {
          ...state,
          isLoading: true,
          isError: false,
          balanceData: {},
        };
      case BALANCE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          balanceData: action.balanceData,
        };
      case BALANCE_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  