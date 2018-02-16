import React from "react";
import PropTypes from "prop-types";
import { Message, Icon} from "semantic-ui-react";

const Loader = ({message}) => (
  <Message icon>
    <Icon name="circle notched" loading />
    <Message.Header>{message}</Message.Header>
  </Message>
);

Loader.propTypes = {
  message: PropTypes.string.isRequired
};

export default Loader;
