import AuthenticatedApiService from "../authenticatedApiService";

export default class HomeService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/home`;
  }
}