import React from "react";

import Card from "../../components/card/card";
import reducerInjector from "../../util/reducerInjector";
import withPage from "./withPage";
import { REDUCER_NAME } from "./constants";
import { fetchPage } from "./actions";
import { pageReducer } from "./reducer";

class Page extends React.PureComponent {
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
          <Card title={page.title} html={page.html} buttons={page.buttons} />
        )}
      </section>
    );
  }

  static fetchData(store, { match, route }) {
    return store.dispatch(
      fetchPage({
        url: match.url
      })
    );
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: pageReducer };
  }
}

export default withPage(reducerInjector(REDUCER_NAME, pageReducer)(Page));
