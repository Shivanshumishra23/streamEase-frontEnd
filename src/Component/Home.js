import React from "react";
import Navbar from "./Navbar";
import "tailwindcss/tailwind.css";

import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-gray-50 ">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-streamEase-gradient text-white h-[60vh] flex items-center justify-center">
        {/* <img src={heroImage} alt="Hero" className="absolute inset-0 object-cover w-full h-full" /> */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Welcome !! Let's start Streaming with StreamEase{" "}
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            Stream seamlessly to multiple platforms with ease.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature bg-white shadow-lg hover:shadow-xl rounded-lg p-6 text-center transition duration-300">
            <i className="fas fa-sync-alt text-blue-500 text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">
              Multi-Platform Streaming
            </h3>
            <p>
              Stream to multiple platforms simultaneously with our easy-to-use
              interface.
            </p>
          </div>
          <div className="feature bg-white shadow-lg hover:shadow-xl rounded-lg p-6 text-center transition duration-300">
            <i className="fas fa-video text-green-500 text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">High Quality</h3>
            <p>Experience ultra high-definition streaming with low latency.</p>
          </div>
          <div className="feature bg-white shadow-lg hover:shadow-xl rounded-lg p-6 text-center transition duration-300">
            <i className="fas fa-user-friends text-purple-500 text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">User-Friendly</h3>
            <p>
              Our platform is designed to be intuitive and easy to use for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Multistream Section */}
      <section className=" bg-[#F8F9FA] py-16 flex flex-col md:flex-row items-center">
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
      <section className="bg-gray-200 py-20">
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
