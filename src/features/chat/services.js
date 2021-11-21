import * as appActions from "./actions";
import { LIST_CHAT } from "../../constants/config";
export { list_chat, detail_chat };

function list_chat() {
  const data = LIST_CHAT;
  return (dispatch) => {
    dispatch(appActions.list_chat(data));
  };
}

function detail_chat(data, id) {
  return (dispatch) => {
    dispatch(appActions.detail_chat(data, id));
  };
}
