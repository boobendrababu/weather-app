import React from "react";
import Enzyme,  { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WeatherPageComponent from './WeatherPageComponent';
import WeatherChart from '../components/WeatherChart';
import SelectCityInput from '../components/SelectCityInput';
import Errors from "./Errors";

import myData from '../data/sample.json';

const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

describe('WeatherPageComponent', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  it('renders errors on invalid zip', () => {
    const history =  {
      push: () => {} 
    }
    const match = {
      params: { 
        zip: "invalid-zip"
      }
    }

    const mockGetWeatherForecast = jest.fn();
    const wrapper = mount((
      <WeatherPageComponent history={history} match={match} getWeatherForecast={mockGetWeatherForecast}/>
    ));
    
    // error should be displayed
    expect(wrapper.find(Errors)).toHaveLength(1);
    // function should not be called if invalid zip is passed
    expect(mockGetWeatherForecast.mock.calls.length).toBe(0);
    wrapper.unmount();
  });

  it('renders without error on empty zip', () => {
    const history =  {
      push: () => {} 
    }
    const match = {
      params: { 
        zip: ""
      }
    }

    const mockGetWeatherForecast = jest.fn();
    const wrapper = mount((
      <WeatherPageComponent history={history} match={match} getWeatherForecast={mockGetWeatherForecast}/>
    ));
    
    // error should not be displayed
    expect(wrapper.find(Errors)).toHaveLength(0);
    // function should not be called if invalid zip is passed
    expect(mockGetWeatherForecast.mock.calls.length).toBe(0);
    wrapper.unmount();
  });

  it('renders chart on valid zip given in path', async () => {
    const history =  {
      push: () => {} 
    }
    const match = {
      params: { 
        zip: "10025"
      }
    }

    const mockGetWeatherForecast = jest.fn(() => Promise.resolve(myData));
    const wrapper = mount(
      <WeatherPageComponent history={history} match={match} getWeatherForecast={mockGetWeatherForecast}/>
    );
    await Promise.resolve(); // added it
    
    wrapper.update();
    
    expect(mockGetWeatherForecast.mock.calls.length).toBe(1);
    expect(wrapper.find(SelectCityInput)).toHaveLength(1);
    expect(wrapper.find(WeatherChart)).toHaveLength(1);
    expect(wrapper.find(Errors)).toHaveLength(0);

    wrapper.unmount();
  });

  it('browser path is updated on selection of zip', async () => {
    // Note: test whether history.push() is called when city is changed. 
    const mockPush = jest.fn();
    const history =  {
      push: mockPush
    }
    const match = {
      params: { 
        zip: ""
      }
    }

    const mockGetWeatherForecast = jest.fn(() => Promise.resolve(myData));
    const wrapper = mount(
      <WeatherPageComponent history={history} match={match} getWeatherForecast={mockGetWeatherForecast}/>
    );
    
    wrapper.instance().onCityChange(null, { value: "10025" })
    
    await Promise.resolve().then(delay(1));
    
    wrapper.update();
    
    expect(mockPush.mock.calls.length).toBe(1);
    
    wrapper.unmount();
  });

  it('renders error on io exception and no chart is rendered', async () => {
    const history =  {
      push: () => {} 
    }
    const match = {
      params: { 
        zip: "10025"
      }
    }

    const errResponse = {};
    const mockGetWeatherForecast = jest.fn(() => Promise.reject(errResponse));
    const wrapper = mount(
      <WeatherPageComponent history={history} match={match} getWeatherForecast={mockGetWeatherForecast}/>
    );

    await Promise.resolve().then(delay(1));
    wrapper.update();
    
    expect(mockGetWeatherForecast.mock.calls.length).toBe(1);
    expect(wrapper.find(SelectCityInput)).toHaveLength(1);
    expect(wrapper.find(WeatherChart)).toHaveLength(0);
    expect(wrapper.find(Errors)).toHaveLength(1);
    wrapper.unmount();
  });

});