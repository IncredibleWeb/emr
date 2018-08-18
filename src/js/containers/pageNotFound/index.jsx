import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/card";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchPageNotFound } from "./actions";
import { pageNotFoundReducer, getPageNotFoundState } from "./reducer";
import { getAppState } from "../app/reducer";

const URL = "/page-not-found";

class PageNotFound extends React.PureComponent {
  componentDidMount() {
    const { onLoadPageNotFound, title } = this.props;
    if (!title) {
      onLoadPageNotFound(URL);
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { title, html } = this.props;
    return (
      <section className="pageNotFound">
        {!!html && (
          <section className="content">
            <Card title={title} html={html} />
          </section>
        )}
      </section>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchPageNotFound({ path: URL }));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: pageNotFoundReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return getPageNotFoundState(state).toJS();
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadPageNotFound: data => dispatch(fetchPageNotFound(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, pageNotFoundReducer)(PageNotFound)
);
