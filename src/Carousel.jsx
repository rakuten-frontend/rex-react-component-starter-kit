import React, { Component } from 'react';
import { node, shape, number, string, arrayOf, func, bool } from 'prop-types';
import './Carousel.scss';
import 'swiper/dist/css/swiper.css';
import Swiper from 'react-id-swiper';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import CarouselTabs from './CarouselTabs';
import CarouselItem from './CarouselItem';
import 'rex-icons';

class Carousel extends Component {
  constructor(props) {
    super(props);

    const { items, isTabActive } = this.props;

    this.state = {
      swiper: null,
      activeIndex: 0,
      visibleTabsNum: 0,
      hiddenNextTabsNum: 0,
      hiddenPrevTabsNum: 0,
      currentTabsPos: 0,
      itemsLength: items.length - 2,
      isTabActive,
    };

    this.goToIndex = this.goToIndex.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  componentDidMount() {
    this.calculateVisibleTabs();
  }

  onSlideChange() {
    const { swiper, activeIndex } = this.state;
    const swiperActiveIndex = swiper.activeIndex;
    const tabsInnnerContainer = document.getElementsByClassName(
      'carousel-tabs'
    )[0];

    if (!tabsInnnerContainer) return;

    if (swiperActiveIndex === activeIndex + 1) {
      this.showNextTab();
    } else if (swiperActiveIndex === activeIndex - 1) {
      this.showPrevTab();
    } else {
      this.showIndexTab(swiperActiveIndex);
    }

    this.setState({
      activeIndex: swiperActiveIndex,
    });
  }

  calculateVisibleTabs() {
    const tabsContainer = document.getElementsByClassName(
      'carousel-tabs-inner'
    )[0];

    if (!tabsContainer) return;

    const { itemsLength } = this.state;
    const tabsContainerWidth = tabsContainer.clientWidth;
    const tabItemWidth = document.getElementsByClassName('carousel-tab')[0]
      .clientWidth;
    const visibleTabsNum = Math.floor(tabsContainerWidth / tabItemWidth);
    const hiddenNextTabsNum = itemsLength - visibleTabsNum;

    this.setState({
      visibleTabsNum,
      hiddenNextTabsNum,
    });
  }

  showNextTab() {
    const {
      visibleTabsNum,
      hiddenPrevTabsNum,
      hiddenNextTabsNum,
      currentTabsPos,
      activeIndex,
    } = this.state;

    // At showing hidden next tabs
    if (activeIndex > visibleTabsNum - 2) {
      const tabsInnnerContainer = document.getElementsByClassName(
        'carousel-tabs'
      )[0];
      const tabItemWidth = document.getElementsByClassName('carousel-tab')[0]
        .clientWidth;
      let nextTabsPos = currentTabsPos - tabItemWidth;

      // At last tab, calculate hidden left width and only move the length
      if (hiddenNextTabsNum === 1) {
        const tabsOuterContainer = document.getElementsByClassName(
          'carousel-tabs-inner'
        )[0];
        const tabsOuterContainerRightPos = tabsOuterContainer.getBoundingClientRect()
          .right;
        const tabInnerContainerRightPos = tabsInnnerContainer.getBoundingClientRect()
          .right;
        const rightLength =
          tabInnerContainerRightPos - tabsOuterContainerRightPos;

        nextTabsPos = currentTabsPos - rightLength - 10;
      }

      tabsInnnerContainer.style.transform = `translateX(${nextTabsPos}px)`;

      this.setState({
        hiddenNextTabsNum: hiddenNextTabsNum - 1,
        hiddenPrevTabsNum: hiddenPrevTabsNum + 1,
        currentTabsPos: nextTabsPos,
      });
    }
  }

  showPrevTab() {
    const {
      activeIndex,
      hiddenNextTabsNum,
      hiddenPrevTabsNum,
      currentTabsPos,
      visibleTabsNum,
      itemsLength,
    } = this.state;

    // At showing hidden left tabs
    if (currentTabsPos < 0) {
      const tabsContainer = document.getElementsByClassName('carousel-tabs')[0];
      const tabItemWidth = document.getElementsByClassName('carousel-tab')[0]
        .clientWidth;
      const absCurrentTabsPos = Math.abs(currentTabsPos);
      let nextTabsPos;

      // At last tab
      if (activeIndex === itemsLength - 1) {
        nextTabsPos = -(tabItemWidth + 20);
      } else if (absCurrentTabsPos < tabItemWidth) {
        nextTabsPos = 0;
      } else {
        nextTabsPos = currentTabsPos + tabItemWidth;
      }

      tabsContainer.style.transform = `translateX(${nextTabsPos}px)`;

      this.setState({
        hiddenNextTabsNum: hiddenNextTabsNum + 1,
        hiddenPrevTabsNum: hiddenPrevTabsNum - 1,
        currentTabsPos: nextTabsPos,
      });

      if (activeIndex === 0) {
        this.setState({
          hiddenPrevTabsNum: 0,
          hiddenNextTabsNum: itemsLength - visibleTabsNum,
        });
      }
    }
  }

  showIndexTab(index) {
    const { items } = this.props;
    const {
      visibleTabsNum,
      hiddenPrevTabsNum,
      hiddenNextTabsNum,
      currentTabsPos,
    } = this.state;
    const tabsContainer = document.getElementsByClassName('carousel-tabs')[0];
    const tabItemWidth = document.getElementsByClassName('carousel-tab')[0]
      .clientWidth;
    let nextTabsPos;

    if (index > visibleTabsNum) {
      // If clicked indicator is larger than hidden next tabs
      nextTabsPos = -((index - visibleTabsNum) * tabItemWidth);

      this.setState({
        currentTabsPos: nextTabsPos,
        hiddenNextTabsNum: items.length - index,
        hiddenPrevTabsNum: index - visibleTabsNum,
      });
    } else if (index <= hiddenPrevTabsNum) {
      // If clicked indicator is less than equal hidden prev tabs
      const isPrevOne = index === hiddenPrevTabsNum;

      nextTabsPos =
        isPrevOne && hiddenPrevTabsNum > 0
          ? currentTabsPos + tabItemWidth
          : -(index * tabItemWidth);

      this.setState({
        currentTabsPos: nextTabsPos,
        hiddenNextTabsNum: isPrevOne
          ? hiddenNextTabsNum - 1
          : items.length - visibleTabsNum - index,
        hiddenPrevTabsNum: index,
      });
    }

    tabsContainer.style.transform = `translateX(${nextTabsPos}px)`;
  }

  goToIndex(index) {
    const { swiper } = this.state;

    if (swiper) {
      swiper.slideTo(index);
      this.setState({
        activeIndex: index,
      });
    }
  }

  render() {
    const { activeIndex, itemsLength, isTabActive } = this.state;
    const { items } = this.props;
    const isFirstSlide = activeIndex === 0;
    const isLastSlide = activeIndex === itemsLength - 1;
    const isMobile = window.innerWidth < 576;
    const params = {
      modules: [Pagination, Navigation],
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next.rex-icon.chevron-right',
        prevEl: '.swiper-button-prev.rex-icon.chevron-left',
      },
      slidesPerView: isMobile ? 1 : 3,
      spaceBetween: isMobile ? 0 : 4,
      shouldSwiperUpdate: true,
      on: {
        slideChange: this.onSlideChange,
      },
    };

    const renderItems = () =>
      items.map((item, index) => (
        <CarouselItem
          key={item.id}
          id={item.id}
          itemId={index}
          title={item.title}
          caption={item.caption}
          src={item.src}
        />
      ));

    const setSwiper = swiperInstance => {
      this.setState({
        swiper: swiperInstance,
      });
    };

    return (
      <div className="swiper-main-container">
        {isTabActive && (
          <CarouselTabs
            items={items}
            onClick={this.goToIndex}
            activeIndex={activeIndex}
            isFirstSlide={isFirstSlide}
            isLastSlide={isLastSlide}
          />
        )}
        <Swiper
          {...params}
          getSwiper={swiperInstance => setSwiper(swiperInstance)}
          modules={[Navigation, Pagination]}
        >
          {renderItems(items)}
        </Swiper>
      </div>
    );
  }
}

Carousel.defaultProps = {
  items: node,
  goToIndex: () => {},
  isTabActive: false,
};

Carousel.propTypes = {
  items: arrayOf(
    shape({
      id: number,
      src: string,
      title: string,
      caption: string,
      tabName: string,
    })
  ),
  goToIndex: func,
  isTabActive: bool,
};

export default Carousel;
