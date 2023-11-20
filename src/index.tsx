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
}

const ApplePayButton: React.FC<ApplePayButtonProps> = ({
  buttonStyle = 'black',
  type = 'buy',
  locale = 'en-US',
  onClick,
  style
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://applepay.cdn-apple.com/jsapi/v1.1.0/apple-pay-sdk.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current !== null && onClick !== undefined) {
      buttonRef.current.addEventListener('click', onClick);
    }
    return () => {
      if (buttonRef.current !== null && onClick !== undefined) {
        buttonRef.current.removeEventListener('click', onClick);
      }
    };
  }, [onClick]);

  return (
    <>
      <style>
        {`
            apple-pay-button {
                --apple-pay-button-width: ${style?.width ?? 'auto'};
                --apple-pay-button-height: ${style?.height ?? '30px'};
                --apple-pay-button-border-radius: ${
                  style?.borderRadius ?? '5px'
                };
                --apple-pay-button-padding: ${style?.padding ?? '5px 0px'};
                --apple-pay-button-box-sizing: ${
                  style?.boxSizing ?? 'border-box'
                };
            }
        `}
      </style>
      {React.createElement('apple-pay-button', {
        buttonstyle: buttonStyle,
        type,
        locale,
        ref: buttonRef
      })}
    </>
  );
};

export default ApplePayButton;
