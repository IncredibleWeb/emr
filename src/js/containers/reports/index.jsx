import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/card";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchReports } from "./actions";
import { reportsReducer, getReportsState } from "./reducer";
import { getPageState } from "../page/reducer";

class Reports extends React.PureComponent {
  componentDidMount() {
    const { onLoadReports, reports, match } = this.props;
    if (!(reports && reports.length)) {
      onLoadReports({ url: match.path });
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { reports, page, isLoading, isError, history } = this.props;
    return (
      <div className="content">
        <h1 className="table__header">Reports</h1>
        <Card html={page.html} />
      </div>
    );
  }

  static fetchData(store, { match }) {
    return store.dispatch(fetchReports({ url: match.path }));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: reportsReducer };
  }
}

// maps the redux offer state to the props related to the data from the offer
const mapStateToProps = state => ({
  page: getPageState(state).toJS(),
  ...getReportsState(state).toJS()
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadReports: data => dispatch(fetchReports(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, reportsReducer)(Reports)
);
