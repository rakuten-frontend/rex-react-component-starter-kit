import { shallow } from 'enzyme';
import React from 'react';
import MyComponent from '../MyComponent';

describe('<MyComponent />', () => {
  const params = {
    text: 'Hello ReX React Component Starter Kit!!',
  };
  const makeSubject = (props, children) =>
    shallow(<MyComponent {...props}>{children}</MyComponent>);

  beforeEach(() => {
    jest.resetModules();
  });

  it('should match snapshot', () => {
    const component = makeSubject(params);
    expect(component.html()).toMatchSnapshot();
  });

  it('should render default-props', () => {
    const component = makeSubject();

    // Text
    expect(component.text()).toBe('Welcome to React');
    // className
    expect(component.hasClass('my-component')).toBe(true);
    // click, no side-effect
    const clickedComponent = component.simulate('click');
    expect(clickedComponent).toBe(component);
  });

  it('should render passed props', () => {
    const component = makeSubject({
      text: 'Hello Jest Test!!',
      className: 'my-custom-class',
    });

    // Text
    expect(component.text()).toBe('Hello Jest Test!!');
    // className
    expect(component.hasClass('my-custom-class')).toBe(true);
  });

  it('simulate click event', () => {
    const clickHandler = jest.fn();
    const component = makeSubject({
      onClick: clickHandler,
    });

    component.find('div').simulate('click');
    expect(clickHandler).toHaveBeenCalled();
  });

  it('should render a child', () => {
    const component = makeSubject(params, <div>child</div>);
    expect(component.contains(<div>child</div>)).toBe(true);

    // Same as above:
    const wrapper = shallow(
      <MyComponent>
        <p className="child">I am a child</p>
      </MyComponent>
    );
    expect(
      wrapper.containsAllMatchingElements([
        <p className="child">I am a child</p>,
      ])
    ).toBe(true);
  });

  // MEMO: Now multiple-children is not allowed
  // it('should render children', () => {
  //   const wrapper = shallow(
  //     <MyComponent>
  //       <p className="child">I am a child</p>
  //       <span className="child">I am a child, too</span>
  //     </MyComponent>
  //   );
  //   expect(
  //     wrapper.containsAllMatchingElements([
  //       <p className="child">I am a child</p>,
  //       <span className="child">I am a child, too</span>,
  //     ])
  //   ).toBe(true);
  // });
});
