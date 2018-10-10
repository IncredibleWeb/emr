/*
 * Local implementation of routing retrieved from API
 */
import Api from "../service/main";

export const getRoutes = () => {
  // retrieve the navigation from the shared Umbraco SDK
  return Api.router.getRoutingTable().then(response => {
    // iterate route data to create Route components
    const routes = response.urlsAndDocTypes.reduce((array, item) => {
      if (item.value.toLowerCase() === "home") {
        array.push({
          url: item.key,
          name: "Home",
          exact: true
        });
      } else if (item.value.toLowerCase() === "page") {
        array.push({
          url: item.key,
          name: "Page",
          exact: true
        });
      } else if (item.value.toLowerCase() === "patients") {
        array.push({
          url: item.key,
          name: "Patients",
          exact: true
        });
      } else if (item.value.toLowerCase() === "reports") {
        array.push({
          url: item.key,
          name: "Reports",
          exact: true
        });
      } else if (item.value.toLowerCase() === "settings") {
        array.push({
          url: item.key,
          name: "Settings",
          exact: true
        });
      }
      return array;
    }, []);

    return routes;
  });
};
