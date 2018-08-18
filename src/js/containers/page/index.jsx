import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/card";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchPage } from "./actions";
import { pageReducer, getPageState } from "./reducer";
import { getAppState } from "../app/reducer";

class Page extends React.PureComponent {
  componentDidMount() {
    const { page, onLoadPage, match } = this.props;

    if (page.url !== match.path) {
      onLoadPage({ path: match.path });
    }
  }

  render() {
    const { page } = this.props;
    return (
      <section className="content">
        {!!page.images &&
          page.images.length && (
            <section className="banner">
              {
                <img
                  src={page.images[0].src}
                  alt={page.images[0].alt}
                  srcSet={page.images.map(n => `${n.src} ${n.width}w`)}
                />
              }
            </section>
          )}
        {!!page.html && (
          <section className="content">
            <Card title={page.title} html={page.html} buttons={page.buttons} />
          </section>
        )}
      </section>
    );
  }

  static fetchData(store, { match, route }) {
    return store.dispatch(
      fetchPage({
        path: match.path,
        isPartial: route.isPartial,
        isMaster: route.isMaster
      })
    );
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: pageReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return { page: getPageState(state).toJS(), app: getAppState(state).toJS() };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadPage: data => dispatch(fetchPage(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reducerInjector(REDUCER_NAME, pageReducer)(Page)
);
