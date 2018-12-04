import AuthenticatedApiService from "../authenticatedApiService";

export default class RouterMockService extends AuthenticatedApiService {
  get({ id, url, data }) {
    return Promise.resolve({
      root: "en",
      urlsAndDocTypes: [
        {
          key: "/",
          value: "home"
        },
        {
          key: "/patients/",
          value: "patients"
        },
        {
          key: "/reports/",
          value: "reports"
        },
        {
          key: "/settings/",
          value: "settings"
        }
      ]
    });
  }
}
