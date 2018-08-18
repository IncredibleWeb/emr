import React from "react";
import PropTypes from "prop-types";

const Image = ({ urlPrefix = "", input, alt, label, className }) => (
  <img
    src={`${urlPrefix}/${input.value}`}
    alt={alt}
    {...input}
    title={label}
    className={className ? ` ${className}` : ""}
  />
);

Image.propTypes = {
  urlPrefix: PropTypes.string,
  alt: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default Image;
