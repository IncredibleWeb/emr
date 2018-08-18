import React from "react";
import { connect } from "react-redux";

import reducerInjector from "../../util/reducerInjector";
import Nav from "../../components/nav/nav";
import { fetchHeader, setNavItemActive } from "./actions";
import { REDUCER_NAME } from "./constants";
import { getAppState } from "../app/reducer";
import { headerReducer, getHeaderState } from "./reducer";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logo: {
        src: "/img/logo.png",
        alt: process.env.NAME,
        title: process.env.NAME
      }
    };
  }

  componentDidMount() {
    const { onSetNavItemActive } = this.props;

    // set initial navigation item
    onSetNavItemActive({
      href: location.pathname
    });
  }

  render() {
    const { nav, app, onSetNavItemActive } = this.props;

    return (
      <div>
        <header>
          {process.env.SHOW_HEADER_LOGO && (
            <div className="header-logo">
              <img
                src={this.state.logo.src}
                title={this.state.logo.title}
                alt={this.state.logo.alt}
                className="header-logo__img"
              />
            </div>
          )}
          <div className="header-wrapper">{app.title}</div>
        </header>
        <Nav
          nav={nav}
          logo={this.state.logo}
          onSetNavItemActive={onSetNavItemActive}
        />
      </div>
    );
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchHeader(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: headerReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => ({
  app: getAppState(state).toJS(),
  ...getHeaderState(state).toJS()
});

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onSetNavItemActive: data => dispatch(setNavItemActive(data))
  };
};

// inject a new reducer for this component
export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, headerReducer)(Header)
);
