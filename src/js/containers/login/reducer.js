import { fromJS } from "immutable";

import {
  SET_VALIDATION_MESSAGES,
  RESET_VALIDATION_MESSAGES,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  messages: {},
  formValues: {}
});

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALIDATION_MESSAGES:
      return state
        .set("messages", action.data.messages)
        .set("formValues", action.data.formValues);
    case RESET_VALIDATION_MESSAGES:
      return state.set("messages", initialState.get("messages"));
    default:
      return state;
  }
};

export const getLoginState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
