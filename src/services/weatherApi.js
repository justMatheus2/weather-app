const WEATHER_BASE = "https://api.openweathermap.org/data/2.5";
const GEO_BASE = "https://api.openweathermap.org/geo/1.0";

function getApiKey() {
  const key = import.meta.env.VITE_WEATHER_API_KEY;
  if (!key) {
    throw new Error("Missing VITE_WEATHER_API_KEY. Add it to .env file.");
  }

  return key;
}

async function fetchJson(url, fallbackMessage) {
  const response = await fetch(url);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || fallbackMessage);
  }

  return response.json();
}

async function fetchWeatherByCoords(lat, lon, key) {
  const units = "metric";
  const [weatherData, forecastData] = await Promise.all([
    fetchJson(
      `${WEATHER_BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`,
      "Could not load current weather",
    ),
    fetchJson(
      `${WEATHER_BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`,
      "Could not load forecast",
    ),
  ]);

  return {
    weather: weatherData,
    forecast: forecastData,
  };
}

export async function fetchWeatherByCity(city) {
  const key = getApiKey();
  const trimmedCity = city.trim();
  if (!trimmedCity) {
    throw new Error("Type a city name first.");
  }

  const matches = await fetchJson(
    `${GEO_BASE}/direct?q=${encodeURIComponent(trimmedCity)}&limit=1&appid=${key}`,
    "Could not find city coordinates",
  );

  if (!matches.length) {
    throw new Error("City not found");
  }

  const [{ lat, lon }] = matches;
  return fetchWeatherByCoords(lat, lon, key);
}

export async function fetchWeatherByCoordinates(lat, lon) {
  const key = getApiKey();
  return fetchWeatherByCoords(lat, lon, key);
}
