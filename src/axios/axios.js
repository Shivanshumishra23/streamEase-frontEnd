import axios from "axios";
import {api ,api2, isAuthenticated } from "../utils/api";


const Axios = axios.create({
  baseURL: api,
  withCredentials: true,
 
});

const Axios2 = axios.create({
  baseURL: api2,
  withCredentials: true,
 
});
export { Axios, Axios2 };
