import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const destInfo = location.state;

  const [bookingForm, setBookingForm] = useState({
    days: 3,
    budget: "cheap",
    companions: "solo",
  });

  useEffect(() => {
    // If no destination data exists in state, redirect back to home.
    if (!destInfo) {
      navigate("/");
    }
  }, [destInfo, navigate]);

  const confirmBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          destinationTitle: destInfo.title,
          destinationLocation: destInfo.location,
          price: destInfo.price,
          days: bookingForm.days,
          budget: bookingForm.budget,
          companions: bookingForm.companions,
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert(`Booking Successful for ${destInfo.title}! ✅`);
      navigate("/destinations"); // Redirect to Destinations to see history

    } catch (err) {
      alert("Booking Failed ❌");
    }
  };

  if (!destInfo) return null;

  return (
    <div className="section" style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <div className="book-container" style={{ 
        display: "flex", 
        flexDirection: "row", 
        background: "#fff", 
        borderRadius: "20px", 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)", 
        overflow: "hidden",
        width: "100%",
        maxWidth: "1000px",
        minHeight: "500px"
      }}>
        {/* Left Side: Destination Image & Info */}
        <div className="book-img-section" style={{ flex: 1, position: "relative", minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <img 
            src={destInfo.img || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"} 
            alt={destInfo.title} 
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 0 }} 
          />
          <div style={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white", padding: "2rem", width: "100%"
          }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{destInfo.title}</h2>
            <p style={{ opacity: 0.9 }}>{destInfo.location}</p>
            <h3 style={{ marginTop: "1rem", color: "#f4f4f4" }}>₹{Number(destInfo.price).toLocaleString("en-IN")}</h3>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: 1, padding: "3rem" }}>
          <h2 style={{ marginBottom: "2rem", fontSize: "1.8rem", color: "#333" }}>Plan Your Trip</h2>

          <form onSubmit={confirmBooking} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "#555" }}>How many days?</label>
              <input 
                type="number" 
                min="1" 
                required
                style={{ padding: "1rem", borderRadius: "10px", border: "1px solid #ddd", fontSize: "1rem" }}
                value={bookingForm.days} 
                onChange={(e) => setBookingForm({...bookingForm, days: Number(e.target.value)})}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "#555" }}>Budget Tier</label>
              <select 
                style={{ padding: "1rem", borderRadius: "10px", border: "1px solid #ddd", fontSize: "1rem" }}
                value={bookingForm.budget}
                onChange={(e) => setBookingForm({...bookingForm, budget: e.target.value})}
              >
                <option value="cheap">Cheap</option>
                <option value="higher">Higher</option>
                <option value="expensive">Luxury / Expensive</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "#555" }}>Who are you traveling with?</label>
              <select 
                style={{ padding: "1rem", borderRadius: "10px", border: "1px solid #ddd", fontSize: "1rem" }}
                value={bookingForm.companions}
                onChange={(e) => setBookingForm({...bookingForm, companions: e.target.value})}
              >
                <option value="solo">Solo</option>
                <option value="couples">Couples</option>
                <option value="friends">Friends</option>
                <option value="family">Family</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s background"
              }}
              onMouseOver={(e) => e.target.style.background = "#0056b3"}
              onMouseOut={(e) => e.target.style.background = "#007BFF"}
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile responsiveness embedded styles */}
      <style>{`
        @media (max-width: 768px) {
          .book-container {
            flex-direction: column !important;
          }
          .book-img-section {
            min-height: 250px !important;
            flex: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
