import React from "react";

const CheckBox = props => {
  const { input, label, readOnly, meta: { touched, error } } = props;
  return (
    <div className="form-field inline material">
      <div className="checkbox">
        <input type="checkbox" id={input.name} {...input} disabled={readOnly} />
        {readOnly && (
          <input name={input.name} type="hidden" value={input.value} />
        )}
        <label htmlFor={input.name}>
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
