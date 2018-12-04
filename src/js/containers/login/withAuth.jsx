import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { push } from "react-router-redux";
import hoistNonReactStatic from "hoist-non-react-statics";
import { matchPath } from "react-router-dom";

import { loginReducer, getLoginState } from "./reducer";
import { REDUCER_NAME } from "./constants";
import reducerInjector from "../../util/reducerInjector";

import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from "../../../../service/constants";

function withAuth(ComposedComponent) {
  class Authenticate extends React.PureComponent {
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentWillReceiveProps() {
      this._checkAndRedirect();
    }

    hasStorage() {
      return typeof sessionStorage !== "undefined";
    }

    hasToken() {
      if (this.hasStorage()) {
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
        const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);

        if (refreshToken && token) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    getRoute() {
      return this.props.routes.find(item => {
        return matchPath(this.props.match.url, {
          path: item.url,
          exact: true
        });
      });
    }

    _checkAndRedirect() {
      const { history } = this.props;
      // Server side redirect will be handled by the server always
      if (this.hasStorage()) {
        if (!this.hasToken() && !this.getRoute().isPublic) {
          history.push("/login");
        }
      }
    }

    render() {
      return this.getRoute().isPublic || !this.hasStorage() ? (
        <ComposedComponent {...this.props} />
      ) : this.hasToken() ? (
        <ComposedComponent {...this.props} />
      ) : null;
    }
  }

  hoistNonReactStatic(Authenticate, ComposedComponent);
  return Authenticate;
}

const mapStateToProps = state => {
  return {
    ...getLoginState(state).toJS()
  };
};

const mapDispatchToProps = dispatch => ({});

export default compose(
  reducerInjector(REDUCER_NAME, loginReducer),
  connect(mapStateToProps, mapDispatchToProps),
  withAuth
);
