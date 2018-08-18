import redirectData from "../redirectData.json";

// permanent redirect http requests
export function requireHttps(req, res, next) {
  if (/^localhost$/.test(req.hostname)) {
    // skip if localhost
    return next();
  } else if (/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/.test(req.hostname)) {
    // skip if IP address
    return next();
  } else if (req.secure) {
    // if already on HTTPS
    return next();
  } else if (req.get("x-arr-ssl")) {
    // https://coderead.wordpress.com/2014/09/05/redirecting-to-https-in-node-js-on-azure-websites/
    return next();
  } else {
    return res.redirect(
      301,
      req.protocol + "s" + "://" + req.headers.host + req.url
    );
  }
}

// permanent redirect to include www
export function requireWww(req, res, next) {
  if (/^localhost$/.test(req.hostname)) {
    // skip if localhost
    return next();
  } else if (/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/.test(req.hostname)) {
    // skip if IP address
    return next();
  } else if (/\.azurewebsites.net$/.test(req.hostname)) {
    // skip if azurewebsites
    return next();
  } else if (/^www\./i.test(req.headers.host)) {
    // www. already there
    return next();
  } else {
    return res.redirect(
      301,
      req.protocol + "://www." + req.headers.host + req.url
    );
  }
}

// redirect from old to new URL
export function redirectMap(req, res, next) {
  const data = redirectData.map;
  for (const key of Object.keys(data)) {
    if (RegExp(key).test(req.url.toLowerCase())) {
      return res.redirect(301, data[key]);
    }
  }
  return next();
}

export function redirectTld(req, res, next) {
  const data = redirectData.tld;
  for (const key of Object.keys(data)) {
    if (RegExp(key).test(req.hostname.toLowerCase())) {
      return res.redirect(301, data[key]);
    }
  }
  return next();
}
