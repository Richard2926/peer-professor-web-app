import StudentService from "services/student.service";

export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";

export const PROFILE_CLEAR = "PROFILE_CLEAR";
export const REVIEW_ERROR = "REVIEW_ERROR";

export const getProfileData = (username) => async (dispatch) => {
    dispatch({
      type: PROFILE_LOADING
    })
    try {
      const profileData = await StudentService.getProfileData(username);
      dispatch({
        type: PROFILE_SUCCESS,
        profileData: profileData.data
      });
    } catch (error) {
        console.log(error.response);
      dispatch({
        type: PROFILE_ERROR
      });
    }
  }

export const reviewHelper = (data, username) => async (dispatch) => {
  try {
    await StudentService.reviewHelper(data);
    dispatch(getProfileData(username));
  } catch (error) {
    // console.log(error.response.data)
    dispatch({
      type: REVIEW_ERROR,
      error: error?.response?.data?.error
    });
  }
}

export const clear = () => async (dispatch) => {
  dispatch({
    type: PROFILE_CLEAR
  });
}