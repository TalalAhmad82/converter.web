# All-in-One Converter

A modern, responsive web application that provides multiple conversion tools in one place.

## Features

- **Currency Converter**: Convert between major world currencies with real-time exchange rates
- **Unit Converter**: Convert between various units of measurement:
  - Length (meters, feet, inches, etc.)
  - Weight (kilograms, pounds, ounces, etc.)
  - Volume (liters, gallons, etc.)
  - Area (square meters, acres, etc.)
  - Speed (km/h, mph, etc.)
  - Time (seconds, minutes, hours, etc.)
- **Temperature Converter**: Convert between Celsius, Fahrenheit, and Kelvin
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3 (with CSS variables for theming)
- JavaScript (ES6+)
- ExchangeRate-API for currency conversion

## How to Use

1. Open `index.html` in any modern web browser
2. Select the converter type using the tabs at the top
3. Enter the value you want to convert
4. Select the units you want to convert from and to
5. See the result instantly

## Currency Conversion API

This project uses the free tier of ExchangeRate-API. If you plan to use this project extensively or in a production environment, you should:

1. Register for your own API key at [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Replace the API key in the `script.js` file

## Local Storage

The application saves your theme preference (dark/light mode) to your browser's local storage.

## License

This project is open source and available under the MIT License.

## Future Improvements

- Add more currency options
- Implement more unit conversion types
- Add historical currency rate charts
- Create a PWA version for offline use