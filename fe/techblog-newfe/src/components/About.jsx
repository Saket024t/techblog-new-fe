import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            About <span className="text-indigo-400">TechBlog</span>
          </h1>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded"></div>
        </div>

        {/* Content Card */}
        <div className="bg-gray-800 shadow-xl rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-8 space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              <strong className="text-white text-xl block mb-2">
                Our Mission
              </strong>
              TechBlog was born out of a simple idea: developers need a clean,
              distraction-free space to share knowledge. In a world of complex
              algorithms and paid walls, we believe in the open exchange of
              coding ideas. Whether you are debugging a complex Spring Boot
              error or figuring out React hooks, TechBlog is your digital
              notebook shared with the world.
            </p>

            <hr className="border-gray-700 my-6" />

            <p>
              <strong className="text-white text-xl block mb-2">
                The Technology Stack
              </strong>
              This platform isn't just a blog; it's a demonstration of modern
              Full Stack development. It is built using a robust{" "}
              <strong>Spring Boot 3</strong> backend secured with{" "}
              <strong>JWT Authentication</strong> and strict role-based access
              control. The frontend is powered by <strong>React 18</strong> and
              styled with <strong>Tailwind CSS</strong> to ensure a responsive,
              lightning-fast user experience.
            </p>

            <p>
              We prioritize security and performance, ensuring your data is
              encrypted and your reading experience is seamless.
            </p>

            <hr className="border-gray-700 my-6" />

            <p>
              <strong className="text-white text-xl block mb-2">
                Join the Community
              </strong>
              TechBlog is more than code; it's about the people who write it. By
              joining, you become part of a network of learners and mentors.
              Create your profile today, start writing, and leave your mark on
              the developer community.
            </p>
          </div>

          <div className="bg-gray-900/50 px-8 py-4 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-500">
              Designed & Developed by{" "}
              <span className="text-indigo-400 font-semibold">Saket Kadu</span>{" "}
              © 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
