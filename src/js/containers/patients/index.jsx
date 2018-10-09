import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Card from "../../components/card/card";
import TableWrapper from "../../components/table/tableWrapper";
import PatientsTable from "../../components/patients/patientsTable";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchPatients } from "./actions";
import { patientsReducer, getPatientsState } from "./reducer";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "../snackbar/constants";

class Patients extends React.PureComponent {
  componentDidMount() {
    const { onLoadPatients, patients, match } = this.props;
    if (!(patients && patients.length)) {
      onLoadPatients({ url: match.path });
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { patients, isLoading, isError, onResetOffer, history } = this.props;
    return (
      <div className="content">
        <h1 className="table__header">Patients</h1>
        <div className="card">
          <PatientsTable patients={patients} />
        </div>
      </div>
    );
  }

  static fetchData(store, { match }) {
    return store.dispatch(fetchPatients({ url: match.path }));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: patientsReducer };
  }
}

// maps the redux patient state to the props related to the data from the patient
const mapStateToProps = state => {
  return getPatientsState(state).toJS();
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadPatients: data => dispatch(fetchPatients(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, patientsReducer)(Patients)
);
