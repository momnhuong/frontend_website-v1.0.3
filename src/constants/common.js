import { get, size } from "lodash";
import { offLoading, errorMessage, offErroMessage } from "../app/services";
import { ERROR_MESSAGE, ID_TOKEN_ZENDEKS, PERSIST_KEY } from "./config";

export {
  errorTimeout,
  getRequesterID,
  getApiToken,
  getZendeskFullToken,
  getZendeskID,
  getIndexOf,
};

function errorTimeout(dispatch, msg) {
  dispatch(offLoading());
  dispatch(errorMessage(msg));
  setTimeout(() => {
    dispatch(offErroMessage());
  }, 3000);
}

function getRequesterID() {
  let storage = window.localStorage.getItem(PERSIST_KEY);
  let requester_id = JSON.parse(JSON.parse(storage).root).userProfile.data
    .requester_id;
  return requester_id;
}

function getApiToken() {
  let idToken = window.localStorage.getItem(ID_TOKEN_ZENDEKS);
  return idToken;
}

function getZendeskFullToken() {
  let storage = window.localStorage.getItem(PERSIST_KEY);
  let fulltoken = get(
    JSON.parse(JSON.parse(storage).root).userProfile.data,
    "zendesk.token.full_token"
  );
  return fulltoken;
}

function getZendeskID() {
  let storage = window.localStorage.getItem(PERSIST_KEY);
  let id = get(
    JSON.parse(JSON.parse(storage).root).userProfile.data,
    "zendesk.token.id"
  );
  return id;
}

function getIndexOf(data, param) {
  console.log("data la : ", data);
  if (data === undefined) return -1;
  return data.slice(data.indexOf(param) + 1, size(data));
}
