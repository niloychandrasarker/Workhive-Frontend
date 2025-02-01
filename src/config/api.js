import axios from "axios";

export const API_BASE_URL =
  "https://personal-agnella-devwithniloy-6b987210.koyeb.app/";

const api = axios.create({ baseURL: API_BASE_URL });

const jwt = localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
