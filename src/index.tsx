import type { ElementRef, RefObject } from 'react';
import React, { useEffect, useRef } from 'react';

type ButtonType =
  | 'plain'
  | 'add-money'
  | 'book'
  | 'buy'
  | 'check-out'
  | 'continue'
  | 'contribute'
  | 'donate'
  | 'order'
  | 'pay'
  | 'reload'
  | 'rent'
  | 'set-up'
  | 'subscribe'
  | 'support'
  | 'tip'
  | 'top-up';

export interface ApplePayButtonProps {
  buttonStyle?: 'black' | 'white' | 'white-outline';
  type?: ButtonType;
  locale?: string;
  onClick?: () => void;
  style?: {
    width?: string;
    height?: string;
    borderRadius?: string;
    padding?: string;
    boxSizing?: string;
  };
  disabled?: boolean;
}

const ApplePayButton: React.FC<ApplePayButtonProps> = ({
  buttonStyle = 'black',
  type = 'buy',
  locale = 'en-US',
  onClick,
  style,
  disabled
}) => {
  const buttonRef = useRef<ElementRef<'div'>>(null);

  const handleClick = (): void => {
    if (disabled !== true && onClick !== undefined) {
      onClick();
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current !== null) {
      buttonRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (buttonRef.current !== null) {
        buttonRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [onClick, disabled]);

  const updateButtonStyle = (
    button?: Element | null,
    disabled?: boolean
  ): void => {
    const cursor = disabled === true ? 'not-allowed' : 'pointer';
    const opacity = disabled === true ? '0.5' : '1';
    button?.setAttribute('style', `cursor: ${cursor}; opacity: ${opacity};`);
  };

  useEffect(() => {
    // This workaround modifies the cursor and opacity of the button. Due to the button being rendered in a Shadow DOM,
    // we face limitations with CSS and element attributes. Direct style application from the parent element,
    // or using pseudo-classes like :hover or :disabled, is not possible.
    if (
      buttonRef.current?.shadowRoot !== null ||
      buttonRef.current?.shadowRoot !== undefined
    ) {
      const button =
        buttonRef.current?.shadowRoot?.querySelector('div > button');
      updateButtonStyle(button, disabled);
    }
  }, [disabled, buttonRef.current?.shadowRoot]);

  const createApplePayButtonStyle = (
    style?: ApplePayButtonProps['style']
  ): string => `
    apple-pay-button {
        --apple-pay-button-width: ${style?.width ?? 'auto'};
        --apple-pay-button-height: ${style?.height ?? '30px'};
        --apple-pay-button-border-radius: ${style?.borderRadius ?? '5px'};
        --apple-pay-button-padding: ${style?.padding ?? '5px 0px'};
        --apple-pay-button-box-sizing: ${style?.boxSizing ?? 'border-box'};
        /* hide the button until the shadow root is available */
        display: ${
          buttonRef.current?.shadowRoot !== null ||
          buttonRef.current?.shadowRoot !== undefined
            ? 'inline-block'
            : 'none'
        };
    }
`;

  const createApplePayButton = (
    buttonStyle: string,
    type: string,
    locale: string,
    buttonRef: RefObject<ElementRef<'div'>>
  ): React.ReactElement<
    {
      buttonstyle: string;
      type: string;
      locale: string;
      ref: RefObject<HTMLDivElement>;
    },
    string | React.JSXElementConstructor<'apple-pay-button'>
  > =>
    React.createElement('apple-pay-button', {
      buttonstyle: buttonStyle,
      type,
      locale,
      ref: buttonRef
    });

  return (
    <>
      {/* these CSS variables are used to style the button
            more details here https://applepaydemo.apple.com */}
      <style>{createApplePayButtonStyle(style)}</style>
      {/* <apple-pay-button> is not a valid JSX element
            so we need to use React.createElement() to render it
            and pass the props to it */}
      {createApplePayButton(buttonStyle, type, locale, buttonRef)}
    </>
  );
};

export default ApplePayButton;
