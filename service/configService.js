import pageData from "./config/pages.json";
import navData from "./config/nav.json";

export const getPageData = ({ path, isMaster = false, isPartial = false }) => {
  return Promise.resolve(
    pageData.find(
      n =>
        n.url === path &&
        (n.isMaster || false) === isMaster &&
        (n.isPartial || false) === isPartial
    )
  );
};

export const getHeaderData = urlPath => {
  return Promise.resolve(navData);
};

export const getRouteData = urlPath => {
  return Promise.resolve(pageData);
};
