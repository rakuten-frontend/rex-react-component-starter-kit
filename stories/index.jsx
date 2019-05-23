/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { withInspectHtml } from 'storybook-inspecthtml';
import CenterDecorator from '../.storybook/centerDecorator';
import 'rex-core';

const Carousel =
  process.env.NODE_ENV === 'production'
    ? require('../build/node_modules/rex-carousel').default
    : require('../src/Carousel').default;

const stories = storiesOf('Carousel', module);
stories.addDecorator(withInspectHtml);
stories.addDecorator(CenterDecorator);
stories.addDecorator(checkA11y);
stories.addDecorator(withKnobs);

const items = [
  {
    id: 0,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item A',
  },
  {
    id: 1,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item B',
  },
  {
    id: 2,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item C',
  },
  {
    id: 3,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item D',
  },
  {
    id: 4,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item E',
  },
  {
    id: 5,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item F',
  },
  {
    id: 6,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item G',
  },
  {
    id: 7,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item H',
  },
  {
    id: 8,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item I',
  },
  {
    id: 9,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item J',
  },
  {
    id: 10,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item K',
  },
  {
    id: 11,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item L',
  },
  {
    id: 12,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item M',
  },
  {
    id: 13,
    src: 'https://picsum.photos/376/200',
    title: 'Sagano Bamboo Forest',
    caption: 'Located in Kyoto, Japan',
    tabName: 'Item N',
  },
];

// Stories
stories.add('default Carousel', () => <Carousel items={items} />);
stories.add('withTabs Carousel', () => <Carousel items={items} isTabActive />);