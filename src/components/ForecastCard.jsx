export default function ForecastCard({ item }) {
  const date = new Date(item.dt * 1000);
  const label = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="forecast-card">
      <p className="forecast-time">{label}</p>
      <img
        className="forecast-icon"
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
      />
      <p className="forecast-temp">{Math.round(item.main.temp)}°</p>
      <p className="forecast-desc">{item.weather[0].main}</p>
    </article>
  );
}
