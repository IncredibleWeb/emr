import React from "react";
import PropTypes from "prop-types";
import Awesomplete from "awesomplete";
import ExecutionEnvironment from "exenv";

// This extends PureComponent instead of functional component because we need to use componentDidMount
class AutoCompleteTextBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      canUseDOM: false,
      initialized: false
    };

    this.init = this.init.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.categories.length !== this.props.categories.length ||
      prevState.canUseDOM !== this.state.canUseDOM
    ) {
      if (
        !this.state.initialized &&
        this.state.canUseDOM &&
        this.props.categories &&
        this.props.categories.length
      ) {
        this.init(this.props.categories);
      }
    }
  }

  componentDidMount() {
    this.setState({
      canUseDOM: ExecutionEnvironment.canUseDOM
    });

    if (!this.state.initialized && this.state.canUseDOM) {
      this.init(this.props.categories);
    }
  }

  render() {
    const {
      type = "text",
      input,
      label,
      className,
      readOnly,
      disabled,
      messages,
      meta: { touched, error }
    } = this.props;

    return (
      <div
        className={
          "form-field material autocomplete" +
          (` ${className}` || "") +
          (messages && messages.length > 0 ? " invalid" : "")
        }
      >
        <input
          type={type}
          className={"has-value"}
          {...input}
          readOnly={readOnly}
          disabled={disabled}
          data-multiple
          ref={n => {
            this.element = n;
          }}
        />
        <span className="bar" />
        <label htmlFor={input.name}>
          <span>{label}</span>
        </label>
        {messages &&
          messages.map((n, index) => {
            return (
              <span key={index} className="error-message">
                {n.message}
              </span>
            );
          })}
      </div>
    );
  }

  init(categories) {
    this.setState({ initialized: true });

    const list = categories.filter(n => n).map(n => n.data);

    new Awesomplete(this.element, {
      list: list,
      replace: function(text) {
        this.input.value = text;
      },
      minChars: 0
    });
  }
}

AutoCompleteTextBox.propTypes = {
  label: PropTypes.string.isRequired
};
export default AutoCompleteTextBox;
