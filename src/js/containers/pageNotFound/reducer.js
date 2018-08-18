import { fromJS } from "immutable";

import { SET_PAGE_NOT_FOUND, REDUCER_NAME } from "./constants";

const initialState = fromJS({
  title: "",
  html: ""
});

export const pageNotFoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_NOT_FOUND:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);
    default:
      return state;
  }
};

export const getPageNotFoundState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
