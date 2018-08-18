import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({
  title,
  html,
  buttons,
  closeUrl,
  className,
  children,
  ...props
}) => {
  return (
    <section className={"card " + (className || "")} {...props}>
      {title && (
        <div className="card__title">
          <h1>{title}</h1>
        </div>
      )}
      {html && (
        <div className="richtext" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      {buttons && (
        <div className="card__buttons">
          {buttons.map((n, index) => (
            <Link
              to={n.url}
              key={index}
              href={n.url}
              className="button"
              title={n.title}
            >
              {n.title}
            </Link>
          ))}
        </div>
      )}
      {closeUrl && (
        <div className="close">
          <Link to={closeUrl} className="close-button" />
        </div>
      )}
      {children}
    </section>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  html: PropTypes.string,
  buttons: PropTypes.array
};

export default Card;
