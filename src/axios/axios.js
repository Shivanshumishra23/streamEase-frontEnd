import axios from "axios";
import { api, isAuthenticated } from "../utils/api";


const Axios = axios.create({
  baseURL: api,
  withCredentials: true,
 
});

export { Axios };
