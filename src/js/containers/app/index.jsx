/*
 * Root component for client-side
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import OfflineManager from "../../util/offlineManager";
import { configureStore } from "../../util/store";
import { getRoutesState } from "../routes/reducer";
import { Routes } from "../routes/index";
import { TopLevelErrorBoundary } from "../errorBoundary";
import { setDeferredPrompt } from "./actions";
import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from "../../../../service/constants";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    // grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__;

    // allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__;

    const token = window.__AUTH_TOKEN__;
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    delete window.__AUTH_TOKEN__;
    const refreshToken = window.__AUTH_REFRESH_TOKEN__;
    sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    delete window.__AUTH_REFRESH_TOKEN__;

    this.store = configureStore(preloadedState);
  }

  componentDidMount() {
    // install service worker
    initServiceWorker();
    initOffline();
    initNoJSObserver();

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // store the event so it can be triggered later.
      //https://developers.google.com/web/fundamentals/app-install-banners/
      this.store.dispatch(setDeferredPrompt(e));

      return false;
    });
  }

  render() {
    const { routes } = getRoutesState(this.store.getState()).toJS();
    return (
      <Provider store={this.store}>
        <div id="app">
          <TopLevelErrorBoundary>
            <BrowserRouter>
              <Routes routes={routes} />
            </BrowserRouter>
          </TopLevelErrorBoundary>
        </div>
      </Provider>
    );
  }
}

const initNoJSObserver = () => {
  let targetNode = document.querySelector("html");

  const config = { attributes: true, childList: false, subtree: false };

  const callback = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type == "attributes") {
        if (targetNode.classList.contains("no-js")) {
          targetNode.classList.remove("no-js");
        }
      }
    }
  };

  let observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
};

const initServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Successfully registered service worker", reg);
      })
      .catch(err => {
        console.warn("Error whilst registering service worker", err);
      });
  }
};

const initOffline = () => {
  window.addEventListener(
    "online",
    e => {
      OfflineManager.setOffline(false);
    },
    false
  );

  window.addEventListener(
    "offline",
    e => {
      OfflineManager.setOffline(true);
    },
    false
  );

  if (!navigator.onLine) {
    OfflineManager.setOffline(true);
  }
};
