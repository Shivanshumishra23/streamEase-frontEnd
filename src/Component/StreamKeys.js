import React, { useState, useEffect } from "react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "tailwindcss/tailwind.css";
import Navbar from "./Navbar";
import { isAuthenticated } from "../utils/api";
import { Axios } from "../axios/axios";
import { Link } from "react-router-dom";

const users = isAuthenticated();

const StreamKeys = () => {
  const [youtubeKey, setYoutubeKey] = useState("");
  const [facebookKey, setFacebookKey] = useState("");
  const [instagramKey, setInstagramKey] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState({
    youtube: false,
    facebook: false,
    instagram: false,
  });

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await Axios.get("/users/getAllStreamkeys", {
          headers: {
            Authorization: `Bearer ${users?.accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          if (data.platforms && data.platforms.length > 0) {
            // Assuming platforms are returned in a consistent order (YouTube, Facebook, Instagram)
            setYoutubeKey(data.platforms[0].key || "");
            setFacebookKey(data.platforms[1].key || "");
            setInstagramKey(data.platforms[2].key || "");
          } else {
            console.error("Error: No platforms data found in response");
          }
        }
      } catch (error) {
        console.error("Error fetching stream keys:", error);
      }
    };

    fetchKeys();
  }, []);

  const handleSaveYoutubeKey = async () => {
    try {
      const response = await Axios.patch(
        "/users/update-youtubeStreamkey",
        { YouTube: youtubeKey },
        {
          headers: {
            Authorization: `Bearer ${users?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("YouTube Stream key saved successfully!");
      } else {
        const data = response.data;
        setMessage(
          data.error || "An error occurred while saving the YouTube stream key."
        );
      }
    } catch (error) {
      console.error("Error saving YouTube stream key:", error);
      setMessage("An error occurred while saving the YouTube stream key.");
    }

    setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
  };

  const handleSaveFacebookKey = async () => {
    try {
      const response = await Axios.patch(
        "/users/update-facebookStreamkey",
        { Facebook: facebookKey },
        {
          headers: {
            Authorization: `Bearer ${users?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Facebook Stream key saved successfully!");
      } else {
        const data = response.data;
        setMessage(
          data.error ||
            "An error occurred while saving the Facebook stream key."
        );
      }
    } catch (error) {
      console.error("Error saving Facebook stream key:", error);
      setMessage("An error occurred while saving the Facebook stream key.");
    }

    setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
  };

  const handleSaveInstagramKey = async () => {
    try {
      const response = await Axios.patch(
        "/users/update-instaStreamkey",
        { Instagram: instagramKey },
        {
          headers: {
            Authorization: `Bearer ${users?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Instagram Stream key saved successfully!");
      } else {
        const data = response.data;
        setMessage(
          data.error ||
            "An error occurred while saving the Instagram stream key."
        );
      }
    } catch (error) {
      console.error("Error saving Instagram stream key:", error);
      setMessage("An error occurred while saving the Instagram stream key.");
    }

    setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
  };

  const handleCopy = (platform) => {
    setCopied({ ...copied, [platform]: true });
    setTimeout(() => setCopied({ ...copied, [platform]: false }), 3000);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
        <div className="container mx-auto  p-4 text-center">
          <h1 className="text-4xl text-center font-bold mb-4 text-gray-900 dark:text-gray-100">
            Manage Your Stream Keys
          </h1>
          {message && (
            <div
              className="bg-blue-100 dark:bg-blue-900 border border-blue-400 text-blue-700 dark:text-blue-300 px-4 py-3 rounded mb-4 w-full max-w-lg text-center"
              role="alert"
            >
              {message}
            </div>
          )}
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg gap-10 shadow-lg p-6 mb-8 flex">
              <div className="w-1/3 flex justify-center items-center">
                <img
                  src="https://streamyard.com/next-static/_next/static/images/learn_more_image_branding-257307338926f25de528af2082cc817b.webp"
                  alt="Streaming"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Add Your Stream Keys
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Start streaming easily by adding your stream keys below. Once
                  added, you can manage your streaming settings from the
                  dashboard.
                </p>
                <Link to="/dashboard">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200">
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4">
              <div className="flex items-center mb-4">
                <FaYoutube size={32} className="text-red-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  YouTube
                </h2>
              </div>
              <input
                type="text"
                placeholder="YouTube Stream Key"
                value={youtubeKey}
                onChange={(e) => setYoutubeKey(e.target.value)}
                className="mb-2 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-300"
              />
              <CopyToClipboard
                text={youtubeKey}
                onCopy={() => handleCopy("youtube")}
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                  {copied.youtube ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
              <button
                onClick={handleSaveYoutubeKey}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Save YouTube Key
              </button>
            </div>
            <div className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4">
              <div className="flex items-center mb-4">
                <FaFacebook size={32} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Facebook
                </h2>
              </div>
              <input
                type="text"
                placeholder="Facebook Stream Key"
                value={facebookKey}
                onChange={(e) => setFacebookKey(e.target.value)}
                className="mb-2 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-300"
              />
              <CopyToClipboard
                text={facebookKey}
                onCopy={() => handleCopy("facebook")}
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                  {copied.facebook ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
              <button
                onClick={handleSaveFacebookKey}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Save Facebook Key
              </button>
            </div>
            <div className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4">
              <div className="flex items-center mb-4">
                <FaInstagram size={32} className="text-pink-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Instagram
                </h2>
              </div>
              <input
                type="text"
                placeholder="Instagram Stream Key"
                value={instagramKey}
                onChange={(e) => setInstagramKey(e.target.value)}
                className="mb-2 p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-300"
              />
              <CopyToClipboard
                text={instagramKey}
                onCopy={() => handleCopy("instagram")}
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                  {copied.instagram ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
              <button
                onClick={handleSaveInstagramKey}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Save Instagram Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamKeys;
