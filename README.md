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

## Deploy to GitHub Pages

This project is configured to deploy automatically to GitHub Pages through GitHub Actions.

1. Push the project to the `main` branch of this repository.
2. In your GitHub repository, go to `Settings > Secrets and variables > Actions`.
3. Create a new repository secret named `VITE_WEATHER_API_KEY`.
4. Paste your valid OpenWeather API key as the secret value.
5. Go to `Settings > Pages` and make sure the source is set to `GitHub Actions`.
6. Push a new commit to `main` or run the workflow manually from the `Actions` tab.

Your site will be published at:

```text
https://justMatheus2.github.io/weather-app/
```

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
