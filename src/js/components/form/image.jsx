import React from "react";

const Image = ({ urlPrefix = "", input, alt, label, className }) => (
  <img
    src={`${urlPrefix}${input.value}`}
    alt={alt}
    {...input}
    title={label}
    className={className ? ` ${className || ""}` : ""}
  />
);

export default Image;
