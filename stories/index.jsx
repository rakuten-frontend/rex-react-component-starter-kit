/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
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

// Stories
stories.add('default', () => <Carousel />);
stories.add('with text', () => <Carousel text="Welcome to React example" />);
stories.add('with className', () => (
  <Carousel className="color-black active" />
));

stories.add('with onClick', () => {
  const onClickSample = action('clicked');

  return <Carousel onClick={onClickSample} />;
});

stories.add('with children', () => (
  <Carousel>
    <p>Hello World</p>
  </Carousel>
));

stories.add('with dynamic props', () => {
  const textWelcome = text('text', 'Welcome to Dynamic React');

  return <Carousel text={textWelcome} />;
});
