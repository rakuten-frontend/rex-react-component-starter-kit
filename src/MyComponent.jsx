import React from 'react';
import PropTypes from 'prop-types';
import 'rex-core';
import './MyComponent.scss';

export default function MyComponent({
  children,
  onClick,
  text,
  className
}) {

  return (
    <div className={className} onClick={onClick}>
      <h1>{text}</h1>
      {children}
    </div>
  );
};

MyComponent.defaultProps = {
  text: 'Welcome to React',
  className: 'my-component',
  onClick: () => { }
};

MyComponent.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string, 
  onClick: PropTypes.func
};
