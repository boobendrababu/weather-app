import { compose, withProps } from 'recompose';

import WeatherPageComponent from '../components/WeatherPageComponent';

import api from "../data/api";

export default compose(
  withProps(() => ({
        getWeatherForecast: api.weather.fetch5DayForecast    
  }))
)(WeatherPageComponent)
