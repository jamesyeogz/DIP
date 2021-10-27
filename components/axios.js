import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: baseURL,
//   headers: {
//     "X-Requested-With": "XMLHttpRequest",
//     "Access-Control-Allow-Origin": "*",
//   },
});

export default api;
