import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ClickableCell = ({
  allowEdit,
  onEdit,
  onView,
  url,
  id,
  label,
  children,
  className
}) => {
  return (
    <Link
      to={url}
      title={label}
      className={"clickable-cell " + (className || "")}
      onClick={e => {
        e.stopPropagation();
        if (allowEdit && onEdit) {
          onEdit({ id: id });
        } else if (onView) {
          onView({ id: id });
        }
      }}
    >
      {children}
    </Link>
  );
};

ClickableCell.propTypes = {
  allowEdit: PropTypes.bool,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  label: PropTypes.string
};

export default ClickableCell;
