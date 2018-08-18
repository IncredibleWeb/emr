import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form/immutable";

import TextBox from "../form/textBox";

const ForgotPasswordForm = ({
  initialValues,
  action,
  method,
  url,
  handleSubmit,
  onCancel,
  pristine,
  submitting,
  messages
}) => {
  return (
    <section className="card">
      <h1>Forgot Password</h1>
      <form
        onSubmit={handleSubmit}
        action={action}
        method={method}
        className="form"
      >
        <Field
          label="Enter your email address:"
          name="email"
          component={TextBox}
          type="email"
          className="form-field material single"
          messages={messages.email}
        />
        <div className="form-field single buttons">
          <input
            type="submit"
            value="reset"
            className="button"
            disabled={submitting}
          />
        </div>
      </form>
    </section>
  );
};

ForgotPasswordForm.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  action: PropTypes.string,
  method: PropTypes.string,
  isEdit: PropTypes.bool
};

export default reduxForm({
  form: "forgotPasswordForm"
})(ForgotPasswordForm);
