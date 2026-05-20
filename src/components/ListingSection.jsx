
import { useState } from "react";
import Card from "./Card";

export default function ListingsSection({ listings, onDelete }) {
  const [tab,   setTab]   = useState("pg");
  const [query, setQuery] = useState("");

  // Filter using map-friendly filter() — dynamic rendering with map()
  const filtered = listings.filter(l =>
    l.type === tab &&
    (query === "" ||
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.area.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section id="listings" className="section listings-section">
      <div className="container">
        <span className="section-tag">Verified Listings</span>
        <h2 className="section-title">Find Your Stay &amp; Eat</h2>

        {/* Tab switcher */}
        <div className="tabs">
          <button
            className={tab === "pg" ? "tab active" : "tab"}
            onClick={() => setTab("pg")}
          >
            🏠 PG / Hostel
          </button>
          <button
            className={tab === "mess" ? "tab active" : "tab"}
            onClick={() => setTab("mess")}
          >
            🍱 Mess / Food
          </button>
        </div>

        {/* Inline search filter */}
        <input
          className="listings-search"
          type="text"
          placeholder="Filter by name or area..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {/* Count badge */}
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> listing{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Dynamic rendering using map() */}
        <div className="cards-grid">
          {filtered.length > 0
            ? filtered.map(item => (
                <Card key={item.id} item={item} onDelete={onDelete} />
              ))
            : (
              <p className="no-results">
                No {tab === "pg" ? "PGs" : "messes"} found
                {query ? ` for "${query}"` : ""}. Try adding one above.
              </p>
            )
          }
        </div>
      </div>
    </section>
  );
}
