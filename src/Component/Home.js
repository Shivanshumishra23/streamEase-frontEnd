import React, { useContext } from "react";
import Navbar from "./Navbar";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { DarkModeContext } from "../context/DarkModeContext";

const Home = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <Navbar />
      {/* Hero Section */}
      <section className={`relative h-[60vh] flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`${isDarkMode ? "bg-gradient-to-r from-purple-800 via-blue-900 to-black" : "bg-gray-50 bg-streamEase-gradient "} absolute inset-0 opacity-75`}></div>
        </div>
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 drop-shadow-lg">
            Welcome !! Let's start Streaming with StreamEase
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
            Stream seamlessly to multiple platforms with ease.
          </p>
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`feature ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg hover:shadow-xl rounded-lg p-6 text-center transition duration-300`}>
            <i className="fas fa-sync-alt text-blue-500 text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">Multi-Platform Streaming</h3>
            <p>Stream to multiple platforms simultaneously with our easy-to-use interface.</p>
          </div>
          <div className={`feature ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg hover:shadow-xl rounded-lg p-6 text-center transition duration-300`}>
            <i className="fas fa-video text-green-500 text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">High Quality</h3>
            <p>Experience ultra high-definition streaming with low latency.</p>
          </div>
          <div className={`feature ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg hover:shadow-xl rounded-lg p-6 text-center transition duration-300`}>
            <i className="fas fa-user-friends text-purple-500 text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">User-Friendly</h3>
            <p>Our platform is designed to be intuitive and easy to use for everyone.</p>
          </div>
        </div>
      </section>
      {/* Multistream Section */}
      <section className={`py-16 flex flex-col md:flex-row items-center ${isDarkMode ? "bg-gray-700 text-white" : "bg-[#F8F9FA]"}`}>
        <div className="w-full md:w-1/2">
          <img
            className=""
            src="https://streamyard.com/next-static/_next/static/images/learn_more_image_multistreaming-8d6b2afe07ea5ce2c0386f9bb320c232.webp"
            alt="Multistreaming"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <h2 className="text-4xl font-bold mb-4">
            Multistream to all platforms at once
          </h2>
          <p className="text-lg mb-4">
            Stream to Facebook, YouTube, Instagram, LinkedIn, X (Twitter),
            Twitch, and more. Make your audience feel special by featuring their
            comments on screen.
          </p>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className={`py-20 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Us Today</h2>
          <p className="text-xl mb-8">
            Start your streaming journey with StreamEase. Stream with Simplicity
            and Ease.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
