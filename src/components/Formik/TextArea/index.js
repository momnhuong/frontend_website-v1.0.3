import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
    };
  }

  render() {
    const {
      touched,
      errors,
      rightImage,
      name,
      type,
      placeholder,
      value,
      onChange,
      className,
      classLabel,
      label,
      rows,
      disabled,
    } = this.props;
    return (
      <React.Fragment>
        {label ? <div className={classLabel}>{label}</div> : null}
        <div className="input">
          <textarea
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            rows={rows}
            onChange={onChange}
            className={className}
            disabled={disabled}
            component="textarea"
          />

          {touched[name] && errors[name] && (
            <div className="errorInput">{errors[name]}</div>
          )}
          {rightImage ? (
            <img className="img-email" src={rightImage} alt={name} />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
TextArea.defaultProps = {
  type: "text",
  className: "field",
  classLabel: "classLabel",
  defaultValue: "",
};

TextArea.propTypes = {
  touched: PropTypes.object,
  errors: PropTypes.object,
  rightImage: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  classLabel: PropTypes.string,
  label: PropTypes.string,
  isMoney: PropTypes.bool,
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func,

  mask: PropTypes.string,
  thousandsGroupStyle: PropTypes.object,
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool,
  suffix: PropTypes.bool,
  disabled: PropTypes.string,
};

export default TextArea;
