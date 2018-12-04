import React from "react";


const MaterialDropDown = props => {
  const {
    input,
    label,
    className = "",
    disabled,
    children,
    meta: { touched, error }
  } = props;
  return (
    <div className={`form-field material ${className || ""}`}>
      <select className={className} {...input} disabled={disabled}>
        {children}
      </select>
      <span className="highlight" />
      <span className="bar" />
      {label && (
        <label htmlFor={input.name}>
          <span>{label}</span>
        </label>
      )}
    </div>
  );
};

export default MaterialDropDown;
