import Api from "./main";
import ApiService from "./apiService";
import { TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "./constants";

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
        // request a new token from the API
        return Api.authentication
          .requestToken({
            ttl: process.env.API_TOKEN_DURATION,
            privateKey: process.env.API_PRIVATE_KEY
          })
          .then(response => {
            // add the authorization attribute for the current request
            config.headers["Authorization"] = `Bearer ${response.token}`;

            Api.setToken(response.token);
            Api.setRefreshToken(response.refreshToken);

            return config;
          });
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
          }
        } else {
          console.error("Authentication Error: Server failed to authenticate.");
        }
      } else {
        return Promise.reject(error);
      }
    });
  }
}
