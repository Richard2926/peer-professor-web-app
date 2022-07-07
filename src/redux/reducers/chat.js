import {
  INIT_LOADING,
  INIT_ERROR,
  INIT_SUCCESS,

  CHAT_ERROR,
  CHAT_LOADING,
  CHAT_SUCCESS,
  NEW_CHAT,
  CHAT_CLEAR
} from "redux/actions/chat";
import { useDispatch } from "react-redux";
import { addNotification, removeNotification } from "redux/actions/auth";

export default (
  state = {
    initLoading: true,
    initError: false,
    assignment: {},
    applicants: [],
    fromID: null,
    userID: null,
    fromDataServer: {},
    chatLoading: false,
    chatLoadingMore: false,
    chatError: false,
    more: true,

    messages: [],
  },
  action
) => {
  switch (action.type) {
    case INIT_LOADING:
      return {
        ...state,
        initLoading: true,
      };
    case INIT_ERROR:
      return {
        ...state,
        initLoading: false,
        initError: true,
      };
    case INIT_SUCCESS:
      return {
        ...state,
        initLoading: false,
        initError: false,
        assignment: action.assignment,
        applicants: action.applicants,
        fromDataServer: action.fromDataServer
      };
      case CHAT_CLEAR:
        return {
          ...state,
          fromID: null,
          userID: null,
          chatLoading: false,
          chatLoadingMore: false,
          chatError: false,
          more: true,
          fromDataServer: {},
          messages: [],
        };
    case CHAT_LOADING:
      return {
        ...state,
        chatLoading: !action.moreRequest,
        chatLoadingMore: action.moreRequest,
        chatInitial: false,
      };
    case CHAT_ERROR:
      return {
        ...state,
        chatLoading: false,
        chatLoadingMore: false,
        more: false,
        chatError: true,
      };
    case CHAT_SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chatLoadingMore: false,
        chatError: false,
        messages: action.moreRequest
          ? [...state.messages, ...action.messages]
          : action.messages,
        more: action.messages.length === 10, //limit
        fromID: action.fromID,
        userID: action.userID,
      };
    case NEW_CHAT:
      const ids = [
        action.messages[0].sender_id,
        action.messages[0].recipient_id,
      ];
      let isCurrent =
        ids.includes(state.fromID) &&
        ids.includes(state.userID) &&
        action.assignmentID === state.assignment.assignmentID;

      return {
        ...state,
        messages: isCurrent
            ? [...state.messages, ...action.messages]
            : state.messages,
      };
    default:
      return state;
  }
};
