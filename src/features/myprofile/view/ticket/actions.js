import * as types from "./actionTypes";

export {
  closeTicketPopup,
  openTicketPopup,
  listTicket,
  pushTicket,
  pagination,
  listTags,
  detailTicket,
  detailUser,
  clearDetail,
  listService,
  countStatus,
  listCustomer,
};

function pagination(page) {
  return {
    type: types.PAGINATION,
    page,
  };
}

function closeTicketPopup() {
  return {
    type: types.CLOSE_TICKET_POPUP,
  };
}

function openTicketPopup(data) {
  return {
    type: types.OPEN_TICKET_POPUP,
    data,
  };
}

function listTicket(data) {
  return {
    type: types.LIST_TICKET,
    data,
  };
}

function pushTicket(list, data) {
  return {
    type: types.PUSH_TICKET,
    list,
    data,
  };
}

function listTags(data) {
  return {
    type: types.LIST_TAGS,
    data,
  };
}

function detailTicket(data) {
  return {
    type: types.DETAIL_TICKET,
    data,
  };
}

function detailUser(data, id) {
  return {
    type: types.DETAIL_USER,
    data,
    id,
  };
}

function clearDetail() {
  return {
    type: types.CLEAR_DETAIL,
  };
}

function listService(data) {
  return {
    type: types.LIST_SERVICE,
    data,
  };
}

function countStatus(_type, data) {
  return {
    type: types.COUNT_STATUS,
    _type,
    data,
  };
}
function listCustomer(data) {
  return { type: types.LIST_CUSTOMER_TICKET, data };
}
