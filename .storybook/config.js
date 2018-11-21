import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'ReX Storybook',
    url: 'https://github.com/rakuten-frontend'
  })
);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);