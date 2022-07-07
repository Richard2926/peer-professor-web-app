import StudentService from "services/student.service";

export const BALANCE_LOADING = "BALANCE_LOADING";
export const BALANCE_SUCCESS = "BALANCE_SUCCESS";
export const BALANCE_ERROR = "BALANCE_ERROR";

export const getBalanceData = () => async (dispatch) => {
  dispatch({
    type: BALANCE_LOADING,
  });
  try {
    const balanceData = await StudentService.getBalanceData();
    console.log(balanceData);
    dispatch({
      type: BALANCE_SUCCESS,
      balanceData: balanceData.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: BALANCE_ERROR,
    });
  }
};
