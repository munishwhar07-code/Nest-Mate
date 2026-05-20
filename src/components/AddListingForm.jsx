
import { useState, useEffect } from "react";

// Initial empty form state
const EMPTY = { name:"", area:"", city:"", price:"", type:"pg", tag:"", phone:"" };

export default function AddListingForm({ onAdd }) {
  const [form,    setForm]    = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  // useEffect — validate live whenever form changes (only for touched fields)
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validate(form));
    }
  }, [form, touched]);

  // ── Validation rules ──
  const validate = (f) => {
    const e = {};
    if (!f.name.trim())               e.name  = "Name is required";
    if (!f.area.trim())               e.area  = "Area is required";
    if (!f.city.trim())               e.city  = "City is required";
    if (!f.price)                     e.price = "Price is required";
    else if (Number(f.price) < 500)   e.price = "Minimum price is ₹500";
    else if (Number(f.price) > 50000) e.price = "Maximum price is ₹50,000";
    if (f.phone && !/^\d{10}$/.test(f.phone)) e.phone = "Enter valid 10-digit number";
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev  => ({ ...prev,    [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched to show all errors
    setTouched({ name:true, area:true, city:true, price:true, phone:true });
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    // Simulate a slight delay (replace with real API call if needed)
    setTimeout(() => {
      const newListing = {
        ...form,
        id:    Date.now(),   // temporary ID
        price: `₹${Number(form.price).toLocaleString()}`,
        fresh: 100,
        rating:"New",
        img:   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
      };
      onAdd(newListing);
      setForm(EMPTY);
      setTouched({});
      setErrors({});
      setLoading(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 600);
  };

  const f = (field, val) => handleChange(field, val);

  return (
    <div className="add-form-wrap">
      <h2 className="form-heading">➕ Add a New Listing</h2>

      {done && (
        <div className="success-toast">✔ Listing added successfully!</div>
      )}

      <form className="add-form" onSubmit={handleSubmit} noValidate>
        {/* Row 1 — Type + Tag */}
        <div className="form-row">
          <label className="form-group">
            <span>Type *</span>
            <select
              className="form-input"
              value={form.type}
              onChange={e => f("type", e.target.value)}
            >
              <option value="pg">🏠 PG / Hostel</option>
              <option value="mess">🍱 Mess / Food</option>
            </select>
          </label>

          <label className="form-group">
            <span>Tag</span>
            <select
              className="form-input"
              value={form.tag}
              onChange={e => f("tag", e.target.value)}
            >
              <option value="">Select tag</option>
              <option value="Girls Only">Girls Only</option>
              <option value="Boys Only">Boys Only</option>
              <option value="Both">Both</option>
              <option value="✔ Qty Honest">Qty Honest (Mess)</option>
              <option value="Non-Veg">Non-Veg (Mess)</option>
            </select>
          </label>
        </div>

        {/* Row 2 — Name + Area */}
        <div className="form-row">
          <label className="form-group">
            <span>Name *</span>
            <input
              className={`form-input ${errors.name && touched.name ? "input-err" : ""}`}
              type="text"
              placeholder="e.g. Sri Lakshmi PG"
              value={form.name}
              onChange={e => f("name", e.target.value)}
            />
            {errors.name && touched.name && (
              <span className="err-msg">⚠ {errors.name}</span>
            )}
          </label>

          <label className="form-group">
            <span>Area *</span>
            <input
              className={`form-input ${errors.area && touched.area ? "input-err" : ""}`}
              type="text"
              placeholder="e.g. Anna Nagar"
              value={form.area}
              onChange={e => f("area", e.target.value)}
            />
            {errors.area && touched.area && (
              <span className="err-msg">⚠ {errors.area}</span>
            )}
          </label>
        </div>

        {/* Row 3 — City + Price */}
        <div className="form-row">
          <label className="form-group">
            <span>City *</span>
            <input
              className={`form-input ${errors.city && touched.city ? "input-err" : ""}`}
              type="text"
              placeholder="e.g. madurai"
              value={form.city}
              onChange={e => f("city", e.target.value)}
            />
            {errors.city && touched.city && (
              <span className="err-msg">⚠ {errors.city}</span>
            )}
          </label>

          <label className="form-group">
            <span>Monthly Price (₹) *</span>
            <input
              className={`form-input ${errors.price && touched.price ? "input-err" : ""}`}
              type="number"
              placeholder="e.g. 4500"
              min="500"
              value={form.price}
              onChange={e => f("price", e.target.value)}
            />
            {errors.price && touched.price && (
              <span className="err-msg">⚠ {errors.price}</span>
            )}
          </label>
        </div>

        {/* Row 4 — Phone */}
        <label className="form-group full-width">
          <span>WhatsApp Number (optional)</span>
          <input
            className={`form-input ${errors.phone && touched.phone ? "input-err" : ""}`}
            type="tel"
            placeholder="e.g. 9876543210"
            value={form.phone}
            onChange={e => f("phone", e.target.value)}
          />
          {errors.phone && touched.phone && (
            <span className="err-msg">⚠ {errors.phone}</span>
          )}
        </label>

        <button
          type="submit"
          className="btn btn-primary submit-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Listing →"}
        </button>
      </form>
    </div>
  );
}
