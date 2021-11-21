import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import { FormGroup, Label, FormFeedback } from "reactstrap";
import { get } from "lodash";
import { from } from "seamless-immutable";
import { ErrorMessage } from "formik";
import "./styles.css";

SelectField.PropTypes = {
  field: PropTypes.object.isRequired,
  from: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};

function SelectField(props) {
  const defaultProps = get(props, "defaultProps", {});
  const { field, form, options, label, placeholder, disabled } = props;
  const { name, value } = field;
  const selectedValue = options.find((option) => option.value === value);
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;
    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    console.log("selectedValue", selectedValue);
    field.onChange(changeEvent);
  };
  return (
    <FormGroup value="2" defaultValue="34">
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={name}
        {...field}
        defaultValue={{
          label: defaultProps.name,
          value: defaultProps.id,
          id: defaultProps.id,
          name: defaultProps.name,
        }}
        value={selectedValue}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
        className={showError ? "is-invalid" : ""}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}
export default SelectField;
