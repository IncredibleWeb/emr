import React from "react";


const SearchBox = props => {
  const {
    type = "text",
    placeholder = "Search",
    input,
    className = ""
  } = props;
  return (
    <div className={`form-field material ${className || ""}`}>
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

export default SearchBox;
