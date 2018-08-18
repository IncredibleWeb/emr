import React from "react";
import PropTypes from "prop-types";

const TableWrapper = ({
  data,
  isLoading,
  isError,
  className = "",
  noResults,
  children
}) => {
  return (
    <div className={`table-wrapper ${className} ${isLoading ? "loading" : ""}`}>
      {data && data.length > 0 ? (
        children
      ) : (
        <div className="no-results">
          <span>{noResults || "No results found."}</span>
        </div>
      )}
    </div>
  );
};

TableWrapper.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  className: PropTypes.string,
  noResults: PropTypes.string
};

export default TableWrapper;
