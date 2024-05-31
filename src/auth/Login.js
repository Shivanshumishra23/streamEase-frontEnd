import React, { useState, useContext } from "react";
import { Axios } from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      const resp = await toast.promise(
        Axios.post("/users/login", { username, password }),
        {
          pending: "Logging in...",
          success: "Login successful 👌",
          error: "Login failed 🤯",
        }
      );
      if (resp?.status === 200) {
        const expirationTime = Date.now() + (1 * 60 * 1000);
        localStorage.setItem("userAuth", JSON.stringify(resp?.data?.data));
        localStorage.setItem("userAuthExpiration", expirationTime);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
              <span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:bg-white focus:outline-none ${errors.username && "border-red-500"}`}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
              <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:bg-white focus:outline-none ${errors.password && "border-red-500"}`}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
