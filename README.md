# Apple Pay Button (React) Library

## Description

This is a TypeScript React library for creating an Apple Pay Button. This library follows the Apple Pay Button JavaScript guidelines. It allows you to easily integrate Apple Pay into your React applications.

## Resources

Here are some resources to help you understand how this library works:

- [Apple Pay JavaScript Guidelines](https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_javascript)
- [Apple Pay Demo](https://applepaydemo.apple.com)
- [Apple Pay Marketing](https://developer.apple.com/apple-pay/marketing/)

## Installation

To install this library, run the following command:

```bash
npm install apple-pay-button
```

## Usage

Here's a basic example of how to use this library:

```tsx
import { ApplePayButton } from 'apple-pay-button';

function App() {
    const onClick = () => {
      // Define ApplePayPaymentRequest
      const applePayRequest: ApplePayJS.ApplePayPaymentRequest = {
        countryCode: process.env.NEXT_PUBLIC_COUNTRY_CODE ?? 'US',
        currencyCode: process.env.NEXT_PUBLIC_CURRENCY_CODE ?? 'USD',
        merchantCapabilities: [
          "supports3DS"
        ],
        supportedNetworks: [
          "visa",
          "masterCard",
          "amex",
          "discover"
        ],
        total: {
          label: "Merchant Name",
          type: "final",
          amount: "10.00",
        }
      };

      // Create ApplePaySession
      const session = new ApplePaySession(3, applePayRequest);

      handleEventsForApplePay(session);

      session.begin();
    }
  
  function handleEventsForApplePay(session: ApplePaySession) {

    session.onvalidatemerchant = async (event: ApplePayJS.ApplePayValidateMerchantEvent) => {
      // Call your own server to request a new merchant session.
      const merchantSession = await validateMerchant(event.validationURL);
      if (merchantSession) {
        session.completeMerchantValidation(merchantSession);
      } else {
        console.error("Error during validating merchant");
      }

    };

    session.onpaymentmethodselected = (event: ApplePayJS.ApplePayPaymentMethodSelectedEvent) => {
      // Define ApplePayPaymentMethodUpdate based on the selected payment method.
      // No updates or errors are needed, pass an empty object.
      const update: ApplePayJS.ApplePayPaymentMethodUpdate = {
        newTotal: {
          label: "Merchant Name",
          type: "final",
          amount: "10.00",
        }
      };
      session.completePaymentMethodSelection(update);
    };

    session.onshippingmethodselected = (event: ApplePayJS.ApplePayShippingMethodSelectedEvent) => {
      // Define ApplePayShippingMethodUpdate based on the selected shipping method.
      // No updates or errors are needed, pass an empty object. 
      const update: ApplePayJS.ApplePayShippingMethodUpdate = {
        newTotal: {
          label: "Merchant Name",
          type: "final",
          amount: "10.00",
        }
      };
      session.completeShippingMethodSelection(update);
    };

    session.onshippingcontactselected = (event: ApplePayJS.ApplePayShippingContactSelectedEvent) => {
      // Define ApplePayShippingContactUpdate based on the selected shipping contact.
      const update: ApplePayJS.ApplePayShippingMethodUpdate = {
        newTotal: {
          label: "Merchant Name",
          type: "final",
          amount: "10.00",
        }
      };
      session.completeShippingContactSelection(update);
    };


    session.onpaymentauthorized = async (event: ApplePayJS.ApplePayPaymentAuthorizedEvent) => {
      // Define ApplePayPaymentAuthorizationResult
      const paymentData = event.payment;

      if (paymentData.token) {
        // Forward token to your gateway for processing payment and return result to apple pay session
        const result: ApplePayJS.ApplePayPaymentAuthorizationResult = {
          status: ApplePaySession.STATUS_SUCCESS,
        };
        session.completePayment(result);
      }
      else {
        const result: ApplePayJS.ApplePayPaymentAuthorizationResult = {
          status: ApplePaySession.STATUS_FAILURE,
        };
        session.completePayment(result);
      }
    };


    session.oncancel = (event: ApplePayJS.Event) => {
      console.log("Session Cancelled.");
    };

  }

  return (
    <div className="App">
      <ApplePayButton
        onClick={onClick}
        style={{
            width: '100%',
            borderRadius: '8px',
        }}
        type="continue"
    />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `buttonStyle` | `'black' \| 'white' \| 'white-outline'` | The style of the Apple Pay button. Default is `'black'`. |
| `type` | `ButtonType` | The type of the Apple Pay button. Default is `'buy'`. |
| `locale` | `string` | The locale for the Apple Pay button. Default is `'en-US'`. |
| `onClick` | `() => void` | The callback function when the Apple Pay button is clicked. |
| `style` | `{ width?: string; height?: string; borderRadius?: string; padding?: string; boxSizing?: string; }` | The style object for the Apple Pay button. |
| `disabled` | `boolean` | Whether the Apple Pay button is disabled. Default is `false`. |

Where `ButtonType` is one of the following: `'plain'`, `'add-money'`, `'book'`, `'buy'`, `'check-out'`, `'continue'`, `'contribute'`, `'donate'`, `'order'`, `'pay'`, `'reload'`, `'rent'`, `'set-up'`, `'subscribe'`, `'support'`, `'tip'`, `'top-up'`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [Johan Corrales](https://github.com/johan44co)