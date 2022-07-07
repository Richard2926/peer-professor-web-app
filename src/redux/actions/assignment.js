import AssignmentService from "services/assignment.service";

export const USER_ASSIGNMENTS_LOADING = "USER_ASSIGNMENTS_LOADING";
export const USER_ASSIGNMENTS_SUCCESS = "USER_ASSIGNMENTS_SUCCESS";
export const USER_ASSIGNMENTS_ERROR = "USER_ASSIGNMENTS_ERROR";

export const CLEAR_USER_ASSIGNMENTS_ERROR = "CLEAR_USER_ASSIGNMENTS_ERROR";

export const clearAssignmentsError = () => {
  return {
    type: CLEAR_USER_ASSIGNMENTS_ERROR
  };
};

export const getUserAssignments = () => async (dispatch) =>{
    dispatch({
      type: USER_ASSIGNMENTS_LOADING
    })
    try {
      const result = await AssignmentService.getUserAssignments();
      dispatch({
        type: USER_ASSIGNMENTS_SUCCESS,
        assignments: result.data
      });
    } catch (error) {
      dispatch({
        type: USER_ASSIGNMENTS_ERROR
      });
    }
  }

  export const getHelperAssignments = () => async (dispatch) =>{
    dispatch({
      type: USER_ASSIGNMENTS_LOADING
    })
    try {
      const result = await AssignmentService.getHelperAssignments();
      dispatch({
        type: USER_ASSIGNMENTS_SUCCESS,
        assignments: result.data
      });
    } catch (error) {
      dispatch({
        type: USER_ASSIGNMENTS_ERROR
      });
    }
  }

  