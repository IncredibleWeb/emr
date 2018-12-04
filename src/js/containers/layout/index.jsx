import React from "react";
import { connect } from "react-redux";

import Header from "../header/index";
import Snackbar from "../snackbar/index";
import ErrorMessage from "../errorBoundary/errorMessage";
import Breadcrumbs from "../breadcrumbs/index";
import Meta from "../../components/meta/meta";
import FadeTransition from "../../components/transitions/fade";
import { getAppState } from "../app/reducer";

class Layout extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { children, app, showBreadcrumbs } = this.props;
    return (
      <div className={(app.isLoading ? "is-loading" : "") + " layout"}>
        <Meta meta={app.meta} url={app.url} />
        <Header />
        <FadeTransition in={!app.isLoading}>
          <main id="main" className="main">
            <Snackbar />
            <ErrorMessage />
            {showBreadcrumbs && <Breadcrumbs />}
            {children}
          </main>
        </FadeTransition>
      </div>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return { app: getAppState(state).toJS() };
};

export default connect(mapStateToProps)(Layout);
