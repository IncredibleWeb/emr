import {
  REPORTS_LOADING,
  REPORTS_ERROR,
  SET_REPORTS,
  RESET_REPORTS
} from "./constants";
import { fetchPage } from "../page/actions";
import Api from "../../../../service/main";

const isError = data => {
  return {
    type: REPORTS_ERROR,
    data
  };
};

const isLoading = data => {
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

const resetReports = data => {
  return {
    type: RESET_REPORTS
  };
};

const getReports = data => dispatch => {
  dispatch(isLoading(true));
  dispatch(resetReports());

  return Api.reports
    .get(data)
    .then(response => {
      dispatch(setReports(response));
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

export const fetchReports = data => dispatch =>
  Promise.all([fetchPage(data)(dispatch), getReports(data)(dispatch)]);
