import React from "react";

const TextBox = props => {
  const {
    type = "text",
    input,
    label,
    className,
    readOnly,
    disabled,
    messages,
    autoComplete,
    border,
    material,
    align,
    min,
    max,
    step,
    meta: { touched, error },
    isAlwaysOpen
  } = props;
  return (
    <div
      className={`form-field ${className ? `form-field--${className}` : ""}
        ${messages && messages.length > 0 ? " form-field--invalid" : ""}
        ${material ? "form-field--material" : ""}`}
    >
      <input
        type={type}
        className={`form-field__input ${
          input.value || input.value === 0 ? "form-field__input--has-value" : ""
        } ${border ? "form-field__input--bordered" : ""} ${
          align ? `form-field__input--${align}` : ""
        }`}
        {...input}
        readOnly={readOnly}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
      />
      <label
        className={`form-field__label ${
          isAlwaysOpen ? "form-field__label--always-open" : ""
        }`}
        htmlFor={input.name}
      >
        <span>{label}</span>
      </label>
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

export default TextBox;
