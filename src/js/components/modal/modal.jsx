import React from "react";

import Overlay from "../nav/overlay";

const Modal = ({ className, modalClassName, children, onClick, wide }) => {
  return (
    <section className={className || ""}>
      <Overlay isVisible={true} onClick={onClick} />
      <div
        className={`modal ${modalClassName ? `modal--${modalClassName}` : ""} ${
          wide ? "modal--wide" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
