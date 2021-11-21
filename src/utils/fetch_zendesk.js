import _, { isEmpty } from "lodash";
import { getZendeskFullToken, getZendeskID } from "../constants/common";

export default class RESTFul {
  static get(url, parameters) {
    return handling("GET", url, parameters);
  }

  static post(url, body) {
    return handling("POST", url, body);
  }

  static put(url, body) {
    return handling("PUT", url, body);
  }

  static delete(url) {
    return handling("DELETE", url);
  }
}

const handling = async (_method, url, requestData) => {
  try {
    var myHeaders = new Headers();
    console.log("id: ", getZendeskID());
    myHeaders.append("Authorization", `Bearer ${getZendeskFullToken()}`);
    if (_method !== "GET" && _method !== "DELETE" && !isEmpty(requestData)) {
      requestData = JSON.stringify(requestData);
      myHeaders.append("Content-Type", "application/json");
    }

    if (_method !== "DELETE") {
      return fetch(url, {
        method: _method,
        headers: myHeaders,
        redirect: "follow",
        body: _method !== "GET" ? requestData : null,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.log("Error Fetching:", error);
          throw new Error(error);
        });
    } else {
      return fetch(url, {
        method: _method,
        headers: myHeaders,
        redirect: "follow",
        body: _method !== "GET" && _method !== "DELETE" ? requestData : null,
      })
        .then((response) => response.text())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.log("Error Fetching:", error);
          throw new Error(error);
        });
    }
  } catch (error) {
    console.log("Error Promise Fetching:", error);
    throw new Error(error);
  }
};
