import axios from "axios";

export const API = axios.create({
  baseURL: "https://movies-backend-vqgr.onrender.com/api"
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const TMDB_API_KEY = "0fae75e313999d863eff8d4cb1ebcd1c";
export const AUTH = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});
