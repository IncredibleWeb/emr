/* This class is used to define which modules will be consumed from API
 */
import Router from "./router/";
//import RouterService from "./router/router.service";
import Navigation from "./navigation/";
//import NavigationService from "./navigation/navigation.service";
import Home from "./home/";
//import HomeService from "./home/home.service";
import Pages from "./pages/";
//import PagesService from "./pages/pages.service";
import Authentication from "./authentication/";
// import AuthenticationService from "./authentication.service";
import Patients from "./patients/";
//import PatientsService from "./patients/patients.service";
import Reports from "./reports/";
//import ReportsService from "./reports/reports.service";

class Main {
  constructor() {
    if (!Main.instance) {
      this.router = new Router({});
      this.navigation = new Navigation({});
      this.home = new Home({});
      this.pages = new Pages({});
      this.authentication = new Authentication({});
      this.patients = new Patients({});
      this.reports = new Reports({});

      Main.instance = this;

      // static variables
      this.refreshToken = null;
      this.token = null;
    }

    return Main.instance;
  }

  setToken(value) {
    Main.instance.authentication.setToken(value);
  }

  setRefreshToken(value) {
    Main.instance.authentication.setRefreshToken(value);
  }

  getToken() {
    return Main.instance.authentication.getToken();
  }

  getRefreshToken(value) {
    return Main.instance.authentication.getRefreshToken();
  }
}

const instance = new Main();
Object.freeze(instance);
export default instance;
