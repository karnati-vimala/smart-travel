import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      alert(`Welcome back, ${username}! ✅`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', color: '#1e293b' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>Please enter your username and password to log in.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <input 
            type="text"
            placeholder="Username" 
            required
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password"
            required
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
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

export default Login;