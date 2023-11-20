import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplePayButton from '../src/index';

describe('ApplePayButton', () => {
  test('renders ApplePayButton component', () => {
    render(<ApplePayButton buttonStyle="black" type="plain" locale="en_US" />);
    const applePayButton = document.querySelector('apple-pay-button');
    expect(applePayButton).toBeInTheDocument();
  });
});