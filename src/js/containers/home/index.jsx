import React from "react";
import { connect } from "react-redux";

import reducerInjector from "../../util/reducerInjector";
import withPage from "../page/withPage";
import withAuth from "../login/withAuth";
import { REDUCER_NAME } from "./constants";
import { fetchHome, getHome } from "./actions";
import { homeReducer, getHomeState } from "./reducer";

class Home extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { page } = this.props;
    return (
      <div className="content">
        <section className="richtext card">
          <div className="card-title">
            <h1>{page.title}</h1>
          </div>
          <div
            className="card-content"
            dangerouslySetInnerHTML={{
              __html: page.html
            }}
          />
        </section>
      </div>
    );
  }

  static fetchData(store, { match }) {
    return store.dispatch(fetchHome({ url: match.url }));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: homeReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    ...getHomeState(state).toJS()
  };
};

export default withAuth(
  withPage(
    connect(mapStateToProps, null)(
      reducerInjector(REDUCER_NAME, homeReducer)(Home)
    ),
    getHome
  )
);
