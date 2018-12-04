/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "redux-immutable";

// global reducers
import { appReducer } from "../containers/app/reducer";
import { headerReducer } from "../containers/header/reducer";
import { homeReducer } from "../containers/home/reducer";
import { pageNotFoundReducer } from "../containers/pageNotFound/reducer";
import { pageReducer } from "../containers/page/reducer";
import { patientsReducer } from "../containers/patients/reducer";
import { reducer as formReducer } from "redux-form/immutable";
import { routesReducer } from "../containers/routes/reducer";
import { settingsReducer } from "../containers/settings/reducer";

export default function createReducer(injectedReducers) {
  return combineReducers({
    app: appReducer,
    form: formReducer,
    header: headerReducer,
    home: homeReducer,
    pageNotFound: pageNotFoundReducer,
    page: pageReducer,
    patients: patientsReducer,
    routes: routesReducer,
    settings: settingsReducer,
    ...injectedReducers
  });
}
