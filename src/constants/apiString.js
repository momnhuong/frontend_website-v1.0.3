export const BASE_URL = `${process.env.REACT_APP_CORE_SERVICE_BASE_URL}/v1/`;
export const BASE_ZENDESK_URL = "https://usdctechnology.zendesk.com/api/v2/";

export default {
  SEARCH: BASE_ZENDESK_URL + "search.json",
  TICKET_LIST: BASE_ZENDESK_URL + "tickets.json",
  TICKET_DETAIL: BASE_ZENDESK_URL + "tickets",
  TICKET_FIELDS: BASE_ZENDESK_URL + "ticket_fields",
  TAGS_LIST: BASE_ZENDESK_URL + "tags.json",
  USERS_LIST: BASE_ZENDESK_URL + "users.json",
  USRS_DETAIL: BASE_ZENDESK_URL + "users",
  TICKET_LIST_USER: BASE_ZENDESK_URL + "users",
  OAUTH_TOKEN: BASE_ZENDESK_URL + "oauth/tokens",
};
