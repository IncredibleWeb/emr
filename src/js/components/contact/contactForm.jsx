import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form/immutable";
import { Link } from "react-router-dom";

import TextBox from "../form/textBox";
import textAreaField from "../form/textArea";

const ContactForm = ({
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
    <section className="card contact-form">
      <h1 className="text-center">Contact</h1>
      <form
        onSubmit={handleSubmit}
        action={action}
        method={method}
        className="form"
      >
        <Field
          name="name"
          label="Your name"
          component={TextBox}
          type="text"
          className="form-field material single"
          messages={messages.name}
        />
        <Field
          name="email"
          label="Your email address"
          component={TextBox}
          type="email"
          className="form-field material single"
          messages={messages.email}
        />
        <Field
          name="phone"
          label="Your phone number"
          component={TextBox}
          type="text"
          className="form-field material single"
          messages={messages.phone}
        />
        <Field
          name="message"
          label="Your message"
          component={textAreaField}
          className="form-field material single"
          messages={messages.message}
          rows="5"
        />
        <div className="form-field single buttons">
          <input
            type="submit"
            value="Send"
            className="button"
            disabled={submitting}
          />
        </div>
      </form>
    </section>
  );
};

ContactForm.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  action: PropTypes.string,
  method: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isEdit: PropTypes.bool
};

export default reduxForm({
  form: "contactForm",
  enableReinitialize: true
})(ContactForm);
