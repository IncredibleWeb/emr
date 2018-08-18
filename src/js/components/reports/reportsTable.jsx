import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ReportsTable = ({ reports, balance }) => {
  if (reports && reports.length) {
    return (
      <table className="table table__container">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Service</th>
            <th className="table__container--right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(n => {
            return (
              <tr key={n.id}>
                <td title="Date">{moment(n.date).format("DD/MM/YYYY")}</td>
                <td title="Type">{n.type}</td>
                <td title="Service">{n.service}</td>
                <td className="table__container--right" title="Amount">
                  {n.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <p>No reports have been performed yet.</p>;
  }
};

ReportsTable.propTypes = {
  reports: PropTypes.array
};

export default ReportsTable;
