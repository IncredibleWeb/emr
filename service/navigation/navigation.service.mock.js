import AuthenticatedApiService from "../authenticatedApiService";

export default class NavigationMockService extends AuthenticatedApiService {
  get({ id, url, data }) {
    const nav = {
      id: 10001,
      title: "Home Page",
      name: "Home",
      url: "/",
      children: [
        {
          id: 10001,
          title: "Patients",
          name: "Patients",
          url: "/patients/",
          children: [],
          lastEdited: "2018-01-01T12:00:00",
          icon: {
            title: "ic_patients_24px.svg",
            imageUrl: "/img/icons/ic_patients_24px.svg",
            alternateText: "ic_patients_24px.svg",
            width: "",
            height: ""
          }
        },
        {
          id: 10001,
          title: "Reports",
          name: "Reports",
          url: "/reports/",
          children: [],
          lastEdited: "2018-01-01T12:00:00",
          icon: {
            title: "ic_reports_24px.svg",
            imageUrl: "/img/icons/ic_reports_24px.svg",
            alternateText: "ic_reports_24px.svg",
            width: "",
            height: ""
          }
        },
        {
          id: 10002,
          title: "Settings",
          name: "Settings",
          url: "/settings/",
          children: [],
          lastEdited: "2018-01-01T12:00:00",
          icon: {
            title: "ic_settings_24px.svg",
            imageUrl: "/img/icons/ic_settings_24px.svg",
            alternateText: "ic_settings_24px.svg",
            width: "",
            height: ""
          }
        }
      ],
      lastEdited: "2018-01-01T12:00:00",
      icon: {
        title: "home.svg",
        imageUrl: "/img/icons/ic_dashboard_24px.svg",
        alternateText: "home.svg",
        width: "",
        height: ""
      }
    };

    // TODO: add support for breadcrumbs

    return Promise.resolve(nav);
  }
}
