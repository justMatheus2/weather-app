import "./SearchBar.css";

export default function SearchBar({ city, setCity, onSubmit, loading }) {
  return (
    <form className="search-wrap" onSubmit={onSubmit}>
      <div className="search-input">
        <span className="search-icon" aria-hidden="true">
          🔎
        </span>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          aria-label="City name"
          autoFocus
        />
      </div>
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
