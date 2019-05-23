import React, { Component } from 'react';
import { arrayOf, object, number, func, bool } from 'prop-types';

export default class CarouselTabs extends Component {
  componentDidMount() {
    this.setTabsContainerWidth();
  }

  setTabsContainerWidth() {
    const { items } = this.props;
    const tabsContainer = document.getElementsByClassName('carousel-tabs')[0];
    const tabItemWidth = document.getElementsByClassName('carousel-tab')[0]
      .clientWidth;

    tabsContainer.style.width = `${(items.length - 2) * tabItemWidth}px`;
  }

  renderTabs() {
    const { items, activeIndex, onClick } = this.props;
    const newItems = items.slice(0, -2);

    return newItems.map((item, index) => {
      const isAcive = item.id === activeIndex;

      return (
        <li
          key={item.id}
          data-tabid={index}
          className={`carousel-tab ${isAcive && 'active'}`}
          onClick={() => onClick(index)}
          onKeyDown={() => onClick(index)}
          role="presentation"
        >
          {item.tabName}
        </li>
      );
    });
  }

  render() {
    const { isFirstSlide, isLastSlide, onClick, activeIndex } = this.props;

    return (
      <div className="carousel-tabs-container">
        <div
          id="carousel-tabs-prev"
          className={`carousel-tabs-controller carousel-tabs-left-controller ${isFirstSlide &&
            'hide'}`}
          onClick={() => onClick(activeIndex - 1)}
          onKeyDown={() => onClick(activeIndex - 1)}
          role="presentation"
        >
          <i className="rex-icon chevron-left" />
        </div>
        <div className="carousel-tabs-inner">
          <ol className="carousel-tabs">{this.renderTabs()}</ol>
        </div>
        <div
          id="carousel-tabs-next"
          className={`carousel-tabs-controller carousel-tabs-right-controller ${isLastSlide &&
            'hide'}`}
          onClick={() => onClick(activeIndex + 1)}
          onKeyDown={() => onClick(activeIndex + 1)}
          role="presentation"
        >
          <i className="rex-icon chevron-right" />
        </div>
      </div>
    );
  }
}

CarouselTabs.defaultProps = {
  items: [],
  activeIndex: 0,
  onClick: () => {},
  isFirstSlide: true,
  isLastSlide: false,
};

CarouselTabs.propTypes = {
  items: arrayOf(object),
  activeIndex: number,
  onClick: func,
  isFirstSlide: bool,
  isLastSlide: bool,
};
