import { Axios } from "../axios/axios";

// export const api="https://streamease-server.vercel.app/api/v1"
// export const api="http://3.108.194.0:3000/api/v1"
export const api = `https://shivanshu.online/api/v1`;
// export const api2 = "https://streame-server.vercel.app"
// export const api2 = "http://3.108.194.0:3000"
export const api2 = "https://shivanshu.online";

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
