import AssignmentService from "services/assignment.service";
import ChatService from "services/chat.service";
import { switchMode } from "redux/actions/auth";
import TokenService from "services/token.service";
import { io } from "socket.io-client";
import { addNotification } from "redux/actions/auth";

export const INIT_LOADING = "INIT_LOADING";
export const INIT_SUCCESS = "INIT_SUCCESS";
export const INIT_ERROR = "INIT_ERROR";

export const CHAT_LOADING = "CHAT_LOADING";
export const CHAT_SUCCESS = "CHAT_SUCCESS";
export const CHAT_ERROR = "CHAT_ERROR";
export const CHAT_CLEAR = "CHAT_CLEAR";

export const NEW_CHAT = "NEW_CHAT";

let socket;

export const clearChat = () => {
  return {
    type: CHAT_CLEAR
  }
}

export async function initSocket(dispatch, first) {
  try {
    socket = io("http://localhost:3000", {
      autoConnect: false,
      extraHeaders: {
        Authorization: "Bearer " + TokenService.getLocalAccessToken(),
      },
    });
    socket.connect();
    socket.on("connect_error", (err) => {
      destroySocket();
      if (first) {
        console.log("Invoked from within");
        initSocket(dispatch, false)
      } else {
        console.log("This should never happen unless server is down");
      };
    });
    socket.on("connect", (msg) => {
      console.log("Socket Connection Active:", socket.id);
    });
    socket.on("MESSAGE_DELIVERED", (msg) => {
      dispatch({
        type: NEW_CHAT,
        messages: msg.messages,
        assignmentID: msg.assignmentID,
        notification: msg.notification,
      });
      if (msg.notification !== undefined) {
        dispatch(addNotification(msg.notification));
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export async function destroySocket() {
  try {
    if (socket.connected) {
      console.log("Disconnecting", socket.id);
      socket.disconnect();
    }
  } catch (err) {
    console.log(err);
  }
}

export const getAssignmentData = (assignmentID) => async (dispatch) => {
  dispatch({
    type: INIT_LOADING,
  });
  try {
    const result = await AssignmentService.getAssignmentData(assignmentID);
    dispatch(switchMode(result.data.isHelper));
    dispatch({
      type: INIT_SUCCESS,
      applicants: result.data?.applicants,
      fromDataServer: result.data?.fromData,
      assignment: result.data.assignment
    });
  } catch (error) {
    dispatch({
      type: INIT_ERROR,
    });
  }
};

export const getChatData =
  (assignmentID, fromID, offset, userID) => async (dispatch) => {
    dispatch({
      type: CHAT_LOADING,
      moreRequest: offset !== 0,
    });
    try {
      const result = await ChatService.getChatData({
        assignmentID,
        fromID,
        offset,
      });
      
      dispatch({
        type: CHAT_SUCCESS,
        moreRequest: offset !== 0,
        messages: result.data,
        fromID,
        userID
      });
    } catch (error) {
      dispatch({
        type: CHAT_ERROR,
      });
    }
  };

export const sendMessage = (message) => async (dispatch) => {
  socket.emit("SEND_MESSAGE", message);
}