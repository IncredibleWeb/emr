import React from "react";
import { connect } from "react-redux";

import ReportsTable from "../../components/reports/reportsTable";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchReports } from "./actions";
import { reportsReducer, getReportsState } from "./reducer";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "../snackbar/constants";

class Reports extends React.PureComponent {
  // initial load (occurs once when mounting this component)
  componentDidMount() {
    const { onLoadReports, reports } = this.props;
    if (!(reports && reports.length)) {
      onLoadReports();
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { reports, isLoading, isError, history } = this.props;
    return (
      <div className="content">
        <h1 className="table__header">Reports</h1>
        <div className="card">
          <ReportsTable reports={reports} />
        </div>
      </div>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchReports());
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: reportsReducer };
  }
}

// maps the redux offer state to the props related to the data from the offer
const mapStateToProps = state => getReportsState(state).toJS();

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadReports: data => dispatch(fetchReports(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, reportsReducer)(Reports)
);
