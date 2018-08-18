import React from "react";
import PropTypes from "prop-types";

const SearchBox = props => {
  const {
    type = "text",
    placeholder = "Search",
    input,
    className = ""
  } = props;
  return (
    <div className={`form-field material ${className}`}>
      <div className="search-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          className={input.value ? "has-value" : ""}
          {...input}
        />
      </div>
      <span className="bar" />
    </div>
  );
};

SearchBox.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
};

export default SearchBox;
