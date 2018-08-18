import moment from "moment";

import ApiService from "../apiService";
import { getUuid } from "../../src/js/util/util";

export default class AuthenticationMockService extends ApiService {
  requestToken({ data }) {
    return Promise.resolve({
      token: getUuid() + getUuid() + getUuid() + getUuid(),
      tokenDurationMinutes: 20,
      expiryDate: moment.utc().add(20, "minutes"),
      isExpired: false,
      refreshToken: getUuid()
    });
  }

  refreshToken({ data }) {
    return Promise.resolve({
      tokenDurationMinutes: 20,
      refreshToken: getUuid()
    });
  }
}
