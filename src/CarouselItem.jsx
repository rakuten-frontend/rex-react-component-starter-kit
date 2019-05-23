import React from 'react';
import { bool, string, number } from 'prop-types';
import { composeClassName } from 'rex-react-utils';

const CarouselItem = ({ id, src, title, caption, itemId }) => {
  const itemClass = id === 1 && 'isActive';
  const classes = composeClassName([itemClass, 'swiper-slide']);

  return (
    <div
      {...classes}
      role="presentation"
      style={{ backgroundImage: `url(${src})` }}
      data-itemid={itemId}
    >
      <div className="carousel-item-description">
        <div className="carousel-item-title">{title}</div>
        <div className="carousel-item-caption">{caption}</div>
      </div>
    </div>
  );
};

CarouselItem.defaultProps = {
  isActive: false,
  id: 1,
  src: '',
  title: 'Add title here',
  caption: 'Add caption here',
  itemId: 1,
};

CarouselItem.propTypes = {
  isActive: bool,
  id: number,
  src: string,
  title: string,
  caption: string,
  itemId: number,
};

export default CarouselItem;
