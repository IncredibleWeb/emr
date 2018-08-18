import React from "react";
import PropTypes from "prop-types";

const inputField = ({
  input,
  type,
  label,
  messages,
  className,
  readOnly,
  meta: { touched, error }
}) => (
  <p className={`form-field ${className ? className : ""}`}>
    <input {...input} type={type} placeholder={label} readOnly={readOnly} />
    {messages &&
      messages.map((n, index) => {
        return (
          <label key={index} className="error">
            {n.message}
          </label>
        );
      })}
  </p>
);

export default inputField;
