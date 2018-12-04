import Api from "./main";
import ApiService from "./apiService";
import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  SESSION_USER
} from "./constants";

const authenticationMode = process.env.AUTHENTICATION_MODE;

export default class AuthenticatedApiService extends ApiService {
  constructor() {
    super();

    // distinguish between node & browser
    const hasStorage = typeof sessionStorage !== "undefined";

    // interceptor that appends the authorization header
    this.instance.interceptors.request.use(config => {
      if (hasStorage) {
        // retrieve the token from the storage
        config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
          TOKEN_STORAGE_KEY
        )}`;

        return config;
      } else {
        // if any authentication mode is selected
        if (authenticationMode) {
          config.headers["Authorization"] = `Bearer ${Api.getToken()}`;

          return config;
        }
      }
    });

    // interceptor that will authenticate the user once if a 401 is received
    this.instance.interceptors.response.use(undefined, error => {
      if (error.response.status === 401 && !error.config.__isRetryRequest) {
        if (hasStorage) {
          // add the reponse to sessionStorage
          const refreshToken = sessionStorage.getItem(
            REFRESH_TOKEN_STORAGE_KEY
          );

          if (refreshToken) {
            // unauthorized
            return Api.authentication
              .refreshToken({
                ttl: process.env.API_TOKEN_DURATION,
                refreshToken: refreshToken
              })
              .then(response => {
                let config = error.config;
                config.__isRetryRequest = true;
                config.headers["Authorization"] = `Bearer ${response.token}`;

                // sync with node express-session
                let sessionData = {};
                sessionData[TOKEN_STORAGE_KEY] = response.token;
                sessionData[REFRESH_TOKEN_STORAGE_KEY] = response.refreshToken;

                Api.session.post({
                  sessionKey: SESSION_USER,
                  sessionData
                });

                // update refresh token in local storage
                sessionStorage.setItem(TOKEN_STORAGE_KEY, response.token);
                sessionStorage.setItem(
                  REFRESH_TOKEN_STORAGE_KEY,
                  response.refreshToken
                );

                // resubmit the original request
                return this.instance(config);
              });
          } else {
            console.error(
              "Authentication Error: Please refresh to generate a new token."
            );

            // clear out user session in node express-session
            Api.session.post({
              sessionKey: SESSION_USER,
              sessionData: null
            });

            // clear out session storage
            sessionStorage.setItem(TOKEN_STORAGE_KEY, "");
            sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, "");

            window.location.replace("/login");
          }
        } else {
          console.error("Authentication Error: Server failed to authenticate.");
          // clear out user session in node express-session
          Api.session.post({
            sessionKey: SESSION_USER,
            sessionData: null
          });

          Api.setToken("");
        }
      } else {
        // clear out user session in node express-session
        Api.session.post({
          sessionKey: SESSION_USER,
          sessionData: null
        });

        Api.setToken("");

        if (hasStorage) {
          // clear out session storage
          sessionStorage.setItem(TOKEN_STORAGE_KEY, "");
          sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, "");

          window.location.replace("/login");
        }

        return Promise.reject(error);
      }
    });
  }
}
