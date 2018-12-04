import React from "react";

const inputField = ({
  input,
  type,
  label,
  messages,
  className,
  readOnly,
  autoComplete,
  meta: { touched, error }
}) => (
  <p className={`form-field ${className ? `form-field--${className}` : ""}`}>
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
