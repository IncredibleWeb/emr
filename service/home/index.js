import MockService from "./home.service.mock";
import { toHome } from "./home.adapter";

export default class Status {
  constructor({ service }) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get(data).then(response => {
      return toHome(response);
    });
  }
}
