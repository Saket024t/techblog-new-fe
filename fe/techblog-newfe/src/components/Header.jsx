import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast"; // Import Toast

export default function Header() {
  const navigate = useNavigate();

  // State to track if the user is currently authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to display the user's name
  const [userName, setUserName] = useState("");

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Check localStorage when component mounts or relevant data changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (token && userString) {
      setIsLoggedIn(true);
      const user = JSON.parse(userString);
      setUserName(user.firstName);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [navigate]); // Re-run check when navigation happens (useful after login/logout)

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    // ✅ 1. Show Logout Message FIRST
    setToast({ show: true, message: "Logging out...", type: "info" });

    // ✅ 2. Clear data and Redirect after delay
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    }, 800); // 1.5 second delay
  };

  // --- Conditional Rendering of Links ---
  const AuthLinks = (
    <>
      <Link
        to="/profile"
        className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
      >
        Hi, {userName || "User"}!
      </Link>
      <Link
        to="/create-post"
        className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
      >
        Post
      </Link>
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 ml-4"
      >
        Logout
      </button>
    </>
  );

  const GuestLinks = (
    <>
      <Link
        to="/login"
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-500 ml-4"
      >
        Register
      </Link>
    </>
  );

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/App Name */}
            <div className="flex items-center">
              <Link to="/" className="text-white text-xl font-bold">
                TechBlog
              </Link>

              <div className="ml-3 flex items-baseline space-x-4">
                <Link
                  to="/home"
                  className="px-2 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="px-2 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex"></div>

            {/* Auth Links (CONDITIONAL RENDERING HERE) */}
            <div className="flex items-center">
              {isLoggedIn ? AuthLinks : GuestLinks}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
