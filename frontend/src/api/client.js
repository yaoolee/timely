import axios from "axios";

const raw = import.meta.env.VITE_API_URL;
const baseURL =
  raw && !raw.endsWith("/api")
    ? raw + "/api"
    : raw || "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
