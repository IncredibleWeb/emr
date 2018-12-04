import MockService from "./service.mock";
import { toPatientsArray } from "./adapter";

export default class Patients {
  constructor({ service } = {}) {
    this.service = service || new MockService();
  }

  get(data) {
    return this.service.get({ data }).then(response => {
      return toPatientsArray(response);
    });
  }
}
