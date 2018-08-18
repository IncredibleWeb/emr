import React from "react";
import PropTypes from "prop-types";

import Overlay from "../nav/overlay";

const Modal = ({ className, children, onClick }) => {
  return (
    <section className={className ? className : ""}>
      <Overlay isVisible={true} onClick={onClick} />
      <div className="modal">{children}</div>
    </section>
  );
};

Modal.propTypes = {
  className: PropTypes.string
};

export default Modal;
