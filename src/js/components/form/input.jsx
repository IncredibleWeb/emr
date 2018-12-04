import React from "react";


const Input = ({ input, type, label, className }) => (
  <input
    {...input}
    type={type}
    placeholder={label}
    className={className ? ` ${className || ""}` : ""}
  />
);

export default Input;
