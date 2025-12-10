import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' or 'edit'

  // Edit Form State
  const [formData, setFormData] = useState({});
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. Fetch User Data & Posts ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Load User from Storage (Fast)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }

    // Fetch My Posts from Backend
    fetchMyPosts(token);
  }, [navigate]);

  const fetchMyPosts = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/posts/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMyPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // --- 2. Delete Post Handler ---
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        // Remove from UI immediately
        setMyPosts(myPosts.filter((post) => post.id !== postId));
        alert("Post deleted successfully.");
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // --- 3. Update Profile Handler ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setStatusMessage({ message: "Profile updated!", type: "success" });
      } else {
        setStatusMessage({ message: "Update failed.", type: "error" });
      }
    } catch (error) {
      setStatusMessage({ message: "Network error.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Helper: Get Initials ---
  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return "U";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* --- Header Section --- */}
      <div className="bg-gray-800 shadow-lg pb-8">
        <div className="max-w-4xl mx-auto px-4 pt-10">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold border-4 border-gray-900 shadow-xl">
              {getInitials()}
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-indigo-400">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                {user.about || "No bio added yet."}
              </p>
            </div>

            {/* Stats (Optional) */}
            <div className="text-center bg-gray-700/50 p-3 rounded-lg">
              <span className="block text-2xl font-bold text-white">
                {myPosts.length}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Posts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Tabs Navigation --- */}
      <div className="max-w-4xl mx-auto px-4 mt-8 border-b border-gray-700 flex space-x-8">
        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-4 text-sm font-medium transition-colors ${
            activeTab === "posts"
              ? "text-indigo-500 border-b-2 border-indigo-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className={`pb-4 text-sm font-medium transition-colors ${
            activeTab === "edit"
              ? "text-indigo-500 border-b-2 border-indigo-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Edit Profile
        </button>
      </div>

      {/* --- Content Area --- */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* TAB: MY POSTS */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            {myPosts.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 mb-4">
                  You haven't posted anything yet.
                </p>
                <Link
                  to="/create-post"
                  className="text-indigo-400 hover:underline"
                >
                  Go create your first post!
                </Link>
              </div>
            ) : (
              myPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2 mb-3">
                      {post.content}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="bg-gray-700 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span>{new Date(post.pdate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="ml-4 p-2 text-red-400 hover:bg-red-900/30 rounded-full transition"
                    title="Delete Post"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB: EDIT PROFILE */}
        {activeTab === "edit" && (
          <div className="bg-gray-800 p-8 rounded-lg shadow border border-gray-700">
            {statusMessage.message && (
              <div
                className={`p-3 mb-6 rounded text-sm ${
                  statusMessage.type === "success"
                    ? "bg-green-900/50 text-green-300 border border-green-800"
                    : "bg-red-900/50 text-red-300 border border-red-800"
                }`}
              >
                {statusMessage.message}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  About
                </label>
                <textarea
                  name="about"
                  rows="4"
                  value={formData.about || ""}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
