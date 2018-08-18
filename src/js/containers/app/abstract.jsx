/*
 * Root component
 */
import React from "react";
import { fetchApp } from "./actions";

export default class AppAbstract extends React.PureComponent {
  render() {
    return <div className="app-abstract" />;
  }

  static fetchData() {
    return null;
  }
}
