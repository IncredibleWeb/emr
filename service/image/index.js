import ImageService from "./image.service";
import { toImage, toImageJson } from "./image.adapter";

export default class Image {
  constructor() {
    this.service = new ImageService();
  }

  post(data) {
    return this.service.post({ data: toImageJson(data) }).then(response => {
      return toImage(response);
    });
  }
}
