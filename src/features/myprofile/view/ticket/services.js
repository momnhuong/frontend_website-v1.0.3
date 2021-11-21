// import * as appAPIs from '../../api/appAPIs'
import * as appActions from "./actions";
import { loading, offLoading } from "../../../../app/services";
import _, { get, size, isEqual } from "lodash";
import {
  getTicket,
  getTags,
  getDetail,
  getAuthor,
  getListService,
  postTicket,
  putTicket,
  delTicket,
  putComment,
  deleteApiToken,
  getCountStatus,
  getListCustomers,
} from "./../../../../utils/utils";
import { ERROR_MESSAGE, LOADING } from "../../../../constants/config";
import { errorTimeout } from "../../../../constants/common";
export {
  closeTicketPopup,
  openTicketPopup,
  listTicket,
  createTicket,
  editTicket,
  deleteTicket,
  pagination,
  searchTicket,
  listTags,
  detailTicket,
  createComment,
  getInfoAuthor,
  clearDetail,
  listService,
  ApiToken,
  SearchCountStatus,
  getListCustomer,
};

function pagination(page) {
  return (dispatch) => {
    dispatch(appActions.pagination(page));
  };
}

function closeTicketPopup() {
  return (dispatch) => {
    dispatch(appActions.closeTicketPopup());
  };
}

function openTicketPopup(data) {
  return (dispatch) => {
    dispatch(appActions.openTicketPopup(data));
  };
}

function clearDetail() {
  return (dispatch) => {
    dispatch(appActions.clearDetail());
  };
}

function listTicket(page, requester_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      getTicket(page)
        .then((response) => {
          dispatch(offLoading(LOADING.FULL));
          dispatch(appActions.listTicket(response));
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
    });
  };
}

function createTicket(data, page) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      postTicket(data)
        .then((response) => {
          const listTicketCreate = async () => {
            const list = await getTicket(page);
            const fetch = await dispatch(
              // appActions.pushTicket(list, response.ticket)
              dispatch(appActions.listTicket(list))
            );
            await dispatch(offLoading(LOADING.FULL));

            await fetch;
          };
          listTicketCreate();
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
    });
  };
}

function editTicket(data, page) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let params = get(data, "ticket.id", null);
      // if(isEmpty(params)) return null;
      params = "/" + params + ".json";
      dispatch(loading(LOADING.FULL));
      putTicket(data, params)
        .then((response) => {
          const listTicketEdit = async () => {
            const list = await getTicket(page);
            await dispatch(offLoading(LOADING.FULL));
            await dispatch(appActions.listTicket(list));
          };
          listTicketEdit();
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
    });
  };
}

function deleteTicket(data, page) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (size(data) === 1) {
        dispatch(loading(LOADING.FULL));
        delTicket(data, size(data))
          .then((response) => {
            const listTicketDelete = async () => {
              const list = await getTicket(page);
              await dispatch(offLoading(LOADING.FULL));
              await dispatch(appActions.listTicket(list));
            };
            listTicketDelete();
          })
          .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
      } else if (size(data) > 1) {
        dispatch(loading(LOADING.FULL));
        delTicket(data, size(data))
          .then((response) => {
            const listTicketDelete = async () => {
              let list = await getTicket(page);
              await dispatch(offLoading(LOADING.FULL));
              await dispatch(appActions.listTicket(list));
            };
            setTimeout(() => {
              listTicketDelete();
            }, 4000);
          })
          .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
      }
    });
  };
}

function searchTicket(params, page) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      getTicket(page, params)
        .then((response) => {
          dispatch(offLoading(LOADING.FULL));
          dispatch(appActions.listTicket(response));
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
    });
  };
}

function listTags() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getTags().then((response) => {
        dispatch(appActions.listTags(response));
      });
    });
  };
}

function detailTicket(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.POPUP));
      getDetail(data).then((response) => {
        dispatch(offLoading(LOADING.POPUP));
        dispatch(appActions.detailTicket(response));
      });
    });
  };
}

function createComment(data, id, status) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.POPUP));
      isEqual(status, "closed")
        ? errorTimeout(dispatch, ERROR_MESSAGE.ticketClose)
        : putComment(data, id).then((response) => {
            const updateDetail = async () => {
              const detail = await getDetail(id);
              await dispatch(offLoading(LOADING.POPUP));
              await dispatch(appActions.detailTicket(detail));
            };
            updateDetail();
          });
    });
  };
}

function getInfoAuthor(auId, suId, checkId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let _id = 0;
      isEqual(auId, -1) ? (_id = suId) : (_id = auId);
      getAuthor(_id).then((response) => {
        dispatch(appActions.detailUser(response, checkId));
      });
    });
  };
}

function listService() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getListService()
        .then((response) => {
          dispatch(appActions.listService(response));
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticketService));
    });
  };
}

function ApiToken(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      deleteApiToken(id)
        .then((response) => {
          errorTimeout(dispatch, "Deleted token");
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticketService));
    });
  };
}

function SearchCountStatus(type) {
  console.log("type: ", type);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getCountStatus(type)
        .then((response) => {
          dispatch(appActions.countStatus(type, response));
        })
        .catch((error) => errorTimeout(dispatch, ERROR_MESSAGE.ticket));
    });
  };
}

function getListCustomer(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getListCustomers(data).then((response) => {
        dispatch(appActions.listCustomer(response));
      });
    });
  };
}
