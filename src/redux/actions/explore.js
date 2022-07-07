import AssignmentService from "services/assignment.service";

export const ASSIGNMENTS_LOADING = "ASSIGNMENTS_LOADING";
export const ASSIGNMENTS_SUCCESS = "ASSIGNMENTS_SUCCESS";
export const ASSIGNMENTS_ERROR = "ASSIGNMENTS_ERROR";

export const AUTO_COMPLETE_LOADING = "AUTO_COMPLETE_LOADING";
export const AUTO_COMPLETE_SUCCESS = "AUTO_COMPLETE_SUCCESS";
export const AUTO_COMPLETE_ERROR = "AUTO_COMPLETE_ERROR";



export const getAssignments = (filters) => async (dispatch) => {
    console.log("Getting Assignments", filters);
    dispatch({
        type: ASSIGNMENTS_LOADING,
        moreRequest: filters.offset !== 0,
        filters: filters
    })
    try {
        const result = await AssignmentService.getAssignments(filters);
        dispatch({
            type: ASSIGNMENTS_SUCCESS,
            moreRequest: filters.offset !== 0,
            assignments: result.data
        })
    } catch (error) {
        // dispatch({
        //     type: ASSIGNMENTS_SUCCESS,
        //     moreRequest: filters.offset !== 0,
        //     assignments: []
        // })
        dispatch({
            type: ASSIGNMENTS_ERROR,
        })
        console.log(error)
    }
  };

  export const clearSuggestions = () => {
    return {
      type: AUTO_COMPLETE_ERROR,
    };
  };


  export const autoComplete = (start) => async (dispatch) => {
    dispatch({
        type: AUTO_COMPLETE_LOADING
    })
    try {
        const result = await AssignmentService.getAutoComplete(start);
        // console.log(result);
        dispatch({
            type: AUTO_COMPLETE_SUCCESS,
            suggestions: result.data
        })
    } catch (error) {
        dispatch({
            type: AUTO_COMPLETE_ERROR
        })
        console.log(error)
    }
  };

