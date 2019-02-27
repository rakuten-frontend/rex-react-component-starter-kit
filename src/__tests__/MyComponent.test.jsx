import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '../MyComponent';

describe('[MyComponent]', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MyComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render properties', () => {
    const mycomponent = shallow(<MyComponent text="Hello Jest Test!" />);
    expect(mycomponent.text()).toBe('Hello Jest Test!');
  });
});
