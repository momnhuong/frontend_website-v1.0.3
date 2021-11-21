import RESTFul from "./fetch_zendesk";
import API from "../constants/apiString";
import FETCH from "./fetch";
import {
  PER_PAGE,
  ID_SERVICE,
  PERSIST_KEY,
  PARAM_SEARCH_STATUS,
  PER_PAGE_CUSTOMER,
} from "../constants/config";
import { isEmpty } from "lodash";
import { getRequesterID } from "../constants/common";
import { store } from "../store";
export {
  toStringTime,
  getLinkPlay,
  getTicket,
  getTags,
  getDetail,
  getAuthor,
  getListService,
  putComment,
  putTicket,
  postTicket,
  delTicket,
  deleteApiToken,
  getListCustomers,
  getCountStatus,
};

function toStringTime(timestamp) {
  const ndate = new Date(timestamp * 1000);
  let hour = ndate.getHours();
  let min = ndate.getMinutes();

  if (hour.toString().length === 1) hour = "0" + hour;
  if (min.toString().length === 1) min = "0" + min;
  return hour + ":" + min;
}

function getLinkPlay(entityDetail) {
  let linkPlay = "";

  if (entityDetail.type === 2) {
    if (entityDetail && entityDetail.default_episode) {
      if (entityDetail.default_episode.play_info) {
        if (entityDetail.default_episode.play_info.data) {
          linkPlay = entityDetail.default_episode.play_info.data.hls_link_play;
        }
      }

      if (!linkPlay) {
        if (entityDetail.default_episode.type === 4) {
          linkPlay = entityDetail.default_episode.link_play;
        }
      }
    }
  } else if (entityDetail.type === 1) {
    if (
      entityDetail &&
      entityDetail.play_info &&
      entityDetail.play_info.error !== 1
    ) {
      linkPlay = entityDetail.play_info.data.hls_link_play;
    }

    if (!linkPlay) {
      linkPlay = entityDetail.link_play;
    }
  } else if (entityDetail.type === 4) {
    if (entityDetail && entityDetail.play_info) {
      if (entityDetail.play_info.error !== 1) {
        linkPlay = entityDetail.play_info.data.hls_link_play;
      } else {
        linkPlay = entityDetail.link_play;
      }
    }
  } else if (entityDetail.type === 5) {
    if (entityDetail.play_info && entityDetail.play_info.error !== 1) {
      linkPlay = entityDetail.play_info.data.link_play;
    }

    if (!linkPlay) {
      linkPlay = entityDetail.link_play;
    }
  }

  return linkPlay;
}

function getListCustomers(data) {
  const path = `admin/customers/?page_size=${PER_PAGE_CUSTOMER}&customer_name=${data}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}

function getTicket(data, filter = "") {
  let requester_id = getRequesterID();
  let _pagination = "";
  let params = "/" + requester_id + "/tickets/requested.json";
  _pagination =
    "?page=" +
    data +
    "&per_page=" +
    PER_PAGE +
    `&sort_by=created_at&sort_order=desc`;
  if (isEmpty(filter) && requester_id)
    return RESTFul.get(API.TICKET_LIST_USER + params + _pagination, filter);
  if (isEmpty(filter) && requester_id === null)
    return RESTFul.get(API.TICKET_LIST + _pagination, filter);
  return RESTFul.get(API.SEARCH + _pagination + "&" + filter, filter);
}

function getCountStatus(type, filter = "") {
  let requester_id = getRequesterID();
  let params =
    "?query=status:" +
    type +
    `${requester_id ? ` requester_id:${requester_id}` : ""}`;
  return RESTFul.get(API.SEARCH + params, filter);
}

function postTicket(data) {
  return RESTFul.post(API.TICKET_LIST, data);
}

function putTicket(data, params) {
  return RESTFul.put(API.TICKET_DETAIL + params, data);
}

function delTicket(data, size) {
  if (size === 1) {
    let _params = "/" + data[0] + ".json";
    return RESTFul.delete(API.TICKET_DETAIL + _params, data);
  } else if (size > 1) {
    let _params = "";
    for (let i = 0; i < data.length; i++) {
      if (i + 1 >= data.length) {
        _params = _params.concat(data[i]);
      } else {
        _params = _params.concat(data[i] + ",");
      }
    }
    _params = "/destroy_many.json?ids=" + _params;
    return RESTFul.delete(API.TICKET_DETAIL + _params, data);
  }
}

function getTags() {
  return RESTFul.get(API.TAGS_LIST);
}

function getDetail(data) {
  let _params = API.TICKET_DETAIL + "/" + data + "/audits.json";
  return RESTFul.get(_params);
}

function putComment(data, id) {
  let _params = API.TICKET_DETAIL + "/" + id + ".json";
  return RESTFul.put(_params, data);
}

function getAuthor(id) {
  let _params = "/" + id + ".json";
  return RESTFul.get(API.USRS_DETAIL + _params);
}

function getListService() {
  let _params = "/" + ID_SERVICE + ".json";
  return RESTFul.get(API.TICKET_FIELDS + _params);
}

function deleteApiToken(id) {
  let _params = `/${id}.json`;
  return RESTFul.delete(API.OAUTH_TOKEN + _params, null);
}
