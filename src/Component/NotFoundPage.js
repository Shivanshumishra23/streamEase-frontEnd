import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import notFoundGif from "../assets/notFoundGif.png";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center">
        <img
          src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
          alt="Page Not Found"
          className="w-64 mx-auto mb-8"
        />
        <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
