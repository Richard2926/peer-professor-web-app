import AuthService from "services/auth.service";
import StudentService from "services/student.service";
import { initSocket, destroySocket } from "./chat";

export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";
export const VERIFY_LOADING = "VERIFY_LOADING";

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";

export const EMAIL_STATE = "EMAIL_STATE";
export const LOGIN_STATE = "LOGIN_STATE";
export const REGISTER_STATE = "REGISTER_STATE";
export const FORGOT_STATE = "FORGOT_STATE";
export const VERIFY_STATE = "VERIFY_STATE";

export const ANIMATE_ACCESS = "ANIMATE_ACCESS";
export const ANIMATE_DENIED = "ANIMATE_DENIED";

export const SWITCH_MODE = "SWITCH_MODE";
export const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export const switchMode = (isHelper) => {
  return {
    type: SWITCH_MODE,
    isHelper: isHelper
  };
};

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
  };
};

export const addNotification = (notification) => async(dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    notification: notification
  });
}

export const removeNotification = (notification) => async(dispatch) => {
  try {

    await StudentService.deleteNotification(notification.id, null);

    dispatch({
      type: UPDATE_NOTIFICATIONS,
      deleted_notification: notification
    });

  } catch (err) {
    console.log("Couldn't delete notification on backend");
  }
}
export async function verifyAuth(dispatch) {
  try {
    dispatch({
      type: VERIFY_LOADING,
    });
    await AuthService.getCurrentUser();
    const result = await StudentService.verifyStudentSession();
    console.log("Successfully Authenticated User");
    console.log("Invoked from verifyAuth");
    initSocket(dispatch, true);
    dispatch({
      type: VERIFY_SUCCESS,
      user: result.data,
    });
  } catch (err) {
    console.log("Failed to Authenticate User");
    dispatch({
      type: VERIFY_FAILURE,
      error: err,
    });
  }
}

const moveToLoginState = () => {
  return {
    type: LOGIN_STATE,
  };
};
const moveToRegisterState = () => {
  return {
    type: REGISTER_STATE,
  };
};
const moveToVerifyState = () => {
  return {
    type: VERIFY_STATE,
  };
};
export const moveToEmailState = () => {
  return {
    type: EMAIL_STATE,
  };
};
export const moveToForgotState = () => {
  return {
    type: FORGOT_STATE,
  };
};

export const allowAnimation = () => {
  return {
    type: ANIMATE_ACCESS,
  };
};
export const denyAnimation = async (dispatch) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  dispatch({
    type: ANIMATE_DENIED,
  });
};

export const checkEmail = (email) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await AuthService.checkEmail(email);
    switch (response.status) {
      case 227:
        dispatch(moveToRegisterState());
        break;
      case 228:
        dispatch(moveToVerifyState());
        break;
      case 229:
        dispatch(moveToLoginState());
        break;
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response.data.error,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await AuthService.login(email, password);
    const result = await StudentService.verifyStudentSession();
    console.log("Successfully Logged in User");
    console.log("Invoked from login");
    initSocket(dispatch, true);
    dispatch(allowAnimation());
    dispatch({
      type: VERIFY_SUCCESS,
      user: result.data,
    });
    dispatch(moveToEmailState());
    denyAnimation(dispatch);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response.data.error,
    });
  }
};

export const verifyEmail = (code, email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await AuthService.verifyEmail(code);
    console.log("Successfully Verified User");
    dispatch(login(email, password));
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response.data.error,
    });
  }
};

export const register = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await AuthService.register(email, password);
    console.log("Successfully Registered User");
    dispatch({
      type: VERIFY_STATE,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response.data.error,
    });
  }
};

export const forgot = (email) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await AuthService.recoverEmail(email);
    dispatch(moveToLoginState);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response.data.error,
    });
  }
};

// export const resend = (email) => async dispatch => {
//   dispatch({
//     type: RESEND_LOADING
//   })
//   try {
//     await AuthService.resendEmail(email);
//     dispatch({
//       type: RESEND_SUCCESS
//     })
//     dispatch(clearResendError());
//   } catch (error) {
//     // console.log(error.response);
//     dispatch({
//       type: RESEND_FAILURE,
//       error: error.response.data.error,
//     })
//   }
// }

export const logout = () => async (dispatch) => {
  try {
    await AuthService.logout();
    dispatch(allowAnimation());
    destroySocket();
    dispatch({
      type: VERIFY_FAILURE,
    });
    denyAnimation(dispatch);
  } catch (error) {
    console.log(error);
  }
};

export const testRequest = async () => {
  try {
    const data = await StudentService.getStudentTest();
    console.log(data);
  } catch (err) {
    //Handle Proper Dispatch With Correct Error Code
    console.error(err);
  }
};

export async function test() {
  try {
    const result = await StudentService.verifyStudentSession();
    console.log("Successfully Ran the Test", result);
  } catch (err) {
    console.log("Failed to Test Raised Error");
  }
}
