import React from "react";


const Radio = props => {
  const { className = "", messages, name, options, input } = props;
  return (
    <div
      className={`form-field ${className ? `form-field--${className}` : ""}`}
    >
      <div className="radio-group">
        {options &&
          options.map((option, index) => {
            return (
              <div key={option.id} className="radio-group__item">
                <input
                  id={option.id}
                  type="radio"
                  {...input}
                  value={option.value}
                  checked={option.value === input.value}
                  className="radio-group__item__input"
                />
                <label htmlFor={option.id} className="radio-group__item__label">
                  {option.label}
                </label>
              </div>
            );
          })}
      </div>

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

export default Radio;
