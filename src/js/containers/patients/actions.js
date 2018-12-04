import {
  PATIENTS_LOADING,
  PATIENTS_ERROR,
  SET_PATIENTS,
  RESET_PATIENTS,
  SET_PATIENT
} from "./constants";
import { getPage, fetchPage } from "../page/actions";
import Api from "../../../../service/main";

const isError = data => {
  return {
    type: PATIENTS_ERROR,
    data
  };
};

const isLoading = data => {
  return {
    type: PATIENTS_LOADING,
    data
  };
};

const setPatients = data => {
  return {
    type: SET_PATIENTS,
    data
  };
};

const resetPatients = data => {
  return {
    type: RESET_PATIENTS
  };
};

const setPatient = data => {
  return {
    type: SET_PATIENT,
    data
  };
};

export const getPatients = data => dispatch => {
  dispatch(isLoading(true));
  dispatch(resetPatients());

  return Api.patients
    .get(data)
    .then(response => {
      dispatch(setPatients(response));
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

export const fetchPatients = data => dispatch =>
  Promise.all([fetchPage(data)(dispatch), getPatients(data)(dispatch)]);
