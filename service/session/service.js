import ApiService from "../apiService";

export default class Service extends ApiService {
  setSession(data) {
    return super.post({
      url: `/setSession`,
      data
    });
  }
}
