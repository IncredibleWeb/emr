import MockService from "./service.mock";
import { toImage, toImageJson } from "./adapter";

export default class Image {
  constructor({ service } = {}) {
    this.service = service || new MockService();
  }

  post(data) {
    return this.service.post({ data: toImageJson(data) }).then(response => {
      return toImage(response);
    });
  }
}
