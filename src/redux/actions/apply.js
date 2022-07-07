import StudentService from "services/student.service";

export const APPLY_LOADING = "APPLY_LOADING";
export const APPLY_SUCCESS = "APPLY_SUCCESS";
export const APPLY_ERROR = "APPLY_ERROR";
export const APPLY_CLEAR = "APPLY_CLEAR";

export const clearApply = () => {
  return {
    type: APPLY_CLEAR,
  };
}

export const applyAssignment = (assignmentID) => async (dispatch) =>{
  dispatch({
    type: APPLY_LOADING
  })
  try {
    await StudentService.applyAssignment(assignmentID);
    dispatch({
      type: APPLY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: APPLY_ERROR,
      error: error.response
    });
  }
}