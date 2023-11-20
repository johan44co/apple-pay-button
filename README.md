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
npm install your-library-name
```

## Usage

Here's a basic example of how to use this library:

```tsx
import { ApplePayButton } from 'apple-pay-button';

function App() {
    const onClick = () => {
        // Do something
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
| `style` | `{ width?: string; height?: string; borderRadius?: string; padding?: string; }` | The style object for the Apple Pay button. |

Where `ButtonType` is one of the following: `'plain'`, `'add-money'`, `'book'`, `'buy'`, `'check-out'`, `'continue'`, `'contribute'`, `'donate'`, `'order'`, `'pay'`, `'reload'`, `'rent'`, `'set-up'`, `'subscribe'`, `'support'`, `'tip'`, `'top-up'`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [Johan Corrales](https://github.com/johan44co)