import {
  PROFILE_ERROR,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  REVIEW_ERROR,
  PROFILE_CLEAR
} from "redux/actions/profile";

export default (
  state = {
    isLoading: true,
    isError: false,
    profileData: {},

    reviewError: null,
  },
  action
) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        profileData: {},
        reviewError: null,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        profileData: action.profileData,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REVIEW_ERROR:
      return {
        ...state,
        reviewError: action.error,
      };
    case PROFILE_CLEAR:
      return {
        ...state,
        reviewError: null
      }
    default:
      return state;
  }
};
