import * as types from "./actionTypes";
import { get, isEmpty, filter } from "lodash";
const initialState = {
  listChat: [],
  detailChat: {},
};

export default function forget(state = initialState, action = {}) {
  const _listChat = get(state, "listChat", []);
  const _findDetaildataId = (list, id) => {
    const detailItem = filter(list, (item, key) => {
      return item.id === id;
    });
    return detailItem[0];
  };
  switch (action.type) {
    case types.LIST_CHAT:
      return {
        ...state,
        listChat: get(action, "data", []), //todo
      };
    case types.DETAIL_CHAT:
      let dataDetail = get(action, "data", []);
      let idDetail = get(action, "id", 1);
      let _detailChat = [];

      if (isEmpty(dataDetail)) {
        _detailChat = _findDetaildataId(_listChat, idDetail);
      } else {
        _detailChat = dataDetail;
      }

      return {
        ...state,
        detailChat: _detailChat,
      };
    default:
      return state;
  }
}
