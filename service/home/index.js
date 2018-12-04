import MockService from "./service.mock";
import { toHome } from "./adapter";

export default class Home {
  constructor({ service } = {}) {
    // initialize the services and adapters
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get(data).then(response => {
      return toHome(response);
    });
  }
}
