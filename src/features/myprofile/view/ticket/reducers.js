import * as types from "./actionTypes";
import _, { get, concat, size } from "lodash";
import { detailUser } from "./actions";
import { SEARCH_TICKET } from "../../../../constants/config";
const initialState = {
  close: false,
  count: 0,
  prePage: 1,
  next_page: null,
  checkAction: -1,
  listTicket: [],
  listService: [],
  detailTicket: {},
  comment: {
    listUser: [],
  },
  listCustomer: [],
  statusCount: {
    open: 0,
    pending: 0,
    hold: 0,
    closed: 0,
    solved: 0,
  },
  detailUser: {},
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_TICKET:
      return {
        ...state,
        listTicket: _.get(
          action,
          "data.tickets",
          _.get(action, "data.results", [])
        ),
        count: _.get(action, "data.count", 0),
        next_page: _.get(action, "data.next_page", null),
      };
    case types.DETAIL_TICKET:
      const _detailTicket = get(action, "data.audits", []);
      return {
        ...state,
        detailTicket: _detailTicket,
      };
    case types.PAGINATION:
      return {
        ...state,
        prePage: _.get(action, "page", 1),
      };
    case types.PUSH_TICKET:
      let _listTicket = _.get(action, "list.tickets", []);
      let result = _.concat(action.data, _listTicket);
      return {
        ...state,
        checkAction: get(action, "data.id"),
        listTicket: result,
      };
    case types.LIST_TAGS:
      let _listTags = _.get(action, "data.tags", []);
      return {
        ...state,
        listTags: _listTags,
      };
    case types.DETAIL_USER:
      let _listUser = get(state, "comment.listUser", []);
      let _detailUser = [[action.id, get(action, "data.user.name", "")]];
      _listUser = _listUser.concat(_detailUser);
      console.log("abc: ", action);

      return {
        ...state,
        comment: {
          listUser: _listUser,
        },
        detailUser: get(action, "data.user", {}),
      };
    case types.LIST_SERVICE:
      let _listService = get(
        action,
        "data.ticket_field.custom_field_options",
        []
      );
      console.log("_listService: ", _listService);
      return {
        ...state,
        listService: _listService,
      };
    case types.CLEAR_DETAIL:
      return {
        ...state,
        detailTicket: {},
        comment: {
          listUser: [],
        },
      };
    case types.COUNT_STATUS:
      let _statusCount = get(state, "statusCount", {});
      let _count = get(action, "data.count", 0);
      let _type = get(action, "_type");
      for (let i = 0; i < size(SEARCH_TICKET.status.list); i++) {
        if (_type === SEARCH_TICKET.status.list[i].name) {
          _statusCount[_type] = _count;
        }
      }
      return {
        ...state,
        statusCount: {
          ...state.statusCount,
        },
      };
    case types.LIST_CUSTOMER_TICKET:
      let _listCustomer = get(action, "data.data.results", []);
      console.log("_result: ", _listCustomer);
      return {
        ...state,
        listCustomer: _listCustomer,
      };
    default:
      return {
        ...state,
      };
  }
}
