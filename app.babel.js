/* global  __dirname */
/* global  process */

"use strict";

import fs from "fs";
import https from "https";
import path from "path";
import express from "express";
import exphbs from "express-handlebars";
import handlebars from "handlebars";
import bodyParser from "body-parser";
import compression from "compression";
import session from "express-session";
import cookieParser from "cookie-parser";
import fileStore from "session-file-store";

// custom helpers
import { handleRender } from "./server/server";
import { requireHttps, requireWww } from "./server/helpers/routing.js";
import { getRoutes } from "./server/routes";
import { matchPath } from "react-router-dom";
import { SESSION_USER } from "./service/constants";

// configuration
const config = {
  environment: process.env.NODE_ENV || "development",
  isHttps: process.env.isHttps === true || false
};

const FileSessionStorage = fileStore(session);

const app = express();
app.use(compression());

const viewsDir = "./templates";

// setup express to use handlebars as the templating engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
  partialsDir: path.join(__dirname, `${viewsDir}/partials`),
  extname: ".hbs"
});

// allows partials to be organised in subfolders
hbs
  .getTemplates(path.join(__dirname, `${viewsDir}/partials`))
  .then(function(partials) {
    for (let partial in partials) {
      handlebars.registerPartial(partial, "{{" + partial + "}}");
    }
  })
  .catch(error => {
    console.log(`Unable to retrieve templates. Error: ${error}`);
  });

app.set("views", path.join(__dirname, `${viewsDir}`));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// setup server for static assets
app.use(
  "/",
  express.static(path.join(__dirname, "dist"), { maxAge: 604800000 })
);

// https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// require HTTPS
app.use(requireHttps);

// redirect to include www
app.use(requireWww);

// Setup body parser for parsing POST request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionExpiration = 20 * 60 * 1000; // 20 minutes

app.use(cookieParser());

app.use(
  session({
    store: new FileSessionStorage({}),
    secret: "auth",
    cookie: { maxAge: sessionExpiration },
    unset: "destroy",
    resave: true,
    saveUninitialized: false,
    sameSite: true
  })
);

app.post("/setSession", function(req, res) {
  req.session[req.body.sessionKey] = req.body.sessionData;
  if (req.body.rememberSession) {
    req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
  }
  res.end();
});

let extractPath = req => {
  // extract the path from the url
  let urlSections = req.path.split("/");
  urlSections = urlSections.filter(sectionString => {
    return sectionString.length > 0;
  });

  let urlPath = null;
  if (urlSections.length === 0) {
    if (urlSections[0] === "") {
    }
    urlPath = "/";
  } else {
    urlPath = "/" + urlSections.join("/");
  }
  return urlPath;
};

app.use((req, res, next) => {
  if (req.path === "/logout/") {
    req.session[SESSION_USER] = null;
    return res.redirect("/login");
  } else {
    return next();
  }
});

app.use((req, res, next) => {
  if (process.env.AUTHENTICATION_MODE === "FORM") {
    let user = req.session.user;

    getRoutes().then(routes => {
      let route = routes.find(item => {
        return matchPath(req.path, {
          path: item.url,
          exact: true
        });
      });

      if ((route && route.isPublic) || user) {
        // If all is ok, move on to the router
        return next();
      }

      if (!user) {
        return res.redirect(302, "/login");
      }
    });
  } else {
    return next();
  }
});

// React-Redux middleware
app.use(handleRender);

app.use(function(error, req, res, next) {
  console.error(error.message);
  res.status(500);
  res.render("500", { layout: false });
  return;
});

// use the environment's port or a random port
const port =
  process.env.port ||
  (process.env.isDev
    ? 3000
    : Math.floor(Math.random() * (65535 - 1024)) + 1024);
app.listen(port, () => {
  console.log(`Running ${config.environment} on localhost:${port}`);
});

if (config.isHttps) {
  const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
    requestCert: false,
    rejectUnauthorized: false
  };

  // create a different random port for HTTPS
  let httpsPort = process.env.isDev
    ? 6001
    : Math.floor(Math.random() * 65535) + 1024;
  while (httpsPort === port) {
    httpsPort = Math.floor(Math.random() * 65535) + 1024;
  }

  const server = https.createServer(options, app).listen(httpsPort, () => {
    console.log(
      `Running ${config.environment} (HTTPS) on localhost:${httpsPort}`
    );
  });
}

module.exports = app;
