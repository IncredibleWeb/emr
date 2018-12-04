import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAppState } from "../app/reducer.js";
import { setBoundaryError } from "../app/actions.js";

const TTL = 5000;

class ErrorMessage extends React.PureComponent {
  componentDidMount() {
    toggleSnackbar(this.element, this.props.onSetBoundaryError);
  }

  componentDidUpdate() {
    toggleSnackbar(this.element, this.props.onSetBoundaryError);
  }

  render() {
    const { isBoundaryError } = this.props;

    const message = "The application encountered an error.";

    return isBoundaryError ? (
      <div
        ref={n => {
          this.element = n;
        }}
        className={"snackbar dismissed"}
      >
        <p className="snackbar__text">{message}</p>
      </div>
    ) : null;
  }
}

const toggleSnackbar = (element, onSetBoundaryError) => {
  if (element) {
    element.classList.remove("dismissed");
    setTimeout(() => {
      element.classList.add("dismissed");
      onSetBoundaryError(false);
    }, TTL);
  }
};

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return { isBoundaryError: getAppState(state).toJS().isBoundaryError };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onSetBoundaryError: data => dispatch(setBoundaryError(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ErrorMessage)
);
