import React from "react";

import { Link } from "react-router-dom";

const Tabs = ({ data, url, history, className = "" }) => (
  <div className="tabs">
    {data.map(n => (
      <Link
        key={n.url}
        to={`${url}/${n.url}`}
        title={n.title}
        className={
          "tabs__link" +
          (history.location.pathname.startsWith(`${url}/${n.url}`)
            ? " selected"
            : "")
        }
      >
        {n.title}
      </Link>
    ))}
  </div>
);

export default Tabs;
