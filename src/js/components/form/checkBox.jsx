import React from "react";
import PropTypes from "prop-types";

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

CheckBox.propTypes = {
  label: PropTypes.string.isRequired
};

export default CheckBox;
