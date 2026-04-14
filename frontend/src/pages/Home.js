import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultDestinations = [
  { title: "Bali", location: "Indonesia", rating: "4.8", price: 25000, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { title: "Switzerland", location: "Europe", rating: "4.9", price: 80000, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  { title: "Kedarnath", location: "Uttarakhand, India", rating: "4.9", price: 15000, img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23" },
  { title: "Paris", location: "France", rating: "4.8", price: 75000, img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff" },
  { title: "Dubai", location: "Burj Khalifa", rating: "4.9", price: 90000, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c" },
  { title: "Taj Mahal", location: "Agra, Uttar Pradesh", rating: "4.9", price: 10000, img: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=60" },
  { title: "New York", location: "USA", rating: "4.6", price: 85000, img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad" },
  { title: "Mumbai", location: "Maharashtra, India", rating: "4.8", price: 8000, img: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=800&q=60" }
];

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [destinations, setDestinations] = useState(defaultDestinations);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setDestinations(defaultDestinations);
      return;
    }

    setLoading(true);
    const query = searchInput.toLowerCase().trim();

    // 1. Filter local destinations first
    const filtered = defaultDestinations.filter(
      (d) =>
        d.title.toLowerCase().includes(query) ||
        d.location.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      setDestinations(filtered);
      setLoading(false);
      return;
    }

    // 2. Fetch from Wikipedia for 'any place around the world'
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data && data.title && data.type !== 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found') {
        const dynamicDest = {
          title: data.title,
          location: data.description || "Global Destination",
          rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Random rating between 4.0 and 5.0
          price: Math.floor(Math.random() * 50000) + 20000, // Random price
          // Use Wikipedia thumbnail if available, else fallback generic image
          img: data.thumbnail?.source || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=60"
        };
        setDestinations([dynamicDest]);
      } else {
        setDestinations([]);
      }
    } catch (err) {
      console.error("Failed to fetch location data", err);
      setDestinations([]);
    }

    setLoading(false);
  };

  const handleBookClick = (dest) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first ❌");
      return;
    }
    // Navigate to the full page booking form
    navigate("/book", { state: dest });
  };

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <h1>Explore The World 🌍</h1>
        <p>Find your perfect destination</p>

        <div className="search-box">
          <input 
            placeholder="Search destination..." 
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (!e.target.value.trim()) {
                setDestinations(defaultDestinations);
              }
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>{loading ? "Searching..." : "Search"}</button>
        </div>
      </div>
      
      <div className="section">
        <h2>{searchInput && destinations.length > 0 ? "Search Results" : "Popular Destinations"}</h2>

        {destinations.length === 0 && !loading && (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
            No destinations found for "{searchInput}". Try searching another place!
          </p>
        )}

        <div className="cards">
          {destinations.map((dest, idx) => (
            <div className="card" key={idx}>
              <img src={dest.img} alt={dest.title} />
              <div className="card-content">
                <h3>{dest.title}</h3>
                <p>{dest.location}</p>
                <span>⭐ {dest.rating}</span>
                <h4>₹{dest.price.toLocaleString("en-IN")}</h4>
                <button onClick={() => handleBookClick(dest)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIAL OFFERS */}
      <div className="section">
        <h2>Special Offers 💰</h2>

        <div className="offers-grid">
          <div className="offer-card">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945"  alt="Luxury Hotel"/>
            <div className="offer-overlay">
              <h3>Luxury Hotel</h3>
              <p>2 Nights • Free WiFi</p>
              <h4><span>₹30,000</span> ₹25,000</h4>
              <button onClick={() => alert("Please contact our agents for Special Offers.")}>Book Now</button>
            </div>
          </div>

          <div className="offer-card">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" alt="Offer 2" />
            <div className="offer-overlay">
              <h3>Beach Resort</h3>
              <p>3 Nights • Breakfast</p>
              <h4><span>₹22,000</span> ₹18,000</h4>
              <button onClick={() => alert("Please contact our agents for Special Offers.")}>Book Now</button>
            </div>
          </div>

          <div className="offer-card">
            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" alt="Offer 3"/>
            <div className="offer-overlay">
              <h3>Tour Package</h3>
              <p>5 Days • Guide Included</p>
              <h4><span>₹40,000</span> ₹30,000</h4>
              <button onClick={() => alert("Please contact our agents for Special Offers.")}>Book Now</button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Home;