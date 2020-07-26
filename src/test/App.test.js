import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from '../components/app';
import {describe, expect, it} from "@jest/globals";
import thunk from 'redux-thunk'

const middlewares = [thunk]
configure({adapter: new Adapter()});
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe("App", () => {
  it("should render my component", () => {
    const wrapper = shallow(
        <Provider store={store}>
          <App />
        </Provider>);
  });
});
