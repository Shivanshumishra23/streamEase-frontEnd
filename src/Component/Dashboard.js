import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import { FaVideoSlash } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const socket = io('https://streamease-server.vercel.app', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});


const Dashboard = () => {
  const userVideo = useRef(null);
  const [media, setMedia] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [youtubeKey, setYoutubeKey] = useState("");
  const [facebookKey, setFacebookKey] = useState("");
  const [instagramKey, setInstagramKey] = useState("");
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState({
    youtube: "",
    facebook: "",
    instagram: "",
    platform: "",
  });
  const [message, setMessage] = useState("");

  const setErrorWithTimeout = (newError) => {
    setError(newError);
    setTimeout(() => {
      setError({ youtube: "", facebook: "", instagram: "", platform: "" });
    }, 20000); // 20 seconds
  };

  const startStream = async () => {
    let hasError = false;
    const newError = { youtube: "", facebook: "", instagram: "", platform: "" };

    if (!platform) {
      newError.platform = "Please select a platform";
      hasError = true;
    }

    if (platform.includes("YouTube") && !youtubeKey) {
      newError.youtube = "Please enter the YouTube stream key";
      hasError = true;
    }

    if (platform.includes("Facebook") && !facebookKey) {
      newError.facebook = "Please enter the Facebook stream key";
      hasError = true;
    }

    if (platform.includes("Instagram") && !instagramKey) {
      newError.instagram = "Please enter the Instagram stream key";
      hasError = true;
    }

    if (hasError) {
      setErrorWithTimeout(newError);
      return;
    }

    if (media && platform) {
      const streamKeys = {};
      if (platform.includes("YouTube")) streamKeys.youtubeKey = youtubeKey;
      if (platform.includes("Facebook")) streamKeys.facebookKey = facebookKey;
      if (platform.includes("Instagram"))
        streamKeys.instagramKey = instagramKey;

      const response = await fetch("https://streamease-server.vercel.app/start-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform, streamKeys }),
      });

      if (response.ok) {
        const recorder = new MediaRecorder(media, {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
          framerate: 25,
        });

        recorder.ondataavailable = (ev) => {
          console.log("Binary Stream Available", ev.data);
          socket.emit("binarystream", ev.data);
        };

        recorder.start(25);
        setMediaRecorder(recorder);
        setMessage("Streaming started! You are live now.");
        setTimeout(() => setMessage(""), 10000); // Clear message after 10 seconds
      } else {
        console.error("Failed to start streaming");
      }
    }
  };

  const stopStream = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      await fetch("https://streamease-server.vercel.app/stop-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform }),
      });
      setMessage("Streaming stopped.");
      setTimeout(() => setMessage(""), 10000); // Clear message after 10 seconds
    }
  };

  const getMedia = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMedia(mediaStream);

    // Ensure the video element is rendered before setting srcObject
    if (userVideo.current) {
      userVideo.current.srcObject = mediaStream;
    } else {
      // Use a delay to wait for the video element to be rendered
      const interval = setInterval(() => {
        if (userVideo.current) {
          userVideo.current.srcObject = mediaStream;
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const stopMedia = () => {
    if (media) {
      media.getTracks().forEach((track) => track.stop());
      setMedia(null);
    }
  };

  useEffect(() => {
    if (media && userVideo.current) {
      userVideo.current.srcObject = media;
    }
  }, [media]);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="container mx-auto p-4  ">
          <h1 className="text-4xl text-center font-bold mb-4">
            Let's Start Streaming
          </h1>
          {message && (
            <div
              className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 w-full max-w-lg text-center"
              role="alert"
            >
              {message}
            </div>
          )}
          <div className="flex flex-col items-center mb-4">
            {media ? (
              <video
                ref={userVideo}
                autoPlay
                muted
                className="w-full max-w-lg mb-4 rounded shadow"
              ></video>
            ) : (
              <div className="w-full max-w-lg mb-4 rounded shadow flex items-center justify-center h-64 bg-gray-200">
                <div className="text-gray-600 text-center">
                  <FaVideoSlash size={48} className="mb-4" />
                  <p>Your video is off</p>
                </div>
              </div>
            )}
            <div className="flex space-x-2 mb-4">
              <button
                onClick={getMedia}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Start Camera
              </button>
              <button
                onClick={stopMedia}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Stop Camera
              </button>
            </div>
            <div className="lg:flex gap-2">
              <select
                onChange={(e) => setPlatform(e.target.value)}
                value={platform}
                className="mb-2 p-2 border rounded"
              >
                <option value="">Select Platform</option>
                <option value="YouTube">YouTube</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube,Facebook">YouTube & Facebook</option>
                <option value="YouTube,Instagram">YouTube & Instagram</option>
                <option value="Facebook,Instagram">Facebook & Instagram</option>
                <option value="YouTube,Facebook,Instagram">
                  YouTube, Facebook & Instagram
                </option>
              </select>
              {error.platform && (
                <div className="text-red-500 text-sm">{error.platform}</div>
              )}
              {platform.includes("YouTube") && (
                <div>
                  <input
                    type="text"
                    placeholder="YouTube Stream Key"
                    value={youtubeKey}
                    onChange={(e) => setYoutubeKey(e.target.value)}
                    className="mb-2 p-2 border rounded"
                  />
                  {error.youtube && (
                    <div className="text-red-500 text-sm">{error.youtube}</div>
                  )}
                </div>
              )}
              {platform.includes("Facebook") && (
                <div>
                  <input
                    type="text"
                    placeholder="Facebook Stream Key"
                    value={facebookKey}
                    onChange={(e) => setFacebookKey(e.target.value)}
                    className="mb-2 p-2 border rounded"
                  />
                  {error.facebook && (
                    <div className="text-red-500 text-sm">{error.facebook}</div>
                  )}
                </div>
              )}
              {platform.includes("Instagram") && (
                <div>
                  <input
                    type="text"
                    placeholder="Instagram Stream Key"
                    value={instagramKey}
                    onChange={(e) => setInstagramKey(e.target.value)}
                    className="mb-2 p-2 border rounded"
                  />
                  {error.instagram && (
                    <div className="text-red-500 text-sm">
                      {error.instagram}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={startStream}
                disabled={mediaRecorder !== null}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Start Stream
              </button>
              <button
                onClick={stopStream}
                disabled={mediaRecorder === null}
                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Stop Stream
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
