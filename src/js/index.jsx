import React from "react";
import { hydrate } from "react-dom";

import App from "./containers/app/index";

hydrate(<App />, document.getElementById("root"));
