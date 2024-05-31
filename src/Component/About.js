import React from "react";
import Navbar from "./Navbar";
import "tailwindcss/tailwind.css";
import Footer from "./Footer";
import my_photo from "../assets/my_photo.png";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-8 mt-8">
          <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to our StreamEase web app! Our mission is to provide a
            seamless and user-friendly platform for live streaming across
            multiple social media channels. Whether you're streaming to YouTube,
            Facebook, or both, our tool is designed to make the process as
            simple and efficient as possible.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our platform allows you to start and stop streams with ease, manage
            multiple streaming keys, and ensures high-quality audio and video
            transmission. We are committed to continually improving our service
            and adding new features to enhance your live streaming experience.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            If you have any questions or feedback, feel free to reach out to us.
            Thank you for choosing our platform for your live streaming needs!
          </p>
          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={my_photo}
                alt="Our Team"
                className="w-36 h-36 rounded-full shadow-md"
              />
              <h2 className="text-2xl font-semibold text-gray-800">Our Team</h2>
              <p className="text-gray-600">
                We are a team of passionate developers dedicated to providing
                the best live streaming experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
