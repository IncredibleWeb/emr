/*
 * Root component on the server-side
 */
import React from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import formidable from "formidable";
import fs from "fs";

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

import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  SESSION_USER,
  USER_ID_STORAGE_KEY
} from "../service/constants";

const authenticationMode = process.env.AUTHENTICATION_MODE;

const handlePostRequest = ({
  requestPath,
  formValues,
  submitParams,
  resolve,
  reject,
  promises,
  store,
  path,
  formValidator,
  submit,
  serviceInstance,
  redirectUrl,
  component,
  successCallback
}) => {
  const matchReqPath = matchPath(requestPath, {
    path,
    exact: true
  });

  // merge all form values and custom parameters
  let allSubmitParams = { ...formValues, ...submitParams };

  if (matchReqPath) {
    let validator =
      (formValidator && formValidator(formValues)) || Promise.resolve();

    validator
      .then((errors, values) => {
        if (!errors) {
          submit
            .call(serviceInstance, allSubmitParams)
            .then(response => {
              successCallback && successCallback(response);
              // once successful, redirect to the thank you page
              resolve({
                redirectUrl
              });
            })
            .catch(error => {
              reject(error);
            });
        } else {
          promises.push(
            component.fetchValidationMessages(store, {
              messages: errors,
              formValues: formValues
            })
          );
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  }
};

const handlePostRequestDecorator = ({
  requestPath,
  formValues,
  resolve,
  reject,
  promises,
  store,
  hash
}) => {
  return params => {
    handlePostRequest({
      ...params,
      requestPath,
      formValues,
      resolve,
      reject,
      promises,
      store,
      hash
    });
  };
};

export function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore();
  const { path, url, query } = req;

  if (authenticationMode === "PRIVATE_KEY") {
    Api.authentication
      .requestToken({
        ttl: process.env.API_TOKEN_DURATION,
        privateKey: process.env.API_PRIVATE_KEY
      })
      .then(response => {
        req.session[SESSION_USER] = {};
        req.session[SESSION_USER][TOKEN_STORAGE_KEY] = response.token;
        req.session[SESSION_USER][REFRESH_TOKEN_STORAGE_KEY] =
          response.refreshToken;

        Api.setToken(response.token);
      });
  }

  getRoutes(store)
    .then(routes => {
      // retrieve data for all components on the current route
      const promises = [];

      // used for forms submission
      const responsePromise = new Promise((resolve, reject) => {
        const formValues = req.body;

        const postRequestHandler = handlePostRequestDecorator({
          requestPath: path,
          formValues,
          resolve,
          reject,
          promises,
          store
        });

        // POST routes
        if (req.method === "POST") {
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

          let userId = undefined;

          if (
            req.session[SESSION_USER] &&
            req.session[SESSION_USER][USER_ID_STORAGE_KEY]
          ) {
            userId = req.session[SESSION_USER][USER_ID_STORAGE_KEY];
          }

          // add the promise to fetch the route data
          routeComponent.fetchData.forEach(fn => {
            promises.push(
              fn(
                store,
                {
                  path,
                  query,
                  match,
                  route
                },
                userId
              )
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

      let hasActiveSession = false;

      if (req.session[SESSION_USER]) {
        hasActiveSession =
          req.session[SESSION_USER][TOKEN_STORAGE_KEY] &&
          req.session[SESSION_USER][REFRESH_TOKEN_STORAGE_KEY] &&
          matchPath(path, {
            path: "/login/",
            exact: true
          });
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
          } else if (hasActiveSession) {
            res.redirect("/");
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

                let _preloadedState = JSON.parse(
                  JSON.stringify(preloadedState.toJS()).replace(/</g, "\\u003c")
                );

                let _token = "";
                let _refreshToken = "";

                if (req.session[SESSION_USER]) {
                  _token = req.session[SESSION_USER][TOKEN_STORAGE_KEY];
                  _refreshToken =
                    req.session[SESSION_USER][REFRESH_TOKEN_STORAGE_KEY];
                }

                Api.setToken(_token);

                const data = Object.assign(defaultPathConfig, {
                  html: html,
                  preloadedState: JSON.stringify(_preloadedState),
                  token: JSON.stringify(_token),
                  refreshToken: JSON.stringify(_refreshToken)
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
          console.error(error);
          res.status(500);
          res.render("500", { layout: false });
        });
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
