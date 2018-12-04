import React from "react";

const TableWrapper = ({
  data,
  isLoading,
  isError,
  className = "",
  noResults,
  children
}) => {
  return (
    <div
      className={`table-wrapper ${className || ""} ${
        isLoading ? "loading" : ""
      }`}
    >
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

export default TableWrapper;
