import React from "react";
import PropTypes from "prop-types";

const PatientsForm = ({ patients }) => {
  if (patients) {
    return (
      <section className="offers">
        <h1 className="table__header">Patient</h1>
        <ul className="offers__list">
          {patients.map(n => {
            return (
              <li key={n.id} className="offers__list__item card">
                <h3>
                  <span className="date">{n.date}</span>: {n.title}
                </h3>
                <p>{n.text}</p>
              </li>
            );
          })};
        </ul>
      </section>
    );
  }
};

PatientsForm.propTypes = {
  patients: PropTypes.array
};

export default PatientsForm;
