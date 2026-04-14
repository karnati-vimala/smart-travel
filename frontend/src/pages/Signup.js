import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Account Created Successfully! ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', color: '#1e293b' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>Join us and start booking your dream trips.</p>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <input 
            type="text"
            name="name"
            placeholder="Full Name"
            required
            style={inputStyle}
            onChange={handleInputChange}
          />
          
          <input 
            type="text"
            name="username"
            placeholder="Username"
            required
            style={inputStyle}
            onChange={handleInputChange}
          />

          <input 
            type="email"
            name="email"
            placeholder="Email Address"
            required
            style={inputStyle}
            onChange={handleInputChange}
          />

          <input 
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            style={inputStyle}
            onChange={handleInputChange}
          />

          <input 
            type="password"
            name="password"
            placeholder="Password"
            required
            style={inputStyle}
            onChange={handleInputChange}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '1rem',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
  fontSize: '1rem',
  outline: 'none',
  transition: '0.2s',
  fontFamily: 'inherit'
};

const buttonStyle = {
  marginTop: '1rem',
  padding: '1rem',
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: '0.3s transform, 0.3s background',
  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)'
};

export default Signup;