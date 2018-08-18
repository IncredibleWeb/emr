import { SET_PUSH_ENABLED } from "./constants";
import { getPage, renderPage } from "../page/actions";

const setPushEnabled = data => {
  return {
    type: SET_PUSH_ENABLED,
    data
  };
};

const getSettings = data => dispatch => {
  dispatch(setPushEnabled(false));
  return getPage(data)(dispatch);
};

export const fetchSettings = data => dispatch =>
  renderPage({ get: getSettings, data })(dispatch);
