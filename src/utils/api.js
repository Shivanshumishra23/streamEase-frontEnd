import { Axios } from "../axios/axios";


// export const api="https://careercef-server.vercel.app/api/v1"
export const api="http://localhost:3000/api/v1"



export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return true;
    }
    if (localStorage.getItem("userAuth")) {
      return JSON.parse(localStorage.getItem("userAuth"));
    } else {
      return false;
    }
  };
  
  // signout
  export const logout = () => {
    if (localStorage.getItem("userAuth")) {
      localStorage.removeItem("userAuth");
      localStorage.removeItem("userAuthExpiration");
      window.location.reload();
      return true;
    }
  };
  