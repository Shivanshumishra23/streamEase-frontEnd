import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { Axios } from "../axios/axios";
import { isAuthenticated, logout } from "../utils/api";
import { Transition } from "@headlessui/react";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext"; 
import { FiSun, FiMoon } from "react-icons/fi"; // Import icons

const Navbar = () => {
  const users = isAuthenticated();
  const [toggle, setToggle] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const items = [
    { name: "Home", link_to: "/" },
    { name: "About", link_to: "/about" },
    { name: "Pricing", link_to: "/pricing" },
  ];

  const handleLogoutSubmit = async () => {
    try {
      const resp = await Axios.post(
        "/users/logout",
        {},
        { headers: { Authorization: "Bearer " + users?.accessToken } }
      );
      logout();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className={`shadow-lg sticky top-0 z-50 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/">
          <img className="h-12" src={logo} alt="Logo" />
        </Link>
        <nav className="hidden lg:flex space-x-6">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.link_to}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 font-semibold rounded-md text-blue-500"
                  : `px-4 py-2 font-semibold rounded-md hover:${isDarkMode ? "bg-gray-700" : "bg-blue-300"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
         
        </nav>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="bg-gray-500 lg:hidden hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <div className="lg:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {toggle ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <Transition
          show={toggle}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              ref={ref}
              className={`lg:hidden absolute z-10 top-full left-0 w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg py-2`}
            >
              <nav className="flex flex-col items-center space-y-2">
                {users && (
                  <div className="flex items-center gap-1">
                    <div className={`h-7 w-7 flex items-center justify-center ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full`}>
                      <FaUser size={15} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
                    </div>
                    <p className="font-semibold">{users?.user?.fullName}</p>
                  </div>
                )}
                {items.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link_to}
                    className={({ isActive }) =>
                      isActive
                        ? "px-4 py-2 font-semibold rounded-md text-blue-500"
                        : `px-4 py-2 font-semibold rounded-md hover:${isDarkMode ? "bg-gray-700" : "bg-blue-300"}`
                    }
                    onClick={() => setToggle(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
                {users ? (
                  <div className="flex flex-col items-center">
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "px-4 py-2 font-semibold rounded-md text-blue-500"
                          : `px-4 py-2 font-semibold rounded-md hover:${isDarkMode ? "bg-gray-700" : "bg-blue-300"}`
                      }
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => handleLogoutSubmit()}
                      className="text-gray-700 hover:text-gray-900 font-semibold focus:outline-none"
                    >
                      Logout
                    </button>

                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <NavLink to="/login" className="font-semibold hover:text-gray-900">
                      Login
                    </NavLink>
                    <NavLink to="/dashboard" className="font-semibold hover:text-gray-900">
                      Get Started
                    </NavLink>

                    
                  </div>
                )}
                
              </nav>
            </div>
          )}
        </Transition>
        {users ? (
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center gap-1">
              <div className={`h-7 w-7 flex items-center justify-center ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full`}>
                <FaUser size={15} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
              </div>
              <p className="font-semibold">{users?.user?.fullName}</p>
            </div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 font-semibold rounded-md text-blue-500"
                  : `px-4 py-2 font-semibold rounded-md hover:${isDarkMode ? "bg-gray-700" : "bg-blue-300"}`
              }
            >
              Dashboard
            </NavLink>
            <button
              onClick={() => handleLogoutSubmit()}
              className="hover:text-gray-500 font-semibold focus:outline-none"
            >
              Logout
            </button>
            <button
          type="button"
          onClick={toggleDarkMode}
          className="bg-gray-500 hidden lg:flex hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
          </div>
        ) : (
          <div className="hidden lg:flex space-x-4">
            <Link to="/login" className="px-4 py-2 font-semibold rounded-md hover:bg-blue-300">
              Login
            </Link>
            <Link to="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Get Started
            </Link>
            
            <button
          type="button"
          onClick={toggleDarkMode}
          className="bg-gray-500 hidden lg:flex hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
