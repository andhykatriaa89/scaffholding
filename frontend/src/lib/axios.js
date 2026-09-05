import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL || (window.location.port === "3000" ? "http://127.0.0.1:8000" : ""),
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Auto-logout if API returns 401 Unauthenticated
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("ssf_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
