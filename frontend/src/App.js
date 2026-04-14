import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book" element={<BookingPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;