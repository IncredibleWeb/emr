import MockAuthenticationService from "./authentication.service.mock";
import {
  toTokenRequestJson,
  toRefreshTokenRequestJson,
  toAuthentication
} from "./authentication.adapter";

export default class Authentication {
  constructor({ service } = {}) {
    this.service = service || new MockAuthenticationService();
    this.token = null;
  }

  requestToken(data) {
    return this.service
      .requestToken({ data: toTokenRequestJson(data) })
      .then(response => toAuthentication(response));
  }

  refreshToken(data) {
    return this.service
      .refreshToken({ data: toRefreshTokenRequestJson(data) })
      .then(response => toAuthentication(response));
  }

  setToken(value) {
    this.token = value;
  }

  getToken() {
    return this.token;
  }
}
