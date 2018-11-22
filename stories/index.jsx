import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import { host } from 'storybook-host';

const MyComponent = (
  process.env.NODE_ENV === 'production' ?
    require('../build/node_modules/rex-react-component-starter-kit').default :
    require('../src/MyComponent').default
);

const stories = storiesOf('MyComponent', module);
stories.addDecorator(checkA11y);
stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(
  host({
    align: 'center bottom',
    height: '80%',
    width: 425,
  }),
);
// Stories
stories.add('default', () => <MyComponent />);
stories.add('with text', () => <MyComponent text={'Welcome to React example'} />);
stories.add('with className', () => <MyComponent className={'color-black active'} />);

stories.add('with onClick', () => {
  const onClickSample = action('clicked');

  return (
    <MyComponent onClick={onClickSample} />
  );
});

stories.add('with children', () => {

  return (
    <MyComponent>
      <h2>Hello World</h2>
    </MyComponent>
  );
});

stories.add('with dynamic props', () => {

  const textWelcome = text('text', 'Welcome to Dynamic React');

  return (
    <MyComponent text={textWelcome} />
  );
});
