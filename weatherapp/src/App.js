import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";

import WeatherPage from "./pages/WeatherPage";
import NotFoundPage from './pages/NotFoundPage';

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = ({ location }) => (
  <div className="ui container">
    <Header />
    <Switch>
      <Redirect exact from="/" to="/city" />
      <Route location={location} path="/city/:zip?" component={WeatherPage} />    
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
