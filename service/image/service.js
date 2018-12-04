import AuthenticatedApiService from "../authenticatedApiService";

export default class ImageService extends AuthenticatedApiService {
  getServiceUrl() {
    return `${super.getServiceUrl()}/images`;
  }
}
