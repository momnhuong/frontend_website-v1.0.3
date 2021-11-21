import React, { Component } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      Circle,
      label,
      onChange,
      checked,
      name,
      value,
      touched,
      errors,
      className
    } = this.props;

    return (
      <div className={className}>
        <label className='action-selectAll'>
          {label}
          <input
            name={name}
            type='checkbox'
            value={value}
            onChange={onChange}
            checked={checked}
          />
          <span className={Circle === false ? 'checkAll' : 'checkCircle'} />
        </label>
        {touched && errors && name && touched[name] && errors[name] && (
          <div className='errorInput'>{errors[name]}</div>
        )}
      </div>
    );
  }
}
index.defaultProps = {
  Circle: false,
  label: '',
  className: 'item-checkAll'
};
index.propTypes = {
  Circle: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  className: PropTypes.string
};

export default index;
