import AuthenticatedApiService from "../authenticatedApiService";

export default class RouterService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/routes`;
  }
}
