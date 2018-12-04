import React from "react";

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
      className={"table__cell--clickable " + (className || "")}
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

export default ClickableCell;
