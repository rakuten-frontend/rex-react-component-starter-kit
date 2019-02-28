import { shallow } from 'enzyme';
import React from 'react';
import MyComponent from '../MyComponent';

describe('<MyComponent />', () => {
  let params;
  let makeSubject;
  beforeAll(() => {
    params = {
      text: 'Hello ReX React Component Starter Kit!!',
    };

    makeSubject = (props = params, children) =>
      shallow(<MyComponent {...props}>{children}</MyComponent>);
  });
  beforeEach(() => {});

  it('should match snapshot', () => {
    const component = makeSubject();
    expect(component.html()).toMatchSnapshot();
  });

  it('should render props', () => {
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

    component.simulate('click');
    expect(clickHandler).toHaveBeenCalled();
  });

  it('should render a child', () => {
    const component = makeSubject({}, <div>nono</div>);
    expect(component.contains(<div>nono</div>)).toBe(true);

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
