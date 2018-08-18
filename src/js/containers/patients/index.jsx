import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Card from "../../components/card/card";
import TableWrapper from "../../components/table/tableWrapper";
import PatientsForm from "../../components/patients/patientsForm";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchPatients } from "./actions";
import { patientsReducer, getPatientsState } from "./reducer";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "../snackbar/constants";

const URL = "/patients";

class Patients extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      url: (props.url || "") + URL
    };
  }

  // initial load (occurs once when mounting this component)
  componentDidMount() {
    const { onLoadPatients, patients } = this.props;
    if (!(patients && patients.length)) {
      onLoadPatients();
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { patients, isLoading, isError, onResetOffer, history } = this.props;
    return (
      <div className="content">
        <PatientsForm patients={patients} />
      </div>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchPatients());
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
