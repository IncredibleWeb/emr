import { fromJS } from "immutable";

import {
  PATIENTS_LOADING,
  PATIENTS_ERROR,
  SET_PATIENTS,
  RESET_PATIENTS,
  SET_PATIENT,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  patients: fromJS([]),
  isLoading: false,
  isError: false
});

export const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATIENTS_LOADING:
      return state.set("isLoading", action.data);
    case PATIENTS_ERROR:
      return state.set("isError", action.data);
    case SET_PATIENTS:
      return state.set("patients", fromJS(action.data));
    case RESET_PATIENTS:
      return state.set("patients", initialState.get("patients"));
    case SET_PATIENT:
      return state.set(
        "patients",
        fromJS(
          state
            .get("patients")
            .toJS()
            .map(item => {
              item.isSelected = action.data.id === item.id;
              return item;
            })
        )
      );
    default:
      return state;
  }
};

export const getPatientsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
