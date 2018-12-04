import SessionService from "./service";

export default class Service {
  constructor() {
    this.service = new SessionService();
  }

  post(data) {
    return this.service.setSession(data).catch(error => {
      console.log(error);
      throw error;
    });
  }
}
