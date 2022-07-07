import {
  ASSIGNMENTS_LOADING,
  ASSIGNMENTS_ERROR,
  ASSIGNMENTS_SUCCESS,
  
  AUTO_COMPLETE_LOADING,
  AUTO_COMPLETE_ERROR,
  AUTO_COMPLETE_SUCCESS,
} from "redux/actions/explore";

export default (
  state = {
    isLoading: false,
    assignments: [],
    isError: false,
    filters: {
      fullCourseNames: [],
      departmentNames: [],
      sortType: "LOW_TO_HIGH_PRICE",
    },

    isAutoLoading: false,
    suggestions: [],

    isLoadingMore: false,
    more: true,
  },
  action
) => {
  switch (action.type) {
    case ASSIGNMENTS_LOADING:
      return {
        ...state,
        isLoading: !action.moreRequest,
        isLoadingMore: action.moreRequest,
        isInitial: false,
        filters: action.filters,
      };
    case ASSIGNMENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        more: false,
        isError: true,
      };
    case ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        isError: false,
        assignments: action.moreRequest ? [...state.assignments, ...action.assignments] : action.assignments,
        more: action.assignments.length === 10, //limit
      };

    case AUTO_COMPLETE_LOADING:
      return {
        ...state,
        isAutoLoading: true
      };
    case AUTO_COMPLETE_ERROR:
      return {
        ...state,
        isAutoLoading: false,
        suggestions: []
      };
    case AUTO_COMPLETE_SUCCESS:
      return {
        ...state,
        isAutoLoading: false,
        suggestions: action.suggestions
      };
    default:
      return state;
  }
};
