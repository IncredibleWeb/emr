import React from "react";


const TextArea = props => {
  const {
    input,
    label,
    className = "",
    readOnly,
    disabled,
    messages,
    rows,
    meta: { touched, error }
  } = props;
  return (
    <div
      className={`form-field material ${className || ""} ${
        messages && messages.length > 0 ? " invalid" : ""
      }`}
    >
      <textarea
        className={input.value ? "has-value" : ""}
        {...input}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
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

export default TextArea;
