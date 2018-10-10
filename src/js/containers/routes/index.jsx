import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { getRoutesState } from "./reducer";
import { fetchRoutes } from "./actions";
import AppAbstract from "../app/abstract";
import Home from "../home/";
import Layout from "../layout/";
import Page from "../page/";
import PageNotFound from "../pageNotFound/";
import Settings from "../settings/";
import Patients from "../patients/";
import Reports from "../reports/";

export const Routes = ({ routes, ...params }) => {
  return (
    <Switch>
      <Route
        path="/settings"
        render={props => (
          <Layout>
            <Settings {...props} />
          </Layout>
        )}
      />
      <Route>
        <Layout showBreadcrumbs={true}>
          <Route component={AppAbstract} />
          <Switch>
            {routes.map(route => {
              if (!route.isMaster && !route.isPartial) {
                const Component = getRouteComponent(route.name).component;
                return (
                  <Route
                    key={route.url}
                    path={route.url}
                    render={props => <Component {...props} {...params} />}
                    exact={route.exact}
                  />
                );
              }
            })}
            <Route render={props => <PageNotFound {...props} />} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
};

export const PartialRoutes = ({ routes, ...params }) => {
  return routes.map(route => {
    if (route.isPartial) {
      const Component = getRouteComponent(route.name).component;
      return (
        <Route
          key={route.url}
          path={route.url}
          render={props => <Component {...props} {...params} />}
          exact={route.exact}
        />
      );
    }
  });
};

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
    case "PageNotFound":
      return {
        component: PageNotFound,
        getReducers: [PageNotFound.getReducer],
        fetchData: [PageNotFound.fetchData]
      };
    case "Settings":
      return {
        component: Settings,
        getReducers: [Page.getReducer, Settings.getReducer],
        fetchData: [Page.fetchData, Settings.fetchData],
        showBreadcrumbs: true
      };
    case "Patients":
      return {
        component: Patients,
        getReducers: [Patients.getReducer],
        fetchData: [Patients.fetchData]
      };
    case "Reports":
      return {
        component: Reports,
        getReducers: [Reports.getReducer],
        fetchData: [Reports.fetchData]
      };
    default:
      return undefined;
  }
};
