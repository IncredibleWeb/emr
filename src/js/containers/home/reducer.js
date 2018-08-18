import { fromJS } from "immutable";

import { HOME_LOADING, SET_HOME, REDUCER_NAME } from "./constants";

const initialState = fromJS({
  formValues: {},
  isLoading: false,
  isError: false,
  home: {}
});

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME:
      return state.set("home", action.data);
    case HOME_LOADING:
      return state.set("isLoading", action.data);
    default:
      return state;
  }
};

export const getHomeState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
