import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Toast from "./Toast"; // Import Toast

function Login() {
  const navigate = useNavigate();

  // Define initial state constant for easy resetting
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (location.state?.message) {
      setToast({
        show: true,
        message: location.state.message,
        type: "warning",
      });
      // Clear state so message doesn't persist on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.password) tempErrors.password = "Password is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Token:", data.token);
        console.log("User Data:", data.user);

        // 1. Store the Token (For API calls)
        localStorage.setItem("token", data.token);

        // 2. Store the User Data (For UI Display)
        // We must convert the Object to a String to save in LocalStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        setToast({ show: true, message: "Login Successful!", type: "success" });

        // Navigate after short delay
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        const result = await response.json();
        setErrors({ errorMessage: result.error || "Login failed" });
        setToast({
          show: true,
          message: result.message || "Invalid Credentials",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ errorMessage: "Network Error. Is Spring Boot running?" });
      setToast({
        show: true,
        message: "Network Error. Is Spring Boot running?",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-10 w-1/2 mx-auto my-5 rounded-md">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col content-center">
          {/* --- Email --- */}
          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <div className="mt-1">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 outline-white/10 focus-within:outline-indigo-500">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="123@abc.com"
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* --- Password --- */}
          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="mt-1">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 outline-white/10 focus-within:outline-indigo-500">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*****"
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>

        {/* Global Error Message */}
        {errors.errorMessage && (
          <div className="text-center text-red-500 text-sm my-2 p-2 bg-gray-700 rounded-md border border-red-500/50">
            {errors.errorMessage}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => setFormData(initialState)} // Correct Reset Logic
            className="text-sm font-semibold text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-indigo-500 
              ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-400"
              }`}
          >
            {isSubmitting ? "Logging in..." : "Login"} {/* Changed Text */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
