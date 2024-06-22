// // Dashboard.js
// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { FaVideoSlash } from "react-icons/fa";
// import "tailwindcss/tailwind.css";
// import useStreamingLogic from "./Logic";
// import { Axios } from "../axios/axios";
// import { isAuthenticated } from "../utils/api";

// const Dashboard = () => {
//   const {
//     userVideo,
//     media,
//     mediaRecorder,
//     youtubeKey,
//     facebookKey,
//     instagramKey,
//     platform,
//     error,
//     message,
//     setYoutubeKey,
//     setFacebookKey,
//     setInstagramKey,
//     setPlatform,
//     startStream,
//     stopStream,
//     getMedia,
//     stopMedia,
//   } = useStreamingLogic();

//   const users = isAuthenticated();
//  const [allPlateformData, setAllPlateformData] = useState([]);
//  const [Toggle1,setToggle1] = useState(false);
//  const [Toggle2,setToggle2] = useState(false);
//  const [Toggle3,setToggle3] = useState(false);
//   useEffect(() => {
//     const fetchKeys = async () => {
//       try {
//         const response = await Axios.get("/users/getAllStreamkeys", {
//           headers: {
//             Authorization: `Bearer ${users?.accessToken}`,
//           },
//         });

//         if (response.status === 200) {
//           const data = response.data;
//           setAllPlateformData(data.platforms)
//           if (data.platforms && data.platforms.length > 0) {
//             // Assuming platforms are returned in a consistent order (YouTube, Facebook, Instagram)
//             setYoutubeKey(data.platforms[0]?.key || "");
//             setFacebookKey(data.platforms[1]?.key || "");
//             setInstagramKey(allPlateformData[2]?.key || "");

//           } else {
//             console.error("Error: No platforms data found in response");
//             // Handle the case where platforms data is empty or undefined
//             // You can set default values or show an error message to the user
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching stream keys:", error);
//       }
//     };

//     fetchKeys();
//   }, []);

//   const handleToggleofYoutube = () => {
//     if (allPlateformData[0]?.key) {
//       if (platform.includes("YouTube")) {
//         setPlatform(platform.filter((p) => p !== "YouTube"));

//         setToggle1(true);
//       } else {
//         setPlatform([...platform, "YouTube"]);

//         setToggle1(false);
//       }
//     } else {
//       console.log("YouTube stream key not available.");
//       // Optionally show an error message or disable the toggle button
//     }
//   };

//   const handleToggleofFacebook = () => {
//     if (allPlateformData[1]?.key) {
//       if (platform.includes("Facebook")) {
//         setPlatform(platform.filter((p) => p !== "Facebook"));

//         setToggle2(true);
//       } else {
//         setPlatform([...platform, "Facebook"]);

//         setToggle2(true);
//       }
//     } else {
//       console.log("Facebook stream key not available.");
//       // Optionally show an error message or disable the toggle button
//     }
//   };

//   const handleToggleofInstagram = () => {
//     if (allPlateformData[2]?.key) {
//       if (platform.includes("Instagram")) {
//         setPlatform(platform.filter((p) => p !== "Instagram"));

//         setToggle3(true);
//       } else {
//         setPlatform([...platform, "Instagram"]);

