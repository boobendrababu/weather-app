import React, { Component } from 'react';
import PropTypes from "prop-types";

import trim from 'lodash/trim';
import validator from 'validator';

import SelectCityInput from '../components/SelectCityInput';
import Errors from '../components/Errors';
import Loader from '../components/Loader';
import WeatherChart from '../components/WeatherChart';

import './WeatherPageComponent.css';

class WeatherPageComponent extends Component {
  constructor(props) {
    super(props);

    // bind the event so that access to state is available
    this.onCityChange = this.onCityChange.bind(this); 
  }
  
  // set initial state
  state = {
    zipSelected: null,
    data: {
      city: {},
      chart: {}
    },
    loading: false,
    errors: null,
    cache: [],
    cities: {}
  };

  componentDidMount = () => {
    let { zip="" } = this.props.match.params;
    zip = trim(zip);
    if(!zip) {
      return;       // do nothing
    }
    if(validator.isPostalCode(zip, 'any')) {
      this.loadData(zip);
    } else {
      // set error 
      this.setState({loading: false, errors: "Invalid zip", zipSelected: null, data: {}});
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps) {
      let newZip = nextProps.match.params.zip;
      let oldZip = this.props.match.params.zip;
      
      newZip = trim(newZip);
      oldZip = trim(oldZip);

      if(oldZip !== newZip) {
        this.loadData(newZip);
      }
    }
  }

  onCityChange = (e, data) => {
    const zipSelected = trim(data.value);

    if(zipSelected === this.state.zipSelected) {
      // do nothing
      return;
    }
    this.props.history.push(`/city/${zipSelected}`);
  };

  loadData = (zipSelected) => {
    if(this.state.loading) return;
    
    this.setState({ loading: true });

    let cachedData = {};
    const cachedDataIndex = this.state.cache.findIndex((item) => (item.zip === zipSelected));
    if(cachedDataIndex === -1) { 
      // cache not found. io required

      let chartData = {};
      this.props.getWeatherForecast(zipSelected).then((weatherData)=>{
          chartData = this.convertData(weatherData.list);

          const cityInfo = { };
          cityInfo.name = weatherData.city.name;
          cityInfo.country = weatherData.city.country;
          cityInfo.coord = weatherData.city.coord;

          const newData = { city: cityInfo, chart: chartData }

          // update state with data and cache
          this.setState({loading: false, errors: null, zipSelected, data: newData, cache: this.state.cache.concat({"zip":zipSelected, weatherData: newData}) });
      }).catch((err)=>{
          let msg = "";
          if(err.response) {
            msg = err.response.data.message;
          } else {
            msg = "Unknown error";
          }
          
          // update state with errors
          this.setState({loading: false, errors: msg, zipSelected:null, data: {}});
      })      
    } else {
      cachedData = this.state.cache[cachedDataIndex];
      // use cache
      // update state with data (loaded from cache)
      this.setState({ loading: false, errors: null, zipSelected, data: cachedData.weatherData });
    }
  }  

  convertData = (rawWeatherList) => {
    const valuesAvg = [];
    const valuesMin = [];
    const valuesMax = [];

    rawWeatherList.forEach(temp => {
      const weaterDt = new Date(temp.dt_txt);
      valuesAvg.push({
        x: weaterDt,
        y: temp.main.temp
      });

      valuesMin.push({
        x: weaterDt,
        y: temp.main.temp_min
      });

      valuesMax.push({
        x: weaterDt,
        y: temp.main.temp_max
      });
    });

    const convData = [
      { label: "Avg.Temp", values: valuesAvg },
      { label: "Min.Temp", values: valuesMin },
      { label: "Min.Temp", values: valuesMax }
    ];

    return convData;
  }
  
  render() {
    const { data, errors, loading, zipSelected } = this.state;
    const { zip } = this.props.match.params;
    
    return (
      <div className="ui container center aligned">
        <div className="ui label">Zip: { zip }</div>
        
          <SelectCityInput onChange={this.onCityChange} value={zip}/>
        
          { errors && (
            <Errors errors={errors}/>
          )}

          { loading && zipSelected && (
            <Loader message="Fetching weather details..." />
          )}

          { !loading && zipSelected && data && (
            <WeatherChart data={data} />
          )}
      </div>
    );
  }
}

WeatherPageComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      zip: PropTypes.string
    })
  }),
  getWeatherForecast: PropTypes.func.isRequired
};

WeatherPageComponent.defaultProps = {
  match: {
    params: {
      zip: ""
    }
  }
}
export default WeatherPageComponent;
