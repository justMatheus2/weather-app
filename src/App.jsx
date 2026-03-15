import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from "./services/weatherApi";
import "./App.css";
import "./index.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const loadWeather = async (requestedCity) => {
    if (!requestedCity) return;
    setLoading(true);
    setError("");
    try {
      const { weather: current, forecast: forecastData } =
        await fetchWeatherByCity(requestedCity);
      setWeather(current);
      setForecast(forecastData.list.slice(0, 6));
      setCity(current.name);
    } catch (err) {
      setError(err.message || "Failed to get weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadWeather(city);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { weather: current, forecast: forecastData } =
            await fetchWeatherByCoordinates(
              coords.latitude,
              coords.longitude,
            );

          setWeather(current);
          setForecast(forecastData.list.slice(0, 6));
          setCity(current.name);
          setError("");
        } catch (ge) {
          setError(ge.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied for location.");
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    loadWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const weatherIcon = weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
    : "";

  const sunrise = weather
    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const sunset = weather
    ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`page-shell ${theme}`}>
      <button className="theme-btn" onClick={toggleTheme} type="button">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>

      <div className="app-grid">
        <header className="app-header">
          <div>
            <p className="eyebrow">Weather Portfolio</p>
            <h1>Modern Weather Dashboard</h1>
            <p className="subtitle">
              Real-time weather and forecast built with the OpenWeather API.
            </p>
          </div>
          <div className="header-actions">
            <button className="location-btn" onClick={handleGeolocation}>
              Use current location
            </button>
          </div>
        </header>

        <section className="search-panel">
          <SearchBar
            city={city}
            setCity={setCity}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {error && <p className="error">{error}</p>}
        </section>

        {loading && <div className="loading">Loading weather data...</div>}

        {weather && (
          <>
            <section className="current-weather card">
              <div className="current-top">
                <div>
                  <p className="city">
                    {weather.name}, {weather.sys.country}
                  </p>
                  <h2 className="temp">{Math.round(weather.main.temp)} C</h2>
                  <p className="condition">
                    {weather.weather[0].description} - Feels like{" "}
                    {Math.round(weather.main.feels_like)} C
                  </p>
                </div>
                <img
                  src={weatherIcon}
                  alt={weather.weather[0].description}
                  className="current-icon"
                />
              </div>
              <div className="weather-meta">
                <div className="meta-item">
                  <span>Humidity</span>
                  {weather.main.humidity}%
                </div>
                <div className="meta-item">
                  <span>Wind</span>
                  {weather.wind.speed} m/s
                </div>
                <div className="meta-item">
                  <span>Pressure</span>
                  {weather.main.pressure} hPa
                </div>
              </div>
            </section>

            <section className="forecast card">
              <div className="section-header">
                <div>
                  <p className="eyebrow">Forecast</p>
                  <h3>Next hours</h3>
                </div>
              </div>
              <div className="forecast-grid">
                {forecast.map((item) => (
                  <ForecastCard key={item.dt} item={item} />
                ))}
              </div>
            </section>

            <section className="highlights card">
              <div className="section-header">
                <h3>Today's highlights</h3>
              </div>
              <div className="highlight-grid">
                <div className="highlight-card">
                  <p>Humidity</p>
                  <strong>{weather.main.humidity}%</strong>
                </div>
                <div className="highlight-card">
                  <p>Wind</p>
                  <strong>{weather.wind.speed} m/s</strong>
                </div>
                <div className="highlight-card">
                  <p>Sunrise</p>
                  <strong>{sunrise}</strong>
                </div>
                <div className="highlight-card">
                  <p>Sunset</p>
                  <strong>{sunset}</strong>
                </div>
                <div className="highlight-card">
                  <p>Feels like</p>
                  <strong>{Math.round(weather.main.feels_like)} C</strong>
                </div>
                <div className="highlight-card">
                  <p>Visibility</p>
                  <strong>
                    {Math.round((weather.visibility || 10000) / 1000)} km
                  </strong>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