//         setToggle3(true);
//       }
//     } else {
//       console.log("Instagram stream key not available.");
//       // Optionally show an error message or disable the toggle button
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
//         <div className="container mx-auto p-4 text-center">
//           <div className="flex flex-col justify-center items-center">
//             <h1 className="text-4xl text-center font-bold mb-4 text-gray-900 dark:text-gray-100">
//               Let's Start Streaming
//             </h1>
//             {message && (
//               <div
//                 className="bg-blue-100 dark:bg-blue-900 border border-blue-400 text-blue-700 dark:text-blue-300 px-4 py-3 rounded mb-4 w-full max-w-lg text-center"
//                 role="alert"
//               >
//                 {message}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col items-center mb-4">
//             {media ? (
//               <video
//                 ref={userVideo}
//                 autoPlay
//                 muted
//                 className="w-full max-w-lg mb-4 rounded shadow"
//               ></video>
//             ) : (
//               <div className="w-full max-w-lg mb-4 rounded shadow flex items-center justify-center h-64 bg-gray-200 dark:bg-gray-700">
//                 <div className="text-gray-600 dark:text-gray-300 text-center">
//                   <FaVideoSlash size={48} className="mb-4" />
//                   <p>Your video is off</p>
//                 </div>
//               </div>
//             )}
//             <div className="flex space-x-2 mb-4">
//               <button
//                 onClick={getMedia}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Start Camera
//               </button>
//               <button
//                 onClick={stopMedia}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded"
//               >
//                 Stop Camera
//               </button>
//             </div>
//             {/* <div className="lg:flex gap-2">
//               <select
//                 onChange={(e) => setPlatform(e.target.value)}
//                 value={platform}
//                 className="mb-2 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
//               >
//                 <option value="">Select Platform</option>
//                 <option value="YouTube">YouTube</option>
//                 <option value="Facebook">Facebook</option>
//                 <option value="Instagram">Instagram</option>
//                 <option value="YouTube,Facebook">YouTube & Facebook</option>
//                 <option value="YouTube,Instagram">YouTube & Instagram</option>
//                 <option value="Facebook,Instagram">Facebook & Instagram</option>
//                 <option value="YouTube,Facebook,Instagram">
//                   YouTube, Facebook & Instagram
//                 </option>
//               </select>
//               {error.platform && (
//                 <div className="text-red-500 text-sm dark:text-red-300">{error.platform}</div>
//               )}
//               {platform.includes("YouTube") && (
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="YouTube Stream Key"
//                     value={youtubeKey}
//                     onChange={(e) => setYoutubeKey(e.target.value)}
//                     className="mb-2 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
//                   />
//                   {error.youtube && (
//                     <div className="text-red-500 text-sm dark:text-red-300">{error.youtube}</div>
//                   )}
//                 </div>
//               )}
//               {platform.includes("Facebook") && (
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Facebook Stream Key"
//                     value={facebookKey}
//                     onChange={(e) => setFacebookKey(e.target.value)}
//                     className="mb-2 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
//                   />
//                   {error.facebook && (
//                     <div className="text-red-500 text-sm dark:text-red-300">{error.facebook}</div>
//                   )}
//                 </div>
//               )}
//               {platform.includes("Instagram") && (
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Instagram Stream Key"
//                     value={instagramKey}
//                     onChange={(e) => setInstagramKey(e.target.value)}
//                     className="mb-2 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
//                   />
//                   {error.instagram && (
//                     <div className="text-red-500 text-sm dark:text-red-300">
//                       {error.instagram}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div> */}
//             <div className="flex space-x-2">
//               <button
//                 onClick={startStream}
//                 disabled={mediaRecorder !== null}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Start Stream
//               </button>
//               <button
//                 onClick={stopStream}
//                 disabled={mediaRecorder === null}
//                 className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Stop Stream
//               </button>
//             </div>
//             <button onClick={handleToggleofYoutube}>Toggle YouTube</button>
//             <button onClick={handleToggleofFacebook}>Toggle Facebook</button>
//             <button onClick={handleToggleofInstagram}>Toggle Instagram</button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  FaVideoSlash,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import "tailwindcss/tailwind.css";
import useStreamingLogic from "./Logic";
import { Axios } from "../axios/axios";
import { isAuthenticated } from "../utils/api";
import { Link } from "react-router-dom";
import Confetti from 'react-dom-confetti';
const Dashboard = () => {
  const {
    userVideo,
    media,
    mediaRecorder,
    youtubeKey,
    facebookKey,
    instagramKey,
    platform,
    error,
    message,
    setYoutubeKey,
    setFacebookKey,
    setInstagramKey,
    setPlatform,
    startStream,
    stopStream,
    getMedia,
    stopMedia,
    celebration,
    setCelebration,
  } = useStreamingLogic();



const config = {
  angle: "7",
  spread: 360,
  startVelocity: "35",
  elementCount: "200",
  dragFriction: 0.12,
  duration: 4000,
  stagger: "1",
  width: "12px",
  height: "10px",
  perspective: "595px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};


  const users = isAuthenticated();
  const [allPlateformData, setAllPlateformData] = useState([]);
  const [toggleYoutube, setToggleYoutube] = useState(false);
  const [toggleFacebook, setToggleFacebook] = useState(false);
  const [toggleInstagram, setToggleInstagram] = useState(false);

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
          setAllPlateformData(data.platforms);
          if (data.platforms && data.platforms.length > 0) {
            setYoutubeKey(data.platforms[0]?.key || "");
            setFacebookKey(data.platforms[1]?.key || "");
            setInstagramKey(data.platforms[2]?.key || "");
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

  const handleToggleofYoutube = () => {
    if (allPlateformData[0]?.key) {
      if (platform.includes("YouTube")) {
        setPlatform(platform.filter((p) => p !== "YouTube"));
        setToggleYoutube(false);
      } else {
        setPlatform([...platform, "YouTube"]);
        setToggleYoutube(true);
      }
    } else {
      console.log("YouTube stream key not available.");
    }
  };

  const handleToggleofFacebook = () => {
    if (allPlateformData[1]?.key) {
      if (platform.includes("Facebook")) {
        setPlatform(platform.filter((p) => p !== "Facebook"));
        setToggleFacebook(false);
      } else {
        setPlatform([...platform, "Facebook"]);
        setToggleFacebook(true);
      }
    } else {
      console.log("Facebook stream key not available.");
    }
  };

  const handleToggleofInstagram = () => {
    if (allPlateformData[2]?.key) {
      if (platform.includes("Instagram")) {
        setPlatform(platform.filter((p) => p !== "Instagram"));
        setToggleInstagram(false);
      } else {
        setPlatform([...platform, "Instagram"]);
        setToggleInstagram(true);
      }
    } else {
      console.log("Instagram stream key not available.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
        <div className="container mx-auto p-4 text-center">
          <div className="flex justify-evenly items-center text-center ">
          <h1 className="text-4xl text-center font-bold mb-8 text-gray-900 dark:text-gray-100">
            Let's Start Streaming
           
          </h1>
          <div className=" ">
                <Link to="/dashboard/keys">
                  <button className="flex justify-end items-end w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Manage Stream Keys
                  </button>
                </Link>
              </div>
          </div>
          
          <div className="flex justify-center items-center">
          {message && (
            <div
              className="bg-blue-100 dark:bg-blue-900 border border-blue-400 text-blue-700 dark:text-blue-300 px-4 py-3 rounded mb-4 w-full max-w-lg text-center"
              role="alert"
            >
              {message}
              
            </div>
             
          )}
          <Confetti active={ celebration } config={ config }/>
          </div>
          
          
          
          
          <div className="flex  md:flex-row justify-center items-start p-4">
            <div className="w-full md:w-1/2 flex flex-col items-end">
              {media ? (
                <video
                  ref={userVideo}
                  autoPlay
                  muted
                  className="w-full max-w-lg mb-4 rounded-lg shadow-lg"
                ></video>
              ) : (
                <div className="w-full max-w-lg mb-4 rounded-lg shadow-lg flex items-center justify-center h-80 bg-gray-200 dark:bg-gray-700">
                  <div className="text-gray-600 dark:text-gray-300 text-center">
                    <FaVideoSlash size={52} className="mb-4" />
                    <p>Your video is off</p>
                  </div>
                </div>
              )}
              <div className="w-full max-w-lg p-6 dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="flex space-x-6">
                  <button
                    onClick={getMedia}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg shadow disabled:opacity-50 hover:bg-blue-600 transition duration-300"
                  >
                    Start Camera
                  </button>
                  <button
                    onClick={stopMedia}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg shadow disabled:opacity-50 hover:bg-red-600 transition duration-300"
                  >
                    Stop Camera
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
              <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Add Platform
                </h2>
                <div className="flex flex-col space-y-6">
                  <button
                    onClick={handleToggleofYoutube}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg shadow transition duration-300 ${
                      toggleYoutube
                        ? "bg-red-600 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    <FaYoutube className="mr-2" />
                    <span className="flex-1 text-left">
                      {toggleYoutube ? "YouTube (On)" : "YouTube (Off)"}
                    </span>
                    {toggleYoutube ? (
                      <FaCheckCircle className="text-green-300" />
                    ) : (
                      <FaTimesCircle className="text-red-300" />
                    )}
                  </button>
                  <button
                    onClick={handleToggleofFacebook}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg shadow transition duration-300 ${
                      toggleFacebook
                        ? "bg-blue-600 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    <FaFacebook className="mr-2" />
                    <span className="flex-1 text-left">
                      {toggleFacebook ? "Facebook (On)" : "Facebook (Off)"}
                    </span>
                    {toggleFacebook ? (
                      <FaCheckCircle className="text-green-300" />
                    ) : (
                      <FaTimesCircle className="text-red-300" />
                    )}
                  </button>
                  <button
                    onClick={handleToggleofInstagram}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg shadow transition duration-300 ${
                      toggleInstagram
                        ? "bg-purple-600 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    <FaInstagram className="mr-2" />
                    <span className="flex-1 text-left">
                      {toggleInstagram ? "Instagram (On)" : "Instagram (Off)"}
                    </span>
                    {toggleInstagram ? (
                      <FaCheckCircle className="text-green-300" />
                    ) : (
                      <FaTimesCircle className="text-red-300" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Stream Controls
                </h2>
                <div className="flex space-x-6">
                  <button
                    onClick={startStream}
                    disabled={mediaRecorder !== null}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg shadow disabled:opacity-50 hover:bg-blue-600 transition duration-300"
                  >
                    Start Stream
                  </button>
                  <button
                    onClick={stopStream}
                    disabled={mediaRecorder === null}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg shadow disabled:opacity-50 hover:bg-red-600 transition duration-300"
                  >
                    Stop Stream
                  </button>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
