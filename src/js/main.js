import Nav from "./nav";

if (document.getElementById("hamburger")) {
  // eslint-disable-next-line no-unused-vars
  const nav = new Nav(document.getElementById("hamburger"));
}

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
