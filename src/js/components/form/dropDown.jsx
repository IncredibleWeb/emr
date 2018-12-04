import React from "react";

const DropDown = props => {
  const {
    input,
    label,
    className = "",
    disabled,
    children,
    messages,
    meta: { touched, error },
    material
  } = props;
  return (
    <div
      className={`form-field ${className || ""} ${
        material ? "form-field--material" : ""
      }`}
    >
      <select className="form-field__input" {...input} disabled={disabled}>
        {children}
      </select>
      {label &&
        !material && (
          <label className="form-field__label" htmlFor={input.name}>
            <span>{label}</span>
          </label>
        )}
      {messages &&
        messages.map((n, index) => {
          return (
            <span key={index} className="form-field__error-message">
              {n.message}
            </span>
          );
        })}
    </div>
  );
};

export default DropDown;
