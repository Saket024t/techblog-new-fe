import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Helper to format date nicely (e.g., "Nov 29, 2025")
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-white animate-pulse">
        Loading feed...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Latest Posts
      </h1>

      {posts.length === 0 ? (
        <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-xl text-gray-400">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden"
            >
              {/* --- POST HEADER: User Info & Date --- */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-700 bg-gray-800/50">
                <div className="flex items-center space-x-3">
                  {/* Avatar Placeholder */}
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {post.user?.firstName?.charAt(0) || "U"}
                  </div>

                  <div>
                    {/* 🔗 CLICKABLE PROFILE LINK */}
                    <Link
                      to={`/view-profile/${post.user?.id}`}
                      className="text-sm font-semibold text-white hover:text-indigo-400 hover:underline transition"
                    >
                      {post.user?.firstName} {post.user?.lastName}
                    </Link>
                    <p className="text-xs text-gray-400">
                      {formatDate(post.pdate)}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-900/30 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* --- POST CONTENT --- */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-100 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Code Snippet Block (if exists) */}
                {post.code && (
                  <div className="bg-gray-900 p-4 rounded-md overflow-x-auto border border-gray-700 font-mono text-sm text-green-400">
                    <pre>{post.code}</pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
