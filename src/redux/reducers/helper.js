import {
  HELPER_CLEAR,

  HELPER_ERROR,
  HELPER_LOADING,
  HELPER_SUCCESS,

  ACCEPT_HELPER_ERROR,
  ACCEPT_HELPER_LOADING,
  ACCEPT_HELPER_SUCCESS,

  SESSION_URL,
  CLEAR_SESSION_URL,
  ONBOARD_DATA
} from "redux/actions/helper";

export default (
  state = {
    isLoading: false,
    isError: false,
    isSuccess: false,

    acceptLoading: false,
    acceptError: false,
    acceptSuccess: false,
    onboardLink: {},
    url: null
  },
  action
) => {
  switch (action.type) {
    case ONBOARD_DATA:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        onboardLink: action.onboardLink,
      };
    case HELPER_CLEAR:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        acceptLoading: false,
        acceptError: false,
        acceptSuccess: false,
        onboardLink: {},
      };
    case HELPER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        onboardLink: {},
      };
    case HELPER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case HELPER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
      };
      case ACCEPT_HELPER_LOADING:
        return {
          ...state,
          acceptLoading: true,
          acceptError: false,
          acceptSuccess: false,
        };
      case ACCEPT_HELPER_SUCCESS:
        return {
          ...state,
          acceptLoading: false,
          acceptError: false,
          acceptSuccess: true,
        };
      case ACCEPT_HELPER_ERROR:
        return {
          ...state,
          acceptLoading: false,
          acceptError: true,
          acceptSuccess: false,
        };
        case SESSION_URL:
          return {
            ...state,
            url: action.url
          }
          case CLEAR_SESSION_URL:
            return {
              ...state,
              url: null
            }
    default:
      return state;
  }
};
