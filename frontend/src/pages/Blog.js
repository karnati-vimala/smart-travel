import React, { useState } from "react";

const Blog = () => {

  const [active, setActive] = useState(null);

  const toggleReadMore = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <div className="blog-section">

      <h2 className="blog-title">Our best blog?</h2>
      <p className="blog-subtitle">
        An insight to the incredible experience in the world.
      </p>

      <div className="blog-wrapper">

        {/* LEFT SIDE (3 items) */}
        <div className="blog-left">

          {/* 1 */}
          <div className="blog-item">
            <img src="https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea" />
            <div>
              <h3>Beautiful Morocco, let us travel!</h3>
              <p>Explore culture and deserts of Morocco.</p>

              {active === 1 && (
                <p className="extra-text">
                  Morocco is famous for markets, architecture and Sahara desert.
                </p>
              )}

              <span onClick={() => toggleReadMore(1)}>
                {active === 1 ? "Show Less ↑" : "Read More →"}
              </span>
            </div>
          </div>

          {/* 2 */}
          <div className="blog-item">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" />
            <div>
              <h3>Adventure in Tunisia</h3>
              <p>Enjoy deserts and culture of Tunisia.</p>

              {active === 2 && (
                <p className="extra-text">
                  Tunisia offers history, beaches and adventure tourism.
                </p>
              )}

              <span onClick={() => toggleReadMore(2)}>
                {active === 2 ? "Show Less ↑" : "Read More →"}
              </span>
            </div>
          </div>

          {/* 3 */}
          <div className="blog-item">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" />
            <div>
              <h3>Explore Mountains</h3>
              <p>Discover peaceful mountain landscapes.</p>

              {active === 3 && (
                <p className="extra-text">
                  Mountains give fresh air, peace and adventure trekking.
                </p>
              )}

              <span onClick={() => toggleReadMore(3)}>
                {active === 3 ? "Show Less ↑" : "Read More →"}
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE (3 items) */}
        <div className="blog-right">

          {/* 4 */}
          <div className="blog-item">
            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" />
            <div>
              <h3>Romantic Paris</h3>
              <p>Enjoy Eiffel Tower moments.</p>

              {active === 4 && (
                <p className="extra-text">
                  Paris is known for romance, art, and culture.
                </p>
              )}

              <span onClick={() => toggleReadMore(4)}>
                {active === 4 ? "Show Less ↑" : "Read More →"}
              </span>
            </div>
          </div>

          {/* 5 */}
          <div className="blog-item">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" />
            <div>
              <h3>Best in East Africa</h3>
              <p>Explore Kenya wildlife.</p>

              {active === 5 && (
                <p className="extra-text">
                  Kenya offers safari, wildlife and national parks.
                </p>
              )}

              <span onClick={() => toggleReadMore(5)}>
                {active === 5 ? "Show Less ↑" : "Read More →"}
              </span>
            </div>
          </div>

          {/* 6 */}
          <div className="blog-item">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" />
            <div>
              <h3>Beach Paradise</h3>
              <p>Relax on beautiful beaches.</p>

              {active === 6 && (
                <p className="extra-text">
                  Beaches offer relaxation, sunsets and water sports.
                </p>
              )}

              <span onClick={() => toggleReadMore(6)}>
                {active === 6 ? "Show Less ↑" : "Read More →"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Blog;