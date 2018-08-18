import {
  PATIENTS_LOADING,
  PATIENTS_ERROR,
  SET_PATIENTS,
  RESET_PATIENTS,
  SET_PATIENT
} from "./constants";
import Api from "../../../../service/main";

export const isError = data => {
  return {
    type: PATIENTS_ERROR,
    data
  };
};

export const isLoading = data => {
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

export const fetchPatients = data => {
  return dispatch => {
    dispatch(isLoading(true));
    dispatch(resetPatients());
    return Api.patients
      .get(data)
      .then(response => {
        dispatch(setPatients(response));
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

const setPatient = data => {
  return {
    type: SET_PATIENT,
    data
  };
};
