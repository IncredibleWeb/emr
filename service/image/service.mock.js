import AuthenticatedApiService from "../authenticatedApiService";

const MAX = 100;

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
  }

  post({ data }) {
    return Promise.resolve({
      fileUrl: "/img/Logo.png",
      fileName: "/img/Logo.png"
    });
  }
}
