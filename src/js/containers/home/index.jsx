import React from "react";
import { connect } from "react-redux";

import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchHome } from "./actions";
import { homeReducer, getHomeState } from "./reducer";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "../snackbar/constants";
import { getPageState } from "../page/reducer";
import { getAppState } from "../app/reducer";

class Home extends React.PureComponent {
  componentDidMount() {
    const { app, onLoadHome, match } = this.props;

    if (app.url !== match.url) {
      onLoadHome({ url: match.url });
    }
  }

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

  static fetchData(data, { match }) {
    return data.dispatch(fetchHome({ url: match.path }));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: homeReducer };
  }
}

// maps the redux offer state to the props related to the data from the offer
const mapStateToProps = state => {
  return {
    app: getAppState(state).toJS(),
    page: getPageState(state).toJS(),
    ...getHomeState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadHome: data => dispatch(fetchHome(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, homeReducer)(Home)
);
