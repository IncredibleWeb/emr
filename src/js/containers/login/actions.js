import {
  SET_VALIDATION_MESSAGES,
  RESET_VALIDATION_MESSAGES
} from "./constants";
import { fetchPage } from "../page/actions";
import Api from "../../../../service/main";
import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
  SESSION_USER
} from "../../../../service/constants";

export const setValidationMessages = data => dispatch =>
  dispatch({
    type: SET_VALIDATION_MESSAGES,
    data
  });

export const resetValidationMessages = data => ({
  type: RESET_VALIDATION_MESSAGES
});

export const getUserSession = () => dispatch => {
  let hasStorage = typeof sessionStorage !== "undefined";
  if (hasStorage) {
    let sessionData = {};
    sessionData[TOKEN_STORAGE_KEY] = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    sessionData[REFRESH_TOKEN_STORAGE_KEY] = sessionStorage.getItem(
      REFRESH_TOKEN_STORAGE_KEY
    );
    sessionData[USER_ID_STORAGE_KEY] = sessionStorage.getItem(
      USER_ID_STORAGE_KEY
    );

    return sessionData;
  } else {
    return null;
  }
};

export const login = data => dispatch =>
  Api.authentication
    .requestToken(data)
    .then(response => {
      // sync with node express-session
      let sessionData = {};
      sessionData[TOKEN_STORAGE_KEY] = response.token;
      sessionData[REFRESH_TOKEN_STORAGE_KEY] = response.refreshToken;
      sessionData[USER_ID_STORAGE_KEY] = response.id;

      Api.session.post({
        sessionKey: SESSION_USER,
        sessionData,
        rememberSession: data.rememberMe
      });

      // set tokens in session storage
      sessionStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken);
      sessionStorage.setItem(USER_ID_STORAGE_KEY, response.id);

      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
