# Weather App

A weather dashboard built with React + Vite and integrated with the OpenWeather API.

This project allows users to:

- search for the current weather by city
- use the browser's current location
- view the next hours forecast
- switch between dark and light mode
- see highlights such as humidity, wind, sunrise, sunset, and visibility

## Technologies

- React
- Vite
- OpenWeather API

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add your API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

You can also copy the example file:

```bash
copy .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown by Vite in your browser, usually:

```text
http://localhost:5173
```

## Scripts

- `npm run dev`: starts the app in development mode
- `npm run build`: creates the production build
- `npm run preview`: previews the production build locally
- `npm run lint`: runs ESLint

## Main Structure

- `src/App.jsx`: main application interface
- `src/services/weatherApi.js`: OpenWeather integration
- `src/components/SearchBar.jsx`: search input component
- `src/components/ForecastCard.jsx`: forecast card component

## Notes

- Your OpenWeather API key must be valid and active.
- Whenever you update the `.env` file, restart `npm run dev`.
- The `.env` file is ignored by Git to keep your API key private.

## Future Improvements

- translate weather descriptions into Portuguese
- persist theme selection with `localStorage`
- add extra weather details such as rain, cloud coverage, and expanded feels-like data
