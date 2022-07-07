import StudentService from "services/student.service";

export const REPORT_LOADING = "REPORT_LOADING";
export const REPORT_SUCCESS = "REPORT_SUCCESS";
export const REPORT_ERROR = "REPORT_ERROR";

export const report = (data) => async (dispatch) => {
  console.log(data)
    dispatch({
      type: REPORT_LOADING
    })
    try {
      await StudentService.report(data);
      dispatch({
        type: REPORT_SUCCESS,
      });
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REPORT_ERROR,
      });
    }
  }