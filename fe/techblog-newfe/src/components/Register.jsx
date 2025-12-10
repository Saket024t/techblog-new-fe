import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // 1. State for Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    about: "",
  });

  const navigate = useNavigate();

  // 2. State for Validation Errors
  const [errors, setErrors] = useState({});

  // 3. State for Loading Status (UX)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 4. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // 5. Validation Logic
  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.gender) tempErrors.gender = "Please select a gender";

    // Simple Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    setErrors(tempErrors);
    // Returns true if no keys in tempErrors
    return Object.keys(tempErrors).length === 0;
  };

  // 6. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!validate()) return; // Stop if validation fails

    setIsSubmitting(true); // Start loading

    try {
      // Replace with your actual Spring Boot Endpoint
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
        // Optional: Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          gender: "",
          about: "",
        });
      } else {
        const result = await response.json();
        setErrors({ errorMessage: result.error });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network Error. Is Spring Boot running?");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="bg-gray-800 p-10 w-1/2 mx-auto my-5 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col content-center">
          {/* --- First Name --- */}
          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white"
            >
              First Name
            </label>
            <div className="mt-1">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 outline-white/10 focus-within:outline-indigo-500">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
          </div>

          {/* --- Last Name --- */}
          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <div className="mt-1">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 outline-white/10 focus-within:outline-indigo-500">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Smith"
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white focus:outline-none sm:text-sm"
                />
              </div>
              {/* Error Message Display */}
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

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

          {/* --- Gender --- */}
          <div className="sm:col-span-4 mb-3">
            <label className="block text-sm font-medium text-white">
              Gender
            </label>
            <div className="mt-1 flex space-x-6">
              <div className="flex items-center">
                <input
                  id="gender-male"
                  name="gender"
                  type="radio"
                  value="male"
                  onChange={handleChange}
                  checked={formData.gender === "male"}
                  className="h-4 w-4 border-gray-600 bg-gray-800 text-indigo-600 focus:ring-indigo-900"
                />
                <label
                  htmlFor="gender-male"
                  className="ml-3 block text-sm font-medium text-white"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="gender-female"
                  name="gender"
                  type="radio"
                  value="female"
                  onChange={handleChange}
                  checked={formData.gender === "female"}
                  className="h-4 w-4 border-gray-600 bg-gray-800 text-indigo-600 focus:ring-indigo-900"
                />
                <label
                  htmlFor="gender-female"
                  className="ml-3 block text-sm font-medium text-white"
                >
                  Female
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* --- About --- */}
          <div className="col-span-full mb-3">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-white"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows="2"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write a few sentences about yourself."
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        {errors.errorMessage && (
          <div className=" text-center text-red-500 text-sm my-2 mx-7  p-2 mx-auto bg-opacity-50 rounded-4xl border-gray-900 bg-gray-600">
            {errors.errorMessage}
          </div>
        )}

        {/* --- Buttons --- */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => setFormData({})}
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
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
