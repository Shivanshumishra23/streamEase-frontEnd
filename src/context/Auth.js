import React, { useContext, createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Axios } from "../axios/axios";
import { isAuthenticated, logout } from "../utils/api";
const access = localStorage.getItem("userAuth");
const expirationTime = localStorage.getItem("userAuthExpiration");

const AuthContext = createContext({
  toggle: false,
});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // check wheater toke is expired
  const { accessToken } = isAuthenticated();

  // useEffect(() => {
  //   // check
  //   const verifyTokenUser = async () => {
  //     try {
  //       const veritoken = await Axios.post(
  //         "/users/verify",
  //         {},
  //         {
  //           headers: {
  //             Authorization: "Bearer " + accessToken,
  //           },
  //         }
  //       );
  //       if (veritoken?.status !== 200) {
  //         navigate("/");
  //         logout();
  //       }
  //     } catch (error) {
  //       navigate("/events");
  //       console.log(error);
  //     }
  //   };
  //   verifyTokenUser();
  // }, []);

  useEffect(() => {
    // check
    const verifyTokenUser = async () => {
      // Token is valid and not expired
      try {
        const veritoken = await Axios.post(
          "/users/verify",
          {},
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        if (veritoken?.status !== 200) {
          logout(); // 3ms

          navigate("/");
        }
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };

    if (access && expirationTime && Date.now() < expirationTime) {
      verifyTokenUser();
    } else {
      // Token is expired or not found, perform logout
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          // Otp
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return auth;
};

export { AuthContextProvider, useAuth };
