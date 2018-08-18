import Service from "./patients.service.mock";
import { toPatientsArray } from "./patients.adapter";

export default class Patients {
  constructor({ service }) {
    this.service = service || new Service();
  }

  get(data) {
    return this.service.get({ data }).then(response => {
      return toPatientsArray(response);
    });
  }
}
