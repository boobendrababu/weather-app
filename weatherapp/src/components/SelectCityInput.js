import React from "react";
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import cityOptions from '../data/cities.json';

const SelectCityInput = ({onChange, value}) => (
  <Form>
    <Dropdown
      selection
      search
      fluid
      placeholder="Select City"
      options={cityOptions}
      onChange={onChange}
      value={value}
    />
  </Form>
);

SelectCityInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

SelectCityInput.defaultProps = {
  value: ""
}
export default SelectCityInput;


