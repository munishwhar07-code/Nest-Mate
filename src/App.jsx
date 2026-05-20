
import { useState, useEffect } from "react";
import "./App.css";

// ── Import all separate components ──
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import StatsBar        from "./components/StatsBar";
import AddListingForm  from "./components/AddListingForm";
import ListingsSection from "./components/ListingSection";
import HowItWorks      from "./components/HowItWorks";
import Services        from "./components/Services";
import Footer          from "./components/Footer";

// ── Initial seed data ────────────────────────────
const INITIAL_LISTINGS = [
  { id:1, type:"pg",   name:"Sri Lakshmi PG",     area:"Thiruparankundram", city:"madurai",    price:"₹4,500", tag:"Girls Only",    fresh:98, rating:"4.7", img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80" },
  { id:2, type:"pg",   name:"Ganesh Men's Hostel", area:"Kodimangalam",      city:"madurai",    price:"₹3,800", tag:"Boys Only",     fresh:85, rating:"4.4", img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80" },
  { id:3, type:"pg",   name:"Royal Residency PG",  area:"RS Puram",          city:"coimbatore", price:"₹5,200", tag:"Both",          fresh:100,rating:"4.8", img:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80" },
  { id:4, type:"mess", name:"Murugan Mess",         area:"Thiruparankundram", city:"madurai",    price:"₹2,200", tag:"✔ Qty Honest",  fresh:95, rating:"4.6", img:"https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&q=80" },
  { id:5, type:"mess", name:"Annapoorna Bhavan",    area:"Anna Nagar",        city:"madurai",    price:"₹1,900", tag:"⚠ Qty Drops",   fresh:72, rating:"4.3", img:"https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&q=80" },
  { id:6, type:"mess", name:"Saravana Mess",        area:"RS Puram",          city:"coimbatore", price:"₹2,500", tag:"Non-Veg",       fresh:88, rating:"4.5", img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
];

export default function App() {
  // ── useState — main listings state ──────────────
  const [listings,   setListings]   = useState(INITIAL_LISTINGS);
  const [query,      setQuery]      = useState("");
  const [showForm,   setShowForm]   = useState(false);
  const [pageReady,  setPageReady]  = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 300);
    return () => clearTimeout(timer);   // cleanup on unmount
  }, []);

  // ── useEffect — persist listings to localStorage ──
  useEffect(() => {
    localStorage.setItem("nestmate_listings", JSON.stringify(listings));
  }, [listings]);

  // ── ADD listing — called from AddListingForm ──────
  const handleAdd = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    setShowForm(false);
  };

  // ── DELETE listing — called from Card component ───
  const handleDelete = (id) => {
    if (!window.confirm("Remove this listing from Nestmate?")) return;
    setListings(prev => prev.filter(l => l.id !== id));
  };

  if (!pageReady) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          <span>Nest</span>mate<em>.</em>
        </div>
        <p>Loading Tamil Nadu's student platform...</p>
      </div>
    );
  }

  return (
    <div className="app">

      {/* COMPONENT 1 — Navbar */}
      <Navbar onListClick={() => setShowForm(!showForm)} />

      {/* COMPONENT 2 — Hero with search */}
      <Hero query={query} setQuery={setQuery} />

      {/* COMPONENT 6 — Live stats derived from listings state */}
      <StatsBar listings={listings} />

      {/* COMPONENT 4 — Add Listing Form (toggle visibility) */}
      {showForm && (
        <section className="form-section">
          <div className="container">
            <AddListingForm onAdd={handleAdd} />
          </div>
        </section>
      )}

      {/* COMPONENT 5 — Listings with map(), filter, delete */}
      <ListingsSection listings={listings} onDelete={handleDelete} />

      {/* COMPONENT 7 — How it works */}
      <HowItWorks />

      {/* COMPONENT 8 — Services */}
      <Services />

      {/* COMPONENT 9 — Footer */}
      <Footer onListClick={() => setShowForm(true)} />

    </div>
  );
}
