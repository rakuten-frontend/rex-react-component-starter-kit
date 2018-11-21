import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import { host } from 'storybook-host';

const MyComponent = (
  process.env.NODE_ENV === 'production' ? 
  require('../build/node_modules/rex-react-component-starter-kit').default  : 
  require('../src/MyComponent').default
);

storiesOf('MyComponent', module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .addDecorator(
    host({
      align: 'center bottom',
      height: '80%',
      width: 425,
    }),
  )
  .add('default', () => <MyComponent />)
  .add('with text', () => <MyComponent text={'Welcome to React example'} />)
  .add('with className', () => <MyComponent className={'color-black active'} />)
  .add('with onClick', () => {
    const onClickSample = action('clicked');

    return (
      <MyComponent onClick={onClickSample} />
    );
  })
  .add('with children', () => {

    return (
      <MyComponent>
        <h2>Hello World</h2>
      </MyComponent>
    );
  })
  .add('with dynamic props', () => {

    const textWelcome = text('text', 'Welcome to Dynamic React');

    return (
      <MyComponent text={textWelcome} />
    );
  });
