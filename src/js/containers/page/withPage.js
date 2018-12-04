import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { connect } from "react-redux";
import { compose } from "redux";
import { default as pathToRegexp } from "path-to-regexp";

import reducerInjector from "../../util/reducerInjector";
import { getAppState } from "../app/reducer";
import { getPageState, pageReducer } from "./reducer";
import { renderPage, getPage } from "./actions";
import { REDUCER_NAME } from "./constants";

function withPage(WrappedComponent, getData = getPage) {
  class Enhance extends React.PureComponent {
    componentDidMount() {
      const { app, onLoadPage, match } = this.props;

      // test if url changed since the last call of onLoadPage
      if (!pathToRegexp(match.path).test(app.url)) {
        // fatch page data and update app url with match.url
        onLoadPage(getData, { url: match.url });
      }
    }

    componentWillUnmount() {
      const { app, onLoadPage, match, routes, history } = this.props;

      // reload page data after modal close
      let modalRoute = routes.find(item => {
        return match.path === item.url;
      });

      if (modalRoute && modalRoute.modal) {
        onLoadPage(getData, { url: history.location.pathname });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    page: getPageState(state).toJS(),
    app: getAppState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onLoadPage: (get, data) => dispatch(renderPage({ get, data }))
});

export default compose(
  reducerInjector(REDUCER_NAME, pageReducer),
  connect(mapStateToProps, mapDispatchToProps),
  withPage
);
