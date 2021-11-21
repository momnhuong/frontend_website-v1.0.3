import * as types from "./actionTypes";

export { list_chat, detail_chat };

function list_chat(data) {
  return {
    type: types.LIST_CHAT,
    data,
  };
}

function detail_chat(data, id) {
  return {
    type: types.DETAIL_CHAT,
    data,
    id,
  };
}
