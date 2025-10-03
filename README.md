# Apple Pay Button (React) Library

A TypeScript React library for creating an Apple Pay Button, following the official Apple Pay JavaScript guidelines. Easily integrate Apple Pay into your React applications.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Props](#props)
- [Contributing](#contributing)
- [License](#license)
- [Resources](#resources)

---

## Features
- Fully customizable Apple Pay button for React
- TypeScript support
- Follows Apple Pay JavaScript guidelines
- Easy integration and event handling
- Supports all official Apple Pay button types and styles

---

## Installation

```bash
npm install apple-pay-button
```

---

## Quick Start

```tsx
import { ApplePayButton } from 'apple-pay-button';

function App() {
  return (
    <ApplePayButton onClick={() => { /* handle Apple Pay */ }} />
  );
}
```

---

## Usage

Below is a more complete example, including Apple Pay session handling:

```tsx
import { ApplePayButton } from 'apple-pay-button';

function App() {
  const onClick = () => {
    // Define ApplePayPaymentRequest
    const applePayRequest: ApplePayJS.ApplePayPaymentRequest = {
      countryCode: 'US',
      currencyCode: 'USD',
      merchantCapabilities: ["supports3DS"],
      supportedNetworks: ["visa", "masterCard", "amex", "discover"],
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
  };

  return (
    <div className="App">
      <ApplePayButton
        onClick={onClick}
        style={{ width: '100%', borderRadius: '8px' }}
        type="continue"
      />
    </div>
  );
}

// --- Apple Pay session event handling ---
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
    const paymentData = event.payment;
    if (paymentData.token) {
      // Forward token to your gateway for processing payment and return result to apple pay session
      const result: ApplePayJS.ApplePayPaymentAuthorizationResult = {
        status: ApplePaySession.STATUS_SUCCESS,
      };
      session.completePayment(result);
    } else {
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
```

---

## Props

| Prop         | Type                                                                 | Default      | Description                                                        |
|--------------|----------------------------------------------------------------------|--------------|--------------------------------------------------------------------|
| buttonStyle  | 'black' \| 'white' \| 'white-outline'                                | 'black'      | The style of the Apple Pay button.                                 |
| type         | ButtonType                                                           | 'buy'        | The type of the Apple Pay button.                                  |
| locale       | string                                                               | 'en-US'      | The locale for the Apple Pay button.                               |
| onClick      | () => void                                                           | —            | The callback function when the Apple Pay button is clicked.        |
| style        | { width?, height?, borderRadius?, padding?, boxSizing? }             | —            | The style object for the Apple Pay button.                         |
| disabled     | boolean                                                              | false        | Whether the Apple Pay button is disabled.                          |

**ButtonType options:**

<details>
<summary>Show ButtonType values</summary>

- 'plain'
- 'add-money'
- 'book'
- 'buy'
- 'check-out'
- 'continue'
- 'contribute'
- 'donate'
- 'order'
- 'pay'
- 'reload'
- 'rent'
- 'set-up'
- 'subscribe'
- 'support'
- 'tip'
- 'top-up'

</details>

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT © [Johan Corrales](https://github.com/johan44co)

---

## Resources

- [Apple Pay Button Storybook](https://apple-pay-button.johancorrales.com/) - Interactive component documentation
- [Apple Pay Button Demo (Vercel)](https://apple-pay-button.vercel.app/) - Alternative demo site
- [Apple Pay JavaScript Guidelines](https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_javascript)
- [Apple Pay Demo](https://applepaydemo.apple.com)
- [Apple Pay Marketing](https://developer.apple.com/apple-pay/marketing/)