import React from "react";


const MaterialTextBox = props => {
  const {
    type = "text",
    input,
    label,
    className,
    readOnly,
    disabled,
    messages,
    meta: { touched, error }
  } = props;
  return (
    <div
      className={`form-field material ${className || ""}
        ${messages && messages.length > 0 ? " invalid" : ""}`}
    >
      <input
        type={type}
        className={input.value || input.value === 0 ? "has-value" : ""}
        {...input}
        readOnly={readOnly}
        disabled={disabled}
      />
      <span className="bar" />
      <label htmlFor={input.name}>
        <span>{label}</span>
      </label>
      {messages &&
        messages.map((n, index) => {
          return (
            <span key={index} className="error-message">
              {n.message}
            </span>
          );
        })}
    </div>
  );
};

export default MaterialTextBox;
