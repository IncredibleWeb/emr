import { fromJS } from "immutable";

import {
  REPORTS_LOADING,
  REPORTS_ERROR,
  SET_REPORTS,
  SET_BALANCE,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  reports: [],
  isLoading: false
});

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORTS_LOADING:
      return state.set("isLoading", action.data);
    case SET_REPORTS:
      return state.set("reports", fromJS(action.data));
    default:
      return state;
  }
};

export const getReportsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
