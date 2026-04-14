import React, { useState, useEffect } from "react";
import axios from "axios";

const Destinations = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisited = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: token },
        });

        // Limit the displayed visited places to a maximum of 4
        setVisitedPlaces(res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch visited places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisited();
  }, []);

  return (
    <div className="dest-section">
      <h2 className="dest-title">Recently Visited Places</h2>
      
      {loading ? (
        <p className="dest-subtitle">Loading your visits...</p>
      ) : visitedPlaces.length > 0 ? (
        <>
          <p className="dest-subtitle">
            A beautiful timeline of places you've booked and explored.
          </p>
          <div className="dest-container">
            {visitedPlaces.map((visit, idx) => {
              const bgImages = [
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
                "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
              ];
              const imgUrl = bgImages[idx % bgImages.length];

              return (
              <div className="dest-card" key={visit._id || idx}>
                <img 
                  src={imgUrl} 
                  alt={visit.destinationTitle} 
                />
                <div className="dest-overlay">
                  <h3>{visit.destinationTitle}</h3>
                  <p>{visit.destinationLocation}</p>
                </div>
              </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="dest-subtitle" style={{ marginTop: '2rem' }}>
          You haven't visited any places recently. Book a trip from the Home page!
        </p>
      )}
    </div>
  );
};

export default Destinations;