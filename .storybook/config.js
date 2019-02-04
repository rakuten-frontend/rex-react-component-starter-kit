import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { name, repository } from '../package.json';
import { themes } from '@storybook/components';

const rex = themes.normal;
rex.mainBackground = '#F7F7F7';
rex.mainTextColor = '#333333';
rex.dimmedTextColor = '#4D4D4D';
rex.highlightColor = '#BF0000';

addDecorator(
  withOptions({
    name: name,
    url: repository.url,
    theme: rex,
  })
);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);