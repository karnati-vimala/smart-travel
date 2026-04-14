import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <h2 className="logo">Dot Travel</h2>

      {/* Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Buttons */}
      <div className="nav-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;