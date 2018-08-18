import { REPORTS_LOADING, REPORTS_ERROR, SET_REPORTS } from "./constants";
import Api from "../../../../service/main";

export const isError = data => {
  return {
    type: REPORTS_ERROR,
    data
  };
};

export const isLoading = data => {
  return {
    type: REPORTS_LOADING,
    data
  };
};

const setReports = data => {
  return {
    type: SET_REPORTS,
    data
  };
};

export const fetchReports = data => {
  return dispatch => {
    dispatch(isLoading(true));
    return Api.reports
      .get(data)
      .then(response => {
        dispatch(setReports(response));
        return response;
      })
      .then(response => {
        dispatch(isLoading(false));
        return response;
      })
      .catch(error => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        console.error(error);
        throw error;
      });
  };
};
