import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Optionally navigate home
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyApp
        </div>

        {/* Auth Button (Desktop) */}
        {user ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-600 transition"
            onClick={() => navigate("/signup")}
          >
            Sign In
          </button>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden ml-4">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <ul className="md:hidden bg-white px-4 py-4 space-y-3 shadow-md text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="hover:text-blue-600 cursor-pointer">Doctors</li>
          <li className="hover:text-blue-600 cursor-pointer">Appointments</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          <li>
            {user ? (
              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-600 transition"
                onClick={() => navigate("/signup")}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
