import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white p-4 mt-auto w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Copyright Section */}
          <p className="mb-2 md:mb-0 text-center md:text-left text-gray-400">
            &copy; All rights reserved.
          </p>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
