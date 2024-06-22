// Logic.js
import { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { api2, isAuthenticated } from "../utils/api";
import { Axios,Axios2 } from "../axios/axios";

// const token = localStorage.getItem("accessToken"); // Retrieve the access token from localStorage

const users = isAuthenticated();
const socket = io(`${api2}`, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  query: {
    token: users?.accessToken,
  },
});

const useStreamingLogic = () => {
  const userVideo = useRef(null);
  const [media, setMedia] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [youtubeKey, setYoutubeKey] = useState("");
  const [facebookKey, setFacebookKey] = useState("");
  const [instagramKey, setInstagramKey] = useState("");
  const [platform, setPlatform] = useState("");
  const [celebration,setCelebration] = useState(false);
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

      
      try {
       
      
      const response = await fetch(`${api2}/api/v1/users/start-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + users?.accessToken,
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
          setCelebration(true);
          setTimeout(() => setMessage(""), 10000); // Clear message after 10 seconds
        } else {
          console.error("Failed to start streaming:", response.data);
          setErrorWithTimeout({ platform: "Failed to start streaming" });
        }
      } catch (error) {
        console.error("Error starting stream:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
        setErrorWithTimeout({ platform: "Failed to start streaming" });
      }
    }
  };

  const stopStream = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      await fetch(`${api2}/api/v1/users/stop-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + users?.accessToken,
        },
        body: JSON.stringify({ platform }),
      });
      setMessage("Streaming stopped.");
      setCelebration(false);
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

  return {
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
    setCelebration
  };
};

export default useStreamingLogic;

// Logic.js
// import { useRef, useState, useEffect } from "react";
// import io from "socket.io-client";
// import { api2, isAuthenticated } from "../utils/api";

// const users = isAuthenticated();
// const socket = io(`${api2}`, {
//   transports: ["websocket", "polling"],
//   withCredentials: true,
//   query: {
//     token: users?.accessToken,
//   },
// });

// const useStreamingLogic = () => {
//   const userVideo = useRef(null);
//   const [cameraMedia, setCameraMedia] = useState(null);
//   const [screenMedia, setScreenMedia] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [youtubeKey, setYoutubeKey] = useState("");
//   const [facebookKey, setFacebookKey] = useState("");
//   const [instagramKey, setInstagramKey] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [error, setError] = useState({
//     youtube: "",
//     facebook: "",
//     instagram: "",
//     platform: "",
//   });
//   const [message, setMessage] = useState("");

//   const setErrorWithTimeout = (newError) => {
//     setError(newError);
//     setTimeout(() => {
//       setError({ youtube: "", facebook: "", instagram: "", platform: "" });
//     }, 20000); // 20 seconds
//   };

//   const startStream = async (stream) => {
//     let hasError = false;
//     const newError = { youtube: "", facebook: "", instagram: "", platform: "" };

//     if (!platform) {
//       newError.platform = "Please select a platform";
//       hasError = true;
//     }

//     if (platform.includes("YouTube") && !youtubeKey) {
//       newError.youtube = "Please enter the YouTube stream key";
//       hasError = true;
//     }

//     if (platform.includes("Facebook") && !facebookKey) {
//       newError.facebook = "Please enter the Facebook stream key";
//       hasError = true;
//     }

//     if (platform.includes("Instagram") && !instagramKey) {
//       newError.instagram = "Please enter the Instagram stream key";
//       hasError = true;
//     }

//     if (hasError) {
//       setErrorWithTimeout(newError);
//       return;
//     }

//     if (stream && platform) {
//       const streamKeys = {};
//       if (platform.includes("YouTube")) streamKeys.youtubeKey = youtubeKey;
//       if (platform.includes("Facebook")) streamKeys.facebookKey = facebookKey;
//       if (platform.includes("Instagram"))
//         streamKeys.instagramKey = instagramKey;

//       try {
//         const response = await fetch(`${api2}/api/v1/users/start-stream`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + users?.accessToken,
//           },
//           body: JSON.stringify({ platform, streamKeys }),
//         });

//         if (response.ok) {
//           const recorder = new MediaRecorder(stream, {
//             audioBitsPerSecond: 128000,
//             videoBitsPerSecond: 2500000,
//             framerate: 25,
//           });

//           recorder.ondataavailable = (ev) => {
//             console.log("Binary Stream Available", ev.data);
//             socket.emit("binarystream", ev.data);
//           };

//           recorder.start(25);
//           setMediaRecorder(recorder);
//           setMessage("Streaming started! You are live now.");
//           setTimeout(() => setMessage(""), 10000); // Clear message after 10 seconds
//         } else {
//           console.error("Failed to start streaming:", response.data);
//           setErrorWithTimeout({ platform: "Failed to start streaming" });
//         }
//       } catch (error) {
//         console.error("Error starting stream:", error);
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           console.error("Response data:", error.response.data);
//           console.error("Response status:", error.response.status);
//           console.error("Response headers:", error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           console.error("No response received:", error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.error("Error message:", error.message);
//         }
//         setErrorWithTimeout({ platform: "Failed to start streaming" });
//       }
//     }
//   };

//   const stopStream = async () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setMediaRecorder(null);
//       await fetch(`${api2}/api/v1/users/stop-stream`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + users?.accessToken,
//         },
//         body: JSON.stringify({ platform }),
//       });
//       setMessage("Streaming stopped.");
//       setTimeout(() => setMessage(""), 10000); // Clear message after 10 seconds
//     }
//   };

//   const getCameraMedia = async () => {
//     const mediaStream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     setCameraMedia(mediaStream);
//     setScreenMedia(null);

//     if (userVideo.current) {
//       userVideo.current.srcObject = mediaStream;
//     }
//   };

//   const getScreenMedia = async () => {
//     const screenStream = await navigator.mediaDevices.getDisplayMedia({
//       video: true,
//     });
//     setScreenMedia(screenStream);
//     setCameraMedia(null);

//     if (userVideo.current) {
//       userVideo.current.srcObject = screenStream;
//     }
//   };

//   const stopMedia = () => {
//     if (cameraMedia) {
//       cameraMedia.getTracks().forEach((track) => track.stop());
//       setCameraMedia(null);
//     }
//     if (screenMedia) {
//       screenMedia.getTracks().forEach((track) => track.stop());
//       setScreenMedia(null);
//     }
//   };

//   useEffect(() => {
//     if (cameraMedia && userVideo.current) {
//       userVideo.current.srcObject = cameraMedia;
//     } else if (screenMedia && userVideo.current) {
//       userVideo.current.srcObject = screenMedia;
//     }
//   }, [cameraMedia, screenMedia]);

//   return {
//     userVideo,
//     cameraMedia,
//     screenMedia,
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
//     getCameraMedia,
//     getScreenMedia,
//     stopMedia,
//   };
// };

// export default useStreamingLogic;

