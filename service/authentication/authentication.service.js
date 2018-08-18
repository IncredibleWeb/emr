import ApiService from "../apiService";

export default class AuthenticationService extends ApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/Authentication`;
  }

  requestToken({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/RequestDashboardToken`,
      data
    });
  }

  refreshToken({ data }) {
    return super.post({
      url: `${this.getServiceUrl()}/RefreshDashboardToken`,
      data
    });
  }
}
