import axios from "axios";
import * as API_STRING from "../constants/apiString";
import { store } from "../store";

const HEADERS = {
  // Accept: "application/json",
};
// const token = localStorage.getItem("token");
// console.log("localStorage", token);
// axios.interceptors.request.use(function (config) {
//   const token = token;
//   if (token) {
//     console.log("token cos");
//     config.headers.Authorization = `${token}`;
//   }
//   return config;
// });

export default function axiosCaller(endpoint, method = "GET", headers, data) {
  // console.log("apidata", data);
  data ? data : null;

  const url = `${API_STRING.BASE_URL}${endpoint}`;
  return new Promise(async (resolve, reject) => {
    axios({
      method,
      url,
      headers,
      data,
    })
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        if (err.response) return resolve(err.response);
        else {
          return reject(err);
        }
      });
  });
}
