import React from 'react';
import PropTypes from 'prop-types';
import 'rex-core/dist/css/rex-core.css';
import './MyComponent.scss';

export default function MyComponent({ children, onClick, text, className }) {
  return (
    <div className={className}>
      <h1>{text}</h1>
      {children}
      <button type="button" onClick={onClick}>
        Click me!
      </button>
    </div>
  );
}

MyComponent.defaultProps = {
  children: null,
  text: 'Welcome to React',
  className: 'my-component',
  onClick: () => {},
};

MyComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
