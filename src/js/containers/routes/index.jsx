import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter, matchPath } from "react-router-dom";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { routesReducer } from "./reducer";
import { fetchRoutes, setPreviousLocation } from "./actions";
import AppAbstract from "../app/abstract";
import Home from "../home/";
import Layout from "../layout/";
import Page from "../page/";
import Patients from "../patients/";
import PageNotFound from "../pageNotFound/";
import Settings from "../settings/";
import { ErrorBoundary } from "../errorBoundary";

class RoutesWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;
  }

  componentDidUpdate(nextProps) {
    let { location, onSetPreviousLocation } = this.props;

    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
      onSetPreviousLocation(location);
    }
  }

  render() {
    let { routes, params, location } = this.props;
    let isModal = false;

    let layoutRoutes = routes.filter(item => !item.modal);
    let modalRoutes = routes.filter(item => item.modal);

    if (location) {
      let modalRoute = routes.find(item => {
        return matchPath(location.pathname, {
          path: item.url,
          exact: true
        });
      });

      if (modalRoute) {
        isModal = modalRoute.modal;
      }
    }

    return (
      <Switch>
        <Route
          path="/settings"
          render={props => (
            <Layout>
              <ErrorBoundary>
                <Settings {...props} routes={routes} />
              </ErrorBoundary>
            </Layout>
          )}
        />
        <Route>
          <Layout showBreadcrumbs={true}>
            <Route component={AppAbstract} />
            <Switch location={isModal ? this.previousLocation : location}>
              {layoutRoutes.map(route => {
                const Component = getRouteComponent(route.name).component;
                return (
                  <Route
                    key={route.url}
                    path={route.url}
                    render={props => (
                      <ErrorBoundary>
                        <Component {...props} {...params} routes={routes} />
                      </ErrorBoundary>
                    )}
                    exact={route.exact}
                  />
                );
              })}
              {!isModal && (
                <Route
                  render={props => (
                    <ErrorBoundary>
                      <PageNotFound {...props} />{" "}
                    </ErrorBoundary>
                  )}
                />
              )}
            </Switch>
            {isModal
              ? modalRoutes.map(route => {
                  const Component = getRouteComponent(route.name).component;
                  return (
                    <Route
                      key={route.url}
                      path={route.url}
                      render={props => (
                        <ErrorBoundary>
                          <Component {...props} {...params} routes={routes} />{" "}
                        </ErrorBoundary>
                      )}
                      exact={route.exact}
                    />
                  );
                })
              : null}
          </Layout>
        </Route>
      </Switch>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {};
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onSetPreviousLocation: data => dispatch(setPreviousLocation(data))
});

export const Routes = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reducerInjector(REDUCER_NAME, routesReducer)(RoutesWrapper)
  )
);

export const getRoutes = store => {
  return store.dispatch(fetchRoutes());
};

export const getRouteComponent = name => {
  switch (name) {
    case "AppAbstract":
      return {
        component: AppAbstract,
        getReducers: [],
        fetchData: [AppAbstract.fetchData]
      };
    case "Home":
      return {
        component: Home,
        getReducers: [Home.getReducer],
        fetchData: [Home.fetchData]
      };
    case "Page":
      return {
        component: Page,
        getReducers: [Page.getReducer],
        fetchData: [Page.fetchData]
      };
    case "Patients":
      return {
        component: Patients,
        getReducers: [Patients.getReducer],
        fetchData: [Patients.fetchData]
      };
    case "Reports":
      return {
        component: Page,
        getReducers: [Page.getReducer],
        fetchData: [Page.fetchData]
      };
    case "PageNotFound":
      return {
        component: PageNotFound,
        getReducers: [PageNotFound.getReducer],
        fetchData: [PageNotFound.fetchData]
      };
    case "Settings":
      return {
        component: Settings,
        getReducers: [Settings.getReducer],
        fetchData: [Settings.fetchData],
        showBreadcrumbs: true
      };
    default:
      return undefined;
  }
};
