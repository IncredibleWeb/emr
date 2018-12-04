import React from "react";
import { Link } from "react-router-dom";

const blockClassName = "card";

const Card = ({
  title,
  html,
  buttons,
  closeUrl,
  className,
  cardClassName,
  children,
  ...props
}) => {
  return (
    <section
      className={`${blockClassName} ${
        cardClassName ? `${blockClassName}--${cardClassName}` : ""
      } ${className || ""}`}
      {...props}
    >
      {title && <h1 className={`${blockClassName}__title`}>{title}</h1>}
      {html && (
        <div className="richtext" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      {buttons && (
        <div className={`${blockClassName}__buttons`}>
          {buttons.map((n, index) => (
            <Link
              to={n.url}
              key={index}
              href={n.url}
              className={`${blockClassName}__buttons__button`}
              title={n.title}
            >
              {n.title}
            </Link>
          ))}
        </div>
      )}
      {closeUrl && (
        <div className="card-close">
          <Link to={closeUrl} className="card-close__button" />
        </div>
      )}
      {children}
    </section>
  );
};

export default Card;
