import React from 'react';
import ApplePayButton, { type ApplePayButtonProps } from '../index';
import { type Meta, type StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'Components/ApplePayButton',
  component: ApplePayButton,
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: ['black', 'white', 'white-outline']
    },
    type: {
      control: 'select',
      options: [
        'plain',
        'add-money',
        'book',
        'buy',
        'check-out',
        'continue',
        'contribute',
        'donate',
        'order',
        'pay',
        'reload',
        'rent',
        'set-up',
        'subscribe',
        'support',
        'tip',
        'top-up'
      ]
    },
    locale: {
      control: 'text'
    },
    onClick: { action: 'clicked' }
  }
};

export default meta;

const Template: StoryFn<ApplePayButtonProps> = (args: ApplePayButtonProps) => (
  <div>
    <ApplePayButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  buttonStyle: 'black',
  type: 'buy',
  locale: 'en-US',
  style: {
    width: '200px',
    height: '32px',
    boxSizing: 'content-box'
  },
  onClick: action('onClick')
};

export const White = Template.bind({});
White.args = {
  ...Default.args,
  buttonStyle: 'white'
};

export const WhiteOutline = Template.bind({});
WhiteOutline.args = {
  ...Default.args,
  buttonStyle: 'white-outline'
};
