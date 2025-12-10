import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewProfile() {
  const { userId } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // 1. Fetch Profile Data
        const profileResponse = await fetch(
          `http://localhost:8080/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData);
        } else {
          console.error("Failed to fetch profile");
        }

        // 2. Fetch User's Posts (Requires the new backend endpoint)
        const postsResponse = await fetch(
          `http://localhost:8080/api/posts/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setUserPosts(postsData);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-white animate-pulse">
        Loading Profile...
      </div>
    );

  if (!profile)
    return (
      <div className="text-center mt-20 text-red-400">User not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      {/* --- Profile Card --- */}
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden mb-8">
        <div className="h-32 bg-indigo-600"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-full bg-gray-700 border-4 border-gray-800 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {profile.firstName?.charAt(0).toUpperCase()}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-indigo-400 text-sm mt-1">{profile.email}</p>

          <div className="mt-6 border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-200 mb-2">About</h3>
            <p className="text-gray-400 italic leading-relaxed">
              {profile.about || "This user hasn't written a bio yet."}
            </p>
          </div>

          <div className="mt-6 flex gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-400">Gender:</span>
              <span>{profile.gender || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-400">Joined:</span>
              <span>
                {profile.rdate
                  ? new Date(profile.rdate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- User's Posts Section --- */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-indigo-500 pl-3">
          Posts by {profile.firstName}
        </h2>

        {userPosts.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center text-gray-400">
            {profile.firstName} hasn't posted anything yet.
          </div>
        ) : (
          <div className="space-y-6">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-indigo-400">
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                    {formatDate(post.pdate)}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Optional Code Block */}
                {post.code && (
                  <div className="bg-gray-900 p-3 rounded-md overflow-x-auto border border-gray-700 font-mono text-sm text-green-400 mb-4">
                    <pre>{post.code}</pre>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
