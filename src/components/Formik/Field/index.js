import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";
// import { formatCurrency } from '../../../commons/utils';
import NumberFormat from "react-number-format";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
      thousandSeparator: false,
    };
  }

  toCurrency(number) {
    if (number == null) {
      return 0;
    }
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  render() {
    const {
      touched,
      errors,
      leftImage,
      name,
      type,
      placeholder,
      value,
      onChange,
      className,
      classLabel,
      label,
      maxLength,
      isFormat,
      defaultValue,
      onBlur,
      format,
      isNumericString,
      thousandSeparator,
      decimalSeparator,
      mask,
      thousandsGroupStyle,
      decimalScale,
      fixedDecimalScale,
      suffix,
      disabled,
      multiple,
    } = this.props;
    return (
      <React.Fragment>
        {label ? <div className={classLabel}>{label}</div> : null}
        <div className="input">
          {isFormat === true ? (
            <NumberFormat
              className={className}
              name={name}
              type={type}
              onBlur={onBlur}
              value={this.state.valueInput}
              placeholder={placeholder}
              defaultValue={defaultValue}
              isNumericString={isNumericString}
              thousandSeparator={thousandSeparator}
              thousandsGroupStyle={thousandsGroupStyle}
              format={format}
              decimalScale={decimalScale}
              decimalSeparator={decimalSeparator}
              fixedDecimalScale={fixedDecimalScale}
              suffix={suffix}
              onValueChange={(vals) => {
                this.setState({ valueInput: vals.formattedValue });
              }}
              mask={mask}
              {...this.props}
            />
          ) : (
            <input
              name={name}
              maxLength={maxLength}
              type={type}
              style={{
                paddingLeft: leftImage ? "45px" : "12px",
              }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={className}
              disabled={disabled}
              multiple={multiple}
              // numberOfLine={7}
            />
          )}

          {touched[name] && errors[name] && (
            <div className="errorInput">{errors[name]}</div>
          )}
          {leftImage ? (
            <img className="img-email" src={leftImage} alt={name} />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
index.defaultProps = {
  type: "text",
  className: "field",
  classLabel: "classLabel",
  isFormat: false,
  defaultValue: "",
  isNumericString: false,
  fixedDecimalScale: false,
};

index.propTypes = {
  touched: PropTypes.object,
  errors: PropTypes.object,
  leftImage: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  classLabel: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  isMoney: PropTypes.bool,
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func,
  format: PropTypes.string,
  isNumericString: PropTypes.bool,
  thousandSeparator: PropTypes.string,
  decimalSeparator: PropTypes.string,
  mask: PropTypes.string,
  thousandsGroupStyle: PropTypes.object,
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool,
  suffix: PropTypes.bool,
  disabled: PropTypes.string,
};

export default index;
