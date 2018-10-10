/*
 * Root component on the server-side
 */
import React from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import Api from "../service/main";
import { injectReducer } from "../src/js/util/store";
import {
  Routes,
  getRoutes,
  getRouteComponent
} from "../src/js/containers/routes/index";
import { configureStore } from "../src/js/util/store";
import { defaultPathConfig } from "./helpers/pathConfig";
import Header from "../src/js/containers/header/index";
import PageNotFound from "../src/js/containers/pageNotFound/index";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "../src/js/containers/snackbar/constants";

const requireAuthentication = process.env.REQUIRE_AUTHENTICATION;

export function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore();
  const { path, url, query } = req;

  if (requireAuthentication) {
    Api.authentication
      .requestToken({
        ttl: process.env.API_TOKEN_DURATION,
        privateKey: process.env.API_PRIVATE_KEY
      })
      .then(response => {
        Api.setToken(response.token);
        Api.setRefreshToken(response.refreshToken);
      });
  }

  getRoutes(store)
    .then(routes => {
      // retrieve data for all components on the current route
      const promises = [];

      // used for forms submission
      const responsePromise = new Promise((resolve, reject) => {
        // POST routes
        if (req.method === "POST") {
          console.log("Unhandled POST");
        } else {
          resolve();
        }
      });

      let show404 = true;

      // iterate through the routes and prepare fetchData and reducers
      routes.forEach(route => {
        const match = matchPath(path, {
          path: route.url,
          exact: route.isExact
        });

        if (match) {
          // inform the parent that we have found at least one match
          if (!route.isMaster) {
            show404 = false;
          }
          // GET routes
          const routeComponent = getRouteComponent(route.name);

          // inject the reducers for the route
          routeComponent.getReducers.forEach(fn => {
            const { key, reducer } = fn();
            injectReducer(store, key, reducer);
          });

          // add the promise to fetch the route data
          routeComponent.fetchData.forEach(fn => {
            promises.push(
              fn(store, {
                path,
                query,
                match,
                route
              })
            );
          });

          return true;
        }
      });

      // no page matches
      if (show404) {
        res.status(404);

        // fetch data for page-not-found
        if (PageNotFound) {
          const { key, reducer } = PageNotFound.getReducer();
          injectReducer(store, key, reducer);
          promises.push(PageNotFound.fetchData(store));
        }
      }

      responsePromise
        .then(response => {
          if (response) {
            const { redirectUrl, statusCode } = response;
            if (redirectUrl) {
              res.redirect(redirectUrl);
            } else if (statusCode) {
              res.status(statusCode).send();
            }
          } else {
            if (Header) {
              const { key, reducer } = Header.getReducer();
              injectReducer(store, key, reducer);
              promises.push(Header.fetchData(store, { path }));
            }

            Promise.all(promises)
              .then(response => {
                const staticContext = {};

                // render the component to a string
                const html = renderToString(
                  <Provider store={store}>
                    <div id="app">
                      <StaticRouter context={staticContext} location={url}>
                        <Routes routes={routes} />
                      </StaticRouter>
                    </div>
                  </Provider>
                );

                // Grab the initial state from our Redux store
                const preloadedState = store.getState();

                const data = Object.assign(defaultPathConfig, {
                  html: html,
                  preloadedState: JSON.stringify(preloadedState.toJS()).replace(
                    /</g,
                    "\\u003c"
                  ),
                  token: JSON.stringify(Api.getToken()),
                  refreshToken: JSON.stringify(Api.getRefreshToken())
                });

                const helmet = Helmet.renderStatic();

                res.render("index", {
                  htmlAttributes: helmet.htmlAttributes,
                  bodyAttributes: helmet.bodyAttributes,
                  head: `${helmet.title} ${helmet.meta} ${helmet.link}`,
                  data
                });
              })
              .catch(error => {
                console.error(error);
                throw error;
              });
          }
        })
        .catch(error => {
          res.status(500);
          res.render("500", { layout: false });
        });
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
