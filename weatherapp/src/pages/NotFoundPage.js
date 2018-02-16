import React from 'react';
import PropTypes from "prop-types";

const NotFoundPage = (props) => (
  <div>
      <h3>No match found for <strong>{props.location.pathname}</strong></h3>

  </div>
)


NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};
export default NotFoundPage;
