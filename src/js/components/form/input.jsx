import React from "react";
import PropTypes from "prop-types";

const Input = ({ input, type, label, className }) => (
  <input
    {...input}
    type={type}
    placeholder={label}
    className={className ? ` ${className}` : ""}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default Input;
