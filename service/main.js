/* This class is used to define which modules will be consumed from API
 */
import Router from "./router/";
import Home from "./home/";
import Pages from "./pages/";
import Patients from "./patients/";
import Authentication from "./authentication/";
import Navigation from "./navigation/";
import Image from "./image/";
import Session from "./session/";

class Main {
  constructor() {
    if (!Main.instance) {
      this.router = new Router();
      this.home = new Home();
      this.pages = new Pages();
      this.patients = new Patients({});
      this.authentication = new Authentication();
      this.navigation = new Navigation();
      this.image = new Image();
      this.session = new Session();

      Main.instance = this;
    }

    return Main.instance;
  }

  setToken(value) {
    Main.instance.authentication.setToken(value);
  }

  getToken() {
    return Main.instance.authentication.getToken();
  }
}

const instance = new Main();
Object.freeze(instance);
export default instance;
