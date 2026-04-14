import React from "react";

const Contact = () => {
  return (
    <div className="section" style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 2rem", background: "#f8fafc" }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        overflow: "hidden",
        width: "100%",
        maxWidth: "1000px"
      }}>
        
        {/* Left Side: Contact Info */}
        <div style={{
          flex: "1 1 400px",
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "white",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Get In Touch ✉️</h2>
          <p style={{ opacity: 0.9, lineHeight: 1.6, marginBottom: "2.5rem" }}>
            We'd love to hear from you. Our friendly team is always here to chat and help you plan your next dream vacation!
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.8rem", borderRadius: "50%" }}>📞</div>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>Phone</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>+1 (800) 123-4567</p>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.8rem", borderRadius: "50%" }}>✉️</div>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>Email</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>support@dotravel.com</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.8rem", borderRadius: "50%" }}>📍</div>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>Office Location</h4>
                <p style={{ margin: 0, opacity: 0.9 }}>Marwadi university, Rajkot, Pin:360003</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div style={{ flex: "1 1 400px", padding: "3rem" }}>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#1e293b" }}>Send us a Message</h3>
          
          <form style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }} onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We'll get back to you shortly."); }}>
            
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 150px" }}>
                <label style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>First Name</label>
                <input type="text" placeholder="John" style={inputStyle} required />
              </div>
              <div style={{ flex: "1 1 150px" }}>
                <label style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>Last Name</label>
                <input type="text" placeholder="Doe" style={inputStyle} required />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>Email Address</label>
              <input type="email" placeholder="john@example.com" style={inputStyle} required />
            </div>

            <div>
              <label style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>Message</label>
              <textarea placeholder="How can we help you?" style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} required></textarea>
            </div>

            <button 
              type="submit" 
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={(e) => e.target.style.background = "#2563eb"}
              onMouseOut={(e) => e.target.style.background = "#3b82f6"}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem 1rem",
  marginTop: "0.3rem",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "1rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "0.2s border-color"
};

export default Contact;