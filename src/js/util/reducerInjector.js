import React from "react";

import hoistNonReactStatics from "hoist-non-react-statics";

import { injectReducer } from "./store";

export default (key, reducer) => WrappedComponent => {
  class ReducerInjector extends React.PureComponent {
    componentWillMount() {
      injectReducer(this.context.store, key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
