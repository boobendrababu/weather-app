import axios from "axios";

export default {
  weather: {
    fetch5DayForecast: (zip) => {
      const defaultUnits = "metric";
      const uri = `${process.env.REACT_APP_WEATHER_URL_BASE}?zip=${zip}&APPID=${process.env.REACT_APP_WEATHER_APP_ID}&units=${defaultUnits}`;

      return axios.get(uri).then(res => res.data);
    }
  }
};
