import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Tabs = ({ data, url, history, className = "" }) => (
  <div className="tab-container">
    <div className="tabs">
      {data.map(n => (
        <Link
          key={n.url}
          to={`${url}/${n.url}`}
          title={n.title}
          className={
            "tab-link" +
            (history.location.pathname.startsWith(`${url}/${n.url}`)
              ? " selected"
              : "")
          }
        >
          {n.title}
        </Link>
      ))}
    </div>
  </div>
);

Tabs.propTypes = {
  data: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  className: PropTypes.string
};

export default Tabs;
