import moment from "moment";

import ApiService from "../apiService";
import { getUuid } from "../../src/js/util/util";

const USERNAME = "info@incredible-web.com";
const PASSWORD = "emr";
const PRIVATE_KEY = "emr";

export default class AuthenticationMockService extends ApiService {
  requestToken({ data }) {
    if (
      data.privateKey === PRIVATE_KEY ||
      (data.userName === USERNAME && data.password === PASSWORD)
    ) {
      return Promise.resolve({
        token: getUuid() + getUuid() + getUuid() + getUuid(),
        tokenDurationMinutes: 20,
        expiryDate: moment.utc().add(20, "minutes"),
        isExpired: false,
        refreshToken: getUuid()
      });
    }

    return Promise.reject({
      message: "Incorrect login or password"
    });
  }

  refreshToken({ data }) {
    return Promise.resolve({
      token: getUuid() + getUuid() + getUuid() + getUuid(),
      tokenDurationMinutes: 20,
      expiryDate: moment.utc().add(20, "minutes"),
      isExpired: false,
      refreshToken: getUuid()
    });
  }
}
