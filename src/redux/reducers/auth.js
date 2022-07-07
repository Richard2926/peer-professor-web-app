import {
  VERIFY_FAILURE,
  VERIFY_LOADING,
  VERIFY_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  CLEAR_LOGIN_ERROR,
  EMAIL_STATE,
  LOGIN_STATE,
  REGISTER_STATE,
  FORGOT_STATE,
  VERIFY_STATE,
  ANIMATE_ACCESS,
  ANIMATE_DENIED,
  SWITCH_MODE,
  UPDATE_NOTIFICATIONS,
  ADD_NOTIFICATION
} from "redux/actions/auth";

export default (
  state = {
    isAuthenticated: false,
    isVerifying: false,

    loginState: 0,
    isLoginLoading: false,
    loginError: "",

    animate: false,

    helperMode: false,

    user: {},
    error: {},
  },
  action
) => {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      let new_notifications = state.user.notifications.filter(
        (notification) => notification.id !== action.deleted_notification.id
      );
      return {
        ...state,
        user: {
          ...state.user,
          notifications: new_notifications
        }
      }

    case ADD_NOTIFICATION:
      let nots_new = [...state.user.notifications, action.notification]
      return {
        ...state,
        user: {
          ...state.user,
          notifications: nots_new
        }
      }
    case SWITCH_MODE:
      return {
        ...state,
        helperMode: action.isHelper,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isVerifying: false,
        user: action.user,
        isLoggingIn: false,
      };
    case VERIFY_LOADING:
      return {
        ...state,
        isAuthenticated: false,
        isVerifying: true,
      };
    case VERIFY_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isVerifying: false,
        error: action.error,
        user: {},
      };
    case LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: true,
        loginError: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.error,
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: "",
        isLoginLoading: false,
      };
    case EMAIL_STATE:
      return {
        ...state,
        loginState: 0,
        loginError: "",
        isLoginLoading: false,
      };
    case LOGIN_STATE:
      return {
        ...state,
        loginState: 1,
        loginError: "",
        isLoginLoading: false,
      };
    case REGISTER_STATE:
      return {
        ...state,
        loginState: 2,
        loginError: "",
        isLoginLoading: false,
      };
    case FORGOT_STATE:
      return {
        ...state,
        loginState: 3,
        loginError: "",
        isLoginLoading: false,
      };
    case VERIFY_STATE:
      return {
        ...state,
        loginState: 4,
        loginError: "",
        isLoginLoading: false,
      };
    case ANIMATE_ACCESS:
      return {
        ...state,
        animate: true,
      };
    case ANIMATE_DENIED:
      return {
        ...state,
        animate: false,
      };
    default:
      return state;
  }
};
