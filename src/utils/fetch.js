import * as API_STRING from "../constants/apiString";

const HEADERS = {
  Accept: "application/json",
};

export default function FETCH(path, method, headers = {}, body) {
  return new Promise(function (resolve, reject) {
    startFetch(path, method, headers, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
}

function startFetch(path, method, headers, body) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Request API timeout."));
    }, 30000);
    // console.log("bodypost", body);
    let pathnew, bodynew;
    if (path === "admin/product/create/") {
      bodynew = body;
    } else {
      bodynew = JSON.stringify(body);
    }
    const fetchURL = `${API_STRING.BASE_URL}${path}`;
    let status;
    fetch(fetchURL, {
      method,
      headers: {
        ...HEADERS,
        ...headers,
      },
      body: bodynew,
    })
      .then((response) => {
        clearTimeout(timeout);
        status = response.status;
        if (status === 201 || status === 204) {
          return true;
        }
        // console.log("responsenew", response);
        return response.json();
      })
      .then((responseJson) => {
        // if (status >= 200 && status <= 299) {
        //   resolve(responseJson);
        // }
        let data = {
          status: status,
          data: responseJson,
        };
        // console.log("status", data);
        resolve(data);
      })
      .catch((error) => {
        clearTimeout(timeout);
        console.log(method, fetchURL, error);
        reject(error);
      });
  });
}
