import ChatService from "services/chat.service";
import StudentService from "services/student.service";

export const HELPER_LOADING = "HELPER_LOADING";
export const HELPER_SUCCESS = "HELPER_SUCCESS";
export const HELPER_ERROR = "HELPER_ERROR";

export const ACCEPT_HELPER_LOADING = "ACCEPT_HELPER_LOADING";
export const ACCEPT_HELPER_SUCCESS = "ACCEPT_HELPER_SUCCESS";
export const ACCEPT_HELPER_ERROR = "ACCEPT_HELPER_ERROR";

export const HELPER_CLEAR = "HELPER_CLEAR";

export const SESSION_URL = "SESSION_URL";
export const CLEAR_SESSION_URL = "CLEAR_SESSION_URL";

export const ONBOARD_DATA = "ONBOARD_DATA";

export const becomeHelper = (profile_data) => async (dispatch) => {
    dispatch({
      type: HELPER_LOADING
    })
    try {
      await StudentService.becomeHelper(profile_data);
      dispatch({
        type: HELPER_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: HELPER_ERROR
      });
    }
  }

  export const getOnboardLink = () => async (dispatch) => {
    dispatch({
      type: HELPER_LOADING
    })
    try {
      const data = await StudentService.getOnboardLink();
      dispatch({
        type: ONBOARD_DATA,
        onboardLink: data.data
      });
    } catch (error) {
      console.log("error")
      dispatch({
        type: HELPER_ERROR
      });
    }
  }

  export const updateProfile = (profile_data) => async (dispatch) => {
    dispatch({
      type: HELPER_LOADING
    })
    try {
      await StudentService.updateProfile(profile_data);
      dispatch({
        type: HELPER_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: HELPER_ERROR
      });
    }
  }
  export const acceptHelper = (pendingApplicationID) => async (dispatch) =>{
    dispatch({
      type: ACCEPT_HELPER_LOADING
    })
    try {
      await StudentService.acceptHelper(pendingApplicationID);
      dispatch({
        type: ACCEPT_HELPER_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: ACCEPT_HELPER_ERROR
      });
    }
  }

  export const clearHelper = () => async (dispatch) => {
    dispatch({
      type: HELPER_CLEAR
    })
  }

  export const initiateCheckout = (milestoneID) => async (dispatch) => {
    try {
      const result = await ChatService.initiateCheckout(milestoneID);
      dispatch({
        type: SESSION_URL,
        url: result.data.url
      });
    } catch (error) {
      console.log(error)
    }
  }