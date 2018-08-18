import MockService from "./reports.service.mock";
import { toReportsArray } from "./reports.adapter";

export default class Service {
  constructor({ service }) {
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get(data).then(response => {
      return toReportsArray(response);
    });
  }
}
