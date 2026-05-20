
import { useState } from "react";

export default function Card({ item, onDelete }) {
  const [saved, setSaved] = useState(false);

  // Freshness badge colour logic
  const freshCls = item.fresh >= 90 ? "high" : item.fresh >= 70 ? "mid" : "low";

  // Contact owner via WhatsApp
  const handleContact = () => {
    if (item.phone) {
      const msg = encodeURIComponent(
        `Hi, I found your listing "${item.name}" on Nestmate. Is it available?`
      );
      window.open(`https://wa.me/91${item.phone}?text=${msg}`, "_blank");
    } else {
      alert("Owner contact not available yet.");
    }
  };

  return (
    <article className="card">
      <div className="card-img-wrap">
        <img src={item.img || item.imgUrl} alt={item.name} className="card-img" />
        <span className="card-tag">{item.tag}</span>
        {/* Save toggle button */}
        <button
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label="Save"
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-area">📍 {item.area}</p>
        <div className="card-row">
          <span className={`fresh fresh-${freshCls}`}>⚡ {item.fresh}% Fresh</span>
          <span className="rating">★ {item.rating}</span>
        </div>
        <div className="card-footer">
          <strong className="price">{item.price}<span>/mo</span></strong>
          <div className="card-actions">
            <button className="btn btn-sm" onClick={handleContact}>Contact</button>
            {/* Delete button — calls onDelete passed from parent */}
            {onDelete && (
              <button
                className="btn btn-sm btn-delete"
                onClick={() => onDelete(item.id)}
              >
                🗑
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
