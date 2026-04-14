import React, { useState, useEffect } from 'react';
import { 
  Plane, MapPin, Calendar, Users, Search, 
  Star, Heart, Shield, Clock, Phone, Globe, X, User as UserIcon
} from 'lucide-react';
import './index.css';
import './App.css';
import heroBg from './assets/hero_bg.png';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const allDestinations = [
    {
      id: 1,
      title: "Maldives Island",
      location: "Indian Ocean",
      image: heroBg,
      price: "1200",
      rating: "4.9"
    },
    {
      id: 2,
      title: "Swiss Alps",
      location: "Switzerland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
      price: "950",
      rating: "4.8"
    },
    {
      id: 3,
      title: "Kyoto Temples",
      location: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
      price: "850",
      rating: "4.7"
    },
    {
      id: 4,
      title: "Santorini View",
      location: "Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
      price: "1100",
      rating: "4.9"
    }
  ];

  // Derived state to filter destinations based on search
  const displayedDestinations = allDestinations.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setShowLogin(false);
        setEmail('');
        setPassword('');
        alert(`Successfully ${isRegistering ? 'registered' : 'logged in'}!`);
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to backend.');
    }
  };

  const handleBookNow = async (dest) => {
    if (!user) {
      alert("You must be logged in to book a destination.");
      setShowLogin(true);
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id || user._id,
          destinationTitle: dest.title,
          destinationLocation: dest.location,
          price: dest.price
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Successfully booked ${dest.title}! Check database for confirmation.`);
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to backend.');
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand">
          <Globe className="brand-icon" size={28} />
          <span>Wanderlust</span>
        </div>
        <ul className="nav-links">
          <li className="nav-link">Destinations</li>
          <li className="nav-link">Flights</li>
          <li className="nav-link">Hotels</li>
          <li className="nav-link">Offers</li>
        </ul>
        <div className="nav-actions">
          {user ? (
            <div className="user-display">
              <UserIcon size={18} />
              {user.email.split('@')[0]}
            </div>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => { setIsRegistering(false); setShowLogin(true); }}>Log In</button>
              <button className="btn btn-primary" onClick={() => { setIsRegistering(true); setShowLogin(true); }}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <img src={heroBg} alt="Tropical Beach" className="hero-bg" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Great Adventure</h1>
          <p className="hero-subtitle">
            Explore beautiful destinations around the world with exclusive deals and seamless booking experiences.
          </p>
        </div>

        {/* Search Widget */}
        <div className="search-widget">
          <div className="search-field">
            <span className="search-label">Location</span>
            <div style={{display:'flex', alignItems: 'center', gap: '8px', width: '100%'}}>
              <MapPin size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Where are you going?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-field">
            <span className="search-label">Check in - Check out</span>
            <div style={{display:'flex', alignItems: 'center', gap: '8px', width: '100%'}}>
              <Calendar size={18} color="var(--text-muted)" />
              <input type="text" className="search-input" placeholder="Add dates" />
            </div>
          </div>
          <div className="search-field">
            <span className="search-label">Guests</span>
            <div style={{display:'flex', alignItems: 'center', gap: '8px', width: '100%'}}>
              <Users size={18} color="var(--text-muted)" />
              <input type="text" className="search-input" placeholder="2 Adults, 1 Room" />
            </div>
          </div>
          <button className="search-btn" onClick={() => {
            document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
          }}>
            <Search size={20} />
            Search
          </button>
        </div>
      </header>

      {/* Popular Destinations */}
      <section id="destinations" className="section bg-light">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Destinations'}
        </h2>
        <p className="section-subtitle">
          Explore our highly rated destinations and enjoy the vacation of your dreams with premium accommodations.
        </p>

        <div className="destinations-grid">
          {displayedDestinations.length > 0 ? displayedDestinations.map(dest => (
            <div className="destination-card" key={dest.id}>
              <div className="card-img-wrapper">
                <img src={dest.image} alt={dest.title} className="card-img" />
                <div className="card-badge">
                  <Star size={14} className="star-icon" fill="currentColor" />
                  {dest.rating}
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{dest.title}</h3>
                  <Heart size={20} color="#cbd5e1" style={{cursor: 'pointer'}} />
                </div>
                <div className="card-location">
                  <MapPin size={14} />
                  {dest.location}
                </div>
                <div className="card-price-row">
                  <div className="price">${dest.price}<span> / person</span></div>
                  <button 
                    className="btn btn-primary" 
                    style={{padding: '0.4rem 1rem', fontSize: '0.85rem'}}
                    onClick={() => handleBookNow(dest)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div style={{textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)'}}>
              No destinations found matching your search. Try another location.
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">
          We provide the best booking experience, making your travel planning seamless and enjoyable.
        </p>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Shield size={36} />
            </div>
            <h3 className="feature-title">Secure Booking</h3>
            <p className="feature-desc">
              Your payments and personal information are protected by top-tier encryption standards.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Star size={36} />
            </div>
            <h3 className="feature-title">Best Price Guarantee</h3>
            <p className="feature-desc">
              We offer competitive pricing and exclusive deals you won't find anywhere else.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Phone size={36} />
            </div>
            <h3 className="feature-title">24/7 Support</h3>
            <p className="feature-desc">
              Our travel agents are always here to help you, no matter where you are in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <div className="nav-brand" style={{marginBottom: '1rem'}}>
              <Globe className="brand-icon" size={28} color="#3b82f6" />
              <span>Wanderlust</span>
            </div>
            <p style={{color: 'rgba(255,255,255,0.7)', lineHeight: 1.6}}>
              Discover the world's most breathtaking destinations and embark on unforgettable journeys with us.
            </p>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Press</a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <div className="footer-links">
              <a href="#">Help Center</a>
              <a href="#">Safety</a>
              <a href="#">Cancellation Options</a>
              <a href="#">COVID-19 Response</a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <div className="footer-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Wanderlust Travel. All rights reserved.
        </div>
      </footer>

      {/* Auth Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false) }}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowLogin(false)}>
              <X size={24} />
            </button>
            <h2 className="modal-title">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="form-input" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  required 
                  className="form-input" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem', padding: '0.75rem'}}>
                {isRegistering ? 'Sign Up' : 'Log In'}
              </button>
            </form>
            <div className="modal-toggle">
              {isRegistering ? (
                <>Already have an account? <span onClick={() => setIsRegistering(false)}>Log in</span></>
              ) : (
                <>Don't have an account? <span onClick={() => setIsRegistering(true)}>Sign up</span></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
