import AuthenticatedApiService from "../authenticatedApiService";

export default class Service extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/pages`;
  }
}
