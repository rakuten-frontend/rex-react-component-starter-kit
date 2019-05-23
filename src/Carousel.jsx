import React from 'react';
import { string, func, element, oneOfType, arrayOf } from 'prop-types';
import './Carousel.scss';

export default function Carousel({ children, onClick, text, className }) {
  return (
    <div className={className} onClick={onClick} role="presentation">
      <h1>{text}</h1>
      {children}
    </div>
  );
}

Carousel.defaultProps = {
  children: null,
  text: 'Welcome to React',
  className: 'rex-carousel',
  onClick: () => null,
};

Carousel.propTypes = {
  children: oneOfType([string, element, arrayOf(element)]),
  text: string,
  className: string,
  onClick: func,
};
