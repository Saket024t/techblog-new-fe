import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Welcome to TechBlog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            The ultimate platform for developers to share knowledge, showcase
            code, and connect with the tech community.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition duration-200 shadow-lg hover:shadow-indigo-500/30"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg transition duration-200 border border-gray-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Why Join TechBlog?
            </h2>
            <p className="mt-2 text-gray-400">
              Everything you need to grow as a developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition duration-300">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Share Code Snippets</h3>
              <p className="text-gray-400">
                Don't just write text. Share formatted code blocks with syntax
                highlighting to help others solve problems efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition duration-300">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Build Your Profile</h3>
              <p className="text-gray-400">
                Create a professional developer profile. Showcase your best
                posts and establish yourself as a thought leader.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition duration-300">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get the latest insights on React, Spring Boot, Python, and more
                from a community of passionate developers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
