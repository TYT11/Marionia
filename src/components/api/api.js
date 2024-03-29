import axios from "axios";
import { Autologin } from "./auth";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_ROOT,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  cancelToken: source.token,
});

export const cancelFunc = () => {
  source.cancel();
};

export default function handleAPI(method, url, data = null, config = {}) {
  const lowerCaseMethod = method.toLowerCase();

  switch (method) {
    case "post":
      return instance.post(url, data, config);

    case "get":
      return instance.get(url, config);

    default:
      console.log(`未知的 method: ${lowerCaseMethod}`);
      return false;
  }
}

instance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (err) {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          const refresh = localStorage.getItem("refresh");
          const originalRequest = err.config;
          if (originalRequest.url === "/api/token/refresh/")
            return Promise.reject(err);
          if (refresh) {
            return Autologin(refresh)
              .then((res) => {
                localStorage.setItem("token", res.data.access);
              })
              .then((res) => {
                originalRequest.headers.Authorization =
                  "Bearer " + localStorage.getItem("token");
                return axios.request(originalRequest);
              })
              .catch((err) => {
                localStorage.setItem("token", "");
                localStorage.setItem("refresh", "");
                alert("作業逾時，請重新登入！");
                window.location.replace(`${process.env.BASE_URL}login`);
                return Promise.reject(err);
              });
          } else {
            localStorage.setItem("token", "");
            localStorage.setItem("refresh", "");
            window.location.replace(`${process.env.BASE_URL}login`);
          }
          return Promise.reject(err);

        default:
          return Promise.reject(err);
      }
    }
  }
);
