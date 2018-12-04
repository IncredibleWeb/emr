import MockService from "./service.mock";
import { toNavigation, toSitemap } from "./adapter";

export default class Navigation {
  constructor({ service } = {}) {
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get({ data }).then(response => {
      return toNavigation(response);
    });
  }
}
