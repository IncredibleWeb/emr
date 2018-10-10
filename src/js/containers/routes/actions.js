import { SET_ROUTES } from "./constants";
import { getRoutes } from "../../../../server/routes";

const loadRoutes = data => {
  return {
    type: SET_ROUTES,
    data
  };
};

export const fetchRoutes = data => {
  return dispatch => {
    return getRoutes(data)
      .then(response => {
        dispatch(loadRoutes(response));
        return response;
      })
      .catch(() => {
        console.error(error);
        throw error;
      });
  };
};
