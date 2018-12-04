import React from "react";
import { connect } from "react-redux";
import { default as pathToRegexp } from "path-to-regexp";

import Modal from "../../components/modal/modal";
import Card from "../../components/card/card";
import LoginForm from "../../components/login/loginForm";
import reducerInjector from "../../util/reducerInjector";
import { setCookie, getCookie } from "../../util/util";
import { REDUCER_NAME } from "./constants";
import {
  setValidationMessages,
  resetValidationMessages,
  login,
  getUserSession
} from "./actions";
import { loginReducer, getLoginState } from "./reducer";
import { fetchPage } from "../page/actions";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "../snackbar/constants";
import { validateLoginForm } from "../../../../models/loginForm";
import withPage from "../page/withPage";
import withSubmit from "../app/withSubmit";

import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from "../../../../service/constants";

const RETURN_URL = "/";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      returnUrl: RETURN_URL,
      authFailureMessage: "",
      validator: validateLoginForm,
      submitHandler: this.props.onLogin,
      submitSuccessCallback: this.submitSuccessCallback.bind(this),
      submitFailureCallback: this.submitFailureCallback.bind(this)
    };

    let sessionData = this.props.getUserSession();

    if (
      sessionData &&
      sessionData[TOKEN_STORAGE_KEY] &&
      sessionData[REFRESH_TOKEN_STORAGE_KEY]
    ) {
      this.props.history.push(this.state.returnUrl);
    }

    this.submit = this.props.submit.bind(this);
  }

  submitSuccessCallback() {
    this.props.history.push(this.state.returnUrl);
  }

  submitFailureCallback(err) {
    this.setState({
      authFailureMessage: err.message
    });
  }

  render() {
    const { page, messages, history, match } = this.props;

    return (
      <Modal modalClassName="fullscreen">
        <Card
          title={page.title}
          html={page.html}
          buttons={page.buttons}
          cardClassName="fullscreen"
          className="login"
        >
          <LoginForm
            action={match.url}
            method="post"
            mode={this.state.action}
            messages={messages}
            authFailureMessage={this.state.authFailureMessage}
            onSubmit={e => {
              this.setState({
                authFailureMessage: ""
              });

              return this.submit(e);
            }}
            onCancel={e => {
              e.preventDefault();
              history.push(this.state.returnUrl);
            }}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { match, route }) {
    return store.dispatch(fetchPage({ url: match.path }));
  }

  static fetchValidationMessages(store, data) {
    return store.dispatch(setValidationMessages(data));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: loginReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    ...getLoginState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => ({
  onSetValidationMessages: data => dispatch(setValidationMessages(data)),
  onResetValidationMessages: data => dispatch(resetValidationMessages(data)),
  onLogin: data => dispatch(login(data)),
  getUserSession: () => dispatch(getUserSession())
});

export default withSubmit(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(
      reducerInjector(REDUCER_NAME, loginReducer)(Login)
    )
  )
);
