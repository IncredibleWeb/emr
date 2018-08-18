import React from "react";
import PropTypes from "prop-types";
import Awesomplete from "awesomplete";
import ExecutionEnvironment from "exenv";

// This extends PureComponent instead of functional component because we need to use componentDidMount
class AutocompleteDropDown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      canUseDOM: false,
      initialized: false
    };

    this.onSetId = props.onSetId;

    this.init = this.init.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.dropDownData.length !== this.props.dropDownData.length ||
      prevState.canUseDOM !== this.state.canUseDOM
    ) {
      if (
        !this.state.initialized &&
        this.state.canUseDOM &&
        this.props.dropDownData &&
        this.props.dropDownData.length
      ) {
        this.init({
          dropDownData: this.props.dropDownData,
          id: parseInt(this.props.input.value)
        });
      }
    }
  }

  componentDidMount() {
    this.setState({
      canUseDOM: ExecutionEnvironment.canUseDOM
    });

    if (!this.state.initialized && this.state.canUseDOM) {
      this.init({
        dropDownData: this.props.dropDownData,
        id: parseInt(this.props.input.value)
      });
    }
  }

  render() {
    const {
      type = "text",
      input,
      label,
      className = "",
      readOnly,
      disabled,
      messages,
      meta: { touched, error }
    } = this.props;

    return (
      <div
        className={`form-field material autocomplete ${className}
      ${messages && messages.length > 0 ? " invalid" : ""}`}
      >
        {this.state.canUseDOM && (
          <input
            type={type}
            className={"has-value"}
            readOnly={readOnly}
            disabled={disabled}
            ref={n => {
              this.element = n;
            }}
            name={input.name}
          />
        )}
        {!this.state.canUseDOM && (
          <input
            type={type}
            {...input}
            readOnly={readOnly}
            disabled={disabled}
          />
        )}
        <input value={input.value} type="hidden" />
        <span className="bar" />
        <label htmlFor={input.title}>
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

  init({ dropDownData, id }) {
    const self = this;
    self.setState({ initialized: true });
    const list = dropDownData.map(item => {
      if (item) {
        return {
          label: `${item.title}`,
          value: item.id
        };
      }
    });

    new Awesomplete(this.element, {
      minChars: 0,
      list: list,
      replace: function(text) {
        this.input.value = text;
      }
    });

    const selectedItem = list.find(n => n.value === id);

    if (selectedItem) {
      self.element.value = selectedItem.label;
    }

    self.element.addEventListener("awesomplete-select", e => {
      const value = parseInt(e.text.value);
      if (value) {
        self.onSetId(value);
      }
    });
  }
}

AutocompleteDropDown.propTypes = {
  label: PropTypes.string.isRequired
};
export default AutocompleteDropDown;
