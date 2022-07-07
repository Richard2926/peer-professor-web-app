import AssignmentService from "services/assignment.service";

export const CREATE_AUTO_COMPLETE_LOADING = "CREATE_AUTO_COMPLETE_LOADING";
export const CREATE_AUTO_COMPLETE_SUCCESS = "CREATE_AUTO_COMPLETE_SUCCESS";
export const CREATE_AUTO_COMPLETE_ERROR = "CREATE_AUTO_COMPLETE_ERROR";

export const CREATE_LOADING = "CREATE_LOADING";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_ERROR = "CREATE_ERROR";
export const CREATE_CLEAR = "CREATE_CLEAR";


export const clearCreateSuggestions = () => {
  return {
    type: CREATE_AUTO_COMPLETE_ERROR,
  };
};

export const clearCreate = () => {
  return {
    type: CREATE_CLEAR,
  };
}

export const getCourses = (start) => async (dispatch) => {
  // if (start.trim().split(" ").length !== 2) {
  //   return dispatch({
  //     type: CREATE_AUTO_COMPLETE_SUCCESS,
  //     suggestions: [],
  //   });
  // }
  dispatch({
    type: CREATE_AUTO_COMPLETE_LOADING,
  });
  try {
    const result = await AssignmentService.getCourses(start);
    console.log(result);
    dispatch({
      type: CREATE_AUTO_COMPLETE_SUCCESS,
      suggestions: result.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_AUTO_COMPLETE_ERROR,
    });
    console.log(error);
  }
};

export const createAssignment = (data) => async (dispatch) =>{
  dispatch({
    type: CREATE_LOADING
  })
  try {
    console.log(data);
    await AssignmentService.createAssignment(data);
    dispatch({
      type: CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ERROR,
    });
    console.log(error);
  }
}