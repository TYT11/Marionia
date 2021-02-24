import axios from "axios";
import { Autologin } from "./auth";

const instance = axios.create({
  baseURL: "http://tyt-ebackend.herokuapp.com/",
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

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

          if (refresh) {
            return Autologin(refresh)
              .then((res) => localStorage.setItem("token", res.data.access))
              .then((res) => {
                originalRequest.headers.Authorization =
                  "Bearer " + localStorage.getItem("token");
                return axios(originalRequest);
              })
              .catch((err) => {
                localStorage.setItem("token", "");
                localStorage.setItem("refresh", "");
                alert("作業逾時，請重新登入！");
                window.location.href = "/login";
                return;
              });
          }
          return err;

        default:
          return err;
      }
    }
  }
);
