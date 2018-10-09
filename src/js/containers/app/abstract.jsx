/*
 * Root component
 */
import React from "react";

export default class AppAbstract extends React.PureComponent {
  render() {
    return <div className="app-abstract" />;
  }

  static fetchData() {
    return null;
  }
}
