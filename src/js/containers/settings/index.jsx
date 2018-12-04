import React from "react";
import { connect } from "react-redux";

import AddToHomeScreen from "../a2hs/a2hs";
import PushNotificationToggle from "../../components/push/push";
import reducerInjector from "../../util/reducerInjector";
import withPage from "../page/withPage";
import { REDUCER_NAME } from "./constants";
import { fetchSettings, setPushEnabled, getSettings } from "./actions";
import { settingsReducer, getSettingsState } from "./reducer";
import withAuth from "../login/withAuth";

class Settings extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { settings, onSetPushEnabled } = this.props;
    return (
      <section>
        <ul className="setting__list">
          {process.env.ALLOW_PUSH_NOTIFICATON && (
            <li className="setting__list__item">
              <PushNotificationToggle
                title="Push Notifications"
                html="Enable push notifications"
                isPushEnabled={settings.isPushEnabled}
                onSetPushEnabled={onSetPushEnabled}
              />
            </li>
          )}
          <li className="setting__list__item">
            <AddToHomeScreen className="setting__list__item__title">
              Add To Homescreen
            </AddToHomeScreen>
          </li>
          <li className="setting__list__item">
            <a
              href={process.env.AUTHOR.URL}
              target="_blank"
              className="setting__list__item__title"
            >
              {`About ${process.env.AUTHOR.NAME}`}
            </a>
          </li>
        </ul>
      </section>
    );
  }

  static fetchData(store, { match }) {
    store.dispatch(fetchSettings({ url: match.url }));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: settingsReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    settings: getSettingsState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onSetPushEnabled: data => dispatch(setPushEnabled(data))
  };
};

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(
      reducerInjector(REDUCER_NAME, settingsReducer)(Settings)
    ),
    getSettings
  )
);
