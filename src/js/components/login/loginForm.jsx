import React from "react";
import { Field, reduxForm } from "redux-form/immutable";
import { Link } from "react-router-dom";

import TextBox from "../form/textBox";
import CheckBox from "../form/checkBox";

const LoginForm = ({
  action,
  method,
  messages,
  handleSubmit,
  submitting,
  change,
  authFailureMessage
}) => {
  return (
    <section className="login-form">
      <form
        onSubmit={handleSubmit}
        action={action}
        method={method}
        className="form"
      >
        <div className="login-form__section">
          <Field
            name="userName"
            label="User Name *"
            component={TextBox}
            type="text"
            messages={messages.userName}
            autoComplete="user-name"
            material={true}
            className="single"
            isAlwaysOpen={true}
          />
          <Field
            name="password"
            label="Password *"
            component={TextBox}
            type="password"
            messages={messages.password}
            autoComplete="password"
            material={true}
            className="single"
            isAlwaysOpen={true}
          />
        </div>
        <div className="login-form__section">
          <Field
            name="rememberMe"
            label="Remember me"
            component={CheckBox}
            autoComplete="password"
          />
        </div>

        {authFailureMessage && (
          <div className="login-form__error-section">
            <span className="form-field__error-message login-form__error-section__error-message">
              {authFailureMessage}
            </span>
          </div>
        )}

        <div className="form-field form-field--single form__buttons form__buttons--right">
          <input
            type="submit"
            value="Login"
            className="form__buttons__button button"
            disabled={submitting}
          />
        </div>
        <div className="register-link">
          <Link to="/register/" title="Register" className="form-field">
            Not registered yet?
          </Link>
          <Link
            to="/forgot-password/"
            title="Forgot password"
            className="form-field register-link--right"
          >
            Forgot password
          </Link>
        </div>
      </form>
    </section>
  );
};

export default reduxForm({
  form: "loginForm",
  enableReinitialize: true
})(LoginForm);
