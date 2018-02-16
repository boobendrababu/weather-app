import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const Errors = ({errors}) => (
  <div>
    {errors && (
      <Message negative>
        <Message.Header>Something went wrong</Message.Header>
        <p>{errors}</p>
      </Message>
    )}
  </div>
);

Errors.propTypes = {
  errors: PropTypes.string.isRequired
};

export default Errors;


