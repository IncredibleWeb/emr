import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const PatientsTable = ({ patients, balance }) => {
  if (patients && patients.length) {
    return (
      <table className="table table__container">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Document Number</th>
            <th className="table__container--right">Visits</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(n => {
            return (
              <tr key={n.id}>
                <td title="Date">
                  {moment(n.lastVisitDate).format("DD/MM/YYYY")}
                </td>
                <td title="Name">{n.name}</td>
                <td title="Telephone">{n.telephone}</td>
                <td title="Email">{n.email}</td>
                <td title="Document Number">{n.documentNumber}</td>
                <td className="table__container--right" title="Visits">
                  {n.visits.length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <p>No patient records.</p>;
  }
};

PatientsTable.propTypes = {
  patients: PropTypes.array
};

export default PatientsTable;
