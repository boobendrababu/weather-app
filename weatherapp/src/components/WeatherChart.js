import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import { LineChart } from 'react-d3-components';

const WeatherChart = ({data}) => (
  <Segment padded>
      { data.city && (
          <div className="ui label">
            <i className="marker icon" />{ data.city.name }
          </div>
      )}
      { data.chart && (
        <LineChart            
          data={data.chart}
          width={1000}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          
          xAxis={{label: "Date"}}
          yAxis={{label: "Temperature"}}
          />
      )}        
  </Segment>
);

WeatherChart.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    chart: PropTypes.arrayOf(PropTypes.shape({
      
    }).isRequired,).isRequired,
  }).isRequired
};
export default WeatherChart;


