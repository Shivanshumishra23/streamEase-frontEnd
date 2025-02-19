import React from "react";
import Navbar from "./Navbar";
import "tailwindcss/tailwind.css";

const Pricing = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Pricing Plans</h1>
        <div className="flex flex-wrap justify-center">
          {/* Basic Plan */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 m-4 w-80">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Basic</h2>
            <p className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">$10</p>
            <ul className="text-gray-700 dark:text-gray-300 mb-6">
              <li className="mb-2">✔️ Single Platform Streaming</li>
              <li className="mb-2">✔️ Standard Video Quality</li>
              <li className="mb-2">✔️ Limited Support</li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Choose Basic
            </button>
          </div>
          {/* Standard Plan */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 m-4 w-80">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Standard</h2>
            <p className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">$30</p>
            <ul className="text-gray-700 dark:text-gray-300 mb-6">
              <li className="mb-2">✔️ Multi-Platform Streaming</li>
              <li className="mb-2">✔️ High Video Quality</li>
              <li className="mb-2">✔️ Priority Support</li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Choose Standard
            </button>
          </div>
          {/* Premium Plan */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 m-4 w-80">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Premium</h2>
            <p className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">$50</p>
            <ul className="text-gray-700 dark:text-gray-300 mb-6">
              <li className="mb-2">✔️ Multi-Platform Streaming</li>
              <li className="mb-2">✔️ Ultra High Video Quality</li>
              <li className="mb-2">✔️ 24/7 Support</li>
              <li className="mb-2">✔️ Advanced Analytics</li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Choose Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
