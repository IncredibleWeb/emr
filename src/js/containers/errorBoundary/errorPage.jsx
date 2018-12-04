import React from "react";

const ErrorPage = () => (
  <section className="error-page">
    <div className="error-page__content">
      <div className="error-page__logo">
        <img
          className="error-page__img"
          src="/img/broken_icon.svg"
          title="EMR"
          alt="EMR"
        />
      </div>
      <div className="error-page__title">
        <h1>Unexpected Error</h1>
      </div>
      <div className="error-page__message">
        <p>
          Unfortunately the website encountered an error. Please try again
          later.
        </p>
        <p />
        <p>EMR</p>
      </div>
    </div>
  </section>
);

export default ErrorPage;
