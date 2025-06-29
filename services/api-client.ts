import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export default apiClient;
