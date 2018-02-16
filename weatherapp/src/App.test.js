import React from "react";
import ReactDOM from "react-dom";
import { Route, MemoryRouter } from "react-router-dom";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from "./App";
import NotFoundPage from './pages/NotFoundPage';
import WeatherPage from './pages/WeatherPage';

describe('App', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  it("renders without crashing on default path", () => {
    const divElt = document.createElement("div");

    ReactDOM.render(
      <MemoryRouter>
        <div>
          <Route component={App} />
        </div>
      </MemoryRouter>,
      divElt
    );
    ReactDOM.unmountComponentAtNode(divElt);
  });

  it('renders Weather page by default', () => {
    const location = {
      pathname: ""
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App location={location}/>
      </MemoryRouter>
    );
    expect(wrapper.find(WeatherPage)).toHaveLength(1);
    expect(wrapper.find(NotFoundPage)).toHaveLength(0);
    wrapper.unmount();
  });

  it('renders Not Found Page on invalid path', () => {
    const location = {
      pathname: ""
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/pages/random' ]}>
        <App location={location}/>
      </MemoryRouter>
    );
    expect(wrapper.find(WeatherPage)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
    wrapper.unmount();
  });
});
