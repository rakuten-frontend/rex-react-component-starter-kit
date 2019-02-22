import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
import './MyComponent.scss';

export default function MyComponent({ children, onClick, text, className }) {
  return (
    <div className={className} onClick={onClick} role="presentation">
      <h1>{text}</h1>
      {children}
    </div>
  );
}

MyComponent.defaultProps = {
  children: null,
  text: 'Welcome to React',
  className: 'my-component',
  onClick: () => null,
};

MyComponent.propTypes = {
  children: oneOfType([string, element]),
  text: string,
  className: string,
  onClick: func,
};
