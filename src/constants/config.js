import { IMAGES } from "./../assets";
import API from "../constants/apiString";
export const USER_PROFILE = {
  USER: "admin",
  PASSWORD: "abc123",
};

export const USER_CONTACT = {
  NAME: "John Smith",
  AVATAR: IMAGES.avatar,
  AGE: 23,
};

export const VALIDATION = {
  PASSWORD:
    "Mật khẩu phải có ít nhất một kí tự in hoa, kí tự số, và kí tự đặc biệt",
};

export const PAGINATION = { TICKET: "ticket" };

export const STATUS = {
  AVAILABLE: "available",
};

export const TYPE_MESSAGE = {
  WARNING: { value: "warning", clsName: "fa fa-exclamation-triangle" },
  ERORR: { value: "error", clsName: "fa fa-exclamation" },
  SUCCESS: { value: "success", clsName: "fa fa-share" },
};
export const LIST_NOTIFICATION = [
  {
    id: 0,
    type: TYPE_MESSAGE.SUCCESS.value,
    icon: TYPE_MESSAGE.SUCCESS.clsName,
    title: "You have new order!",
    content:
      "Are your going to meet me tonight, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "9 hours ago",
    position: [{ value: "frontend" }, { value: "backend" }, { value: "doc" }],
  },
  {
    id: 1,
    type: TYPE_MESSAGE.SUCCESS.value,
    icon: TYPE_MESSAGE.SUCCESS.clsName,
    title: "You are Awsome!",
    content:
      "You got new order, now, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "1 hours ago",
    position: [{ value: "frontend" }, { value: "doc" }],
  },
  {
    id: 2,
    type: TYPE_MESSAGE.WARNING.value,
    icon: TYPE_MESSAGE.WARNING.clsName,
    title: "Please check mail to update!",
    content:
      "John Dan just send you 2 email, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "2 minute ago",
    position: [{ value: "frontend" }, { value: "backend" }, { value: "doc" }],
  },
  {
    id: 3,
    type: TYPE_MESSAGE.SUCCESS.value,
    icon: TYPE_MESSAGE.SUCCESS.clsName,
    title: "Chocolate in valentine day",
    content:
      "Food for valentine day so good, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "1 day ogo",
    position: [
      { value: "frontend" },
      { value: "backend" },
      { value: "doc" },
      { value: "bug" },
    ],
  },
  {
    id: 4,
    type: TYPE_MESSAGE.ERORR.value,
    icon: TYPE_MESSAGE.ERORR.clsName,
    title: "Erorr the task to fix",
    content:
      "Server have 99% CPU, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "Today",
    position: [{ value: "bug" }],
  },
  {
    id: 5,
    type: TYPE_MESSAGE.SUCCESS.value,
    icon: TYPE_MESSAGE.SUCCESS.clsName,
    title: "You are Awsome!",
    content:
      "You got new order, now, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "1 hours ago",
    position: [{ value: "frontend" }, { value: "backend" }, { value: "doc" }],
  },
  {
    id: 6,
    type: TYPE_MESSAGE.WARNING.value,
    icon: TYPE_MESSAGE.WARNING.clsName,
    title: "How are you doing, today",
    content:
      "Do you need a friend ?, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "Just now",
    position: [{ value: "frontend" }, { value: "backend" }, { value: "doc" }],
  },
  {
    id: 7,
    type: TYPE_MESSAGE.ERORR.value,
    icon: TYPE_MESSAGE.ERORR.clsName,
    title: "Erorr the task to fix",
    content:
      "Server have 99% CPU, Sesame snaps lollipop macaroon croissant cheesecake pastry cupcake.",
    time: "Today",
    position: [{ value: "frontend" }, { value: "backend" }],
  },
];

export const LIST_TICKET_PAGE2 = [
  {
    id: "5ef1c87a29132f24dbba5cf2",
    code: "#WEJIDKBBC",
    state: "SOLVE",
    title: "Urgent: Shipping Invoices Required",
    content:
      "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
    priority: "HIGH",
    category: "Isabel Garcia",
    due_date: "19-02-2034",
    assignee: "Haley Ballard",
  },
  {
    id: "5ef1c87ab25e5b2a88e2bc60",
    code: "#WEJIDKBBC",
    state: "SOLVE",
    title: "Urgent: Shipping Invoices Required",
    content:
      "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
    priority: "HIGH",
    category: "Hurst Rivas",
    due_date: "19-02-2034",
    assignee: "Velasquez Hamilton",
  },
  // {
  //   id: "5ef1c87a83e1f44fe3e45c58",
  //   code: "#WEJIDKBBC",
  //   state: "NEW",
  //   title: "Urgent: Shipping Invoices Required",
  //   content:
  //     "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
  //   priority: "HIGH",
  //   category: "Dolly Higgins",
  //   due_date: "19-02-2034",
  //   assignee: "Yesenia Vang",
  // },
];
export const LIST_TICKET_PAGE1 = [
  {
    id: "5ef1c87a30ea0daafc43d3e3",
    code: "#WEJIDKBBC",
    state: "SOLVE",
    title: "Urgent: Shipping Invoices Required",
    content:
      "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
    priority: "LOW",
    category: "Jewel Lindsey",
    due_date: "19-02-2034",
    assignee: "Elisa Rowe",
  },
  {
    id: "5ef1c87ac6cdc9ae48490581",
    code: "#WEJIDKBBC",
    state: "CLOSED",
    title: "Urgent: Shipping Invoices Required",
    content:
      "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
    priority: "LOW",
    category: "Alisha Mack",
    due_date: "19-02-2034",
    assignee: "Blankenship Hebert",
  },
  {
    id: "5ef1c87aa32eebcf541a8dc6",
    code: "#WEJIDKBBC",
    state: "NEW",
    title: "Urgent: Shipping Invoices Required",
    content:
      "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
    priority: "LOW",
    category: "Katheryn Velez",
    due_date: "19-02-2034",
    assignee: "Frye Serrano",
  },
  {
    id: "5ef1c87a240e0ff0274f69ac",
    code: "#WEJIDKBBC",
    state: "SOLVE",
    title: "Urgent: Shipping Invoices Required",
    content:
      "Hi team, i need the latest Shipping invoices for the following package IDs, 1. 133442FDG 2,3435",
    priority: "HIGH",
    category: "Kidd Nash",
    due_date: "19-02-2034",
    assignee: "Francis Marks",
  },
];

export const STATUS_TICKET = [
  { status: "SOLVE" },
  { status: "NEW" },
  { status: "CLOSED" },
];

export const PRIORITY_TICKET = [
  { priority: "LOW", value: "low" },
  { priority: "NORMAL", value: "normal" },
  { priority: "HIGH", value: "high" },
  { priority: "URGENT", value: "urgent" },
];

export const SERVICE_TICKET = [
  { service: "Virtual Private Cloud	", value: "low" },
  { service: "Virtual Desktop Infrastructure", value: "normal" },
  { service: "Object Storage", value: "high" },
  { service: "Colocation", value: "urgent" },
  { service: "Cross Connect", value: "normal" },
  { service: "Managed Services", value: "high" },
  { service: "Schedule a System Interaction", value: "urgent" },
  { service: "Meeting with Sales team", value: "urgent" },
];
export const LIST_CHAT = [
  {
    id: 1,
    avatar: IMAGES.avatar,
    time: "9 PM",
    title: "Elizabeth Elliott",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 2,
    avatar: IMAGES.avatar_1,
    time: "9 PM",
    title: "Alinda Piots",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 3,
    avatar: IMAGES.avatar_2,
    time: "9 PM",
    title: "Jack Widision",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 4,
    avatar: IMAGES.avatar_3,
    time: "9 PM",
    title: "Dominic Persel",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 5,
    avatar: IMAGES.avatar_4,
    time: "9 PM",
    title: "Taild Tawan",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 6,
    avatar: IMAGES.avatar_5,
    time: "9 PM",
    title: "Educag Mitck",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 7,
    avatar: IMAGES.avatar_6,
    time: "9 PM",
    title: "John Adesion",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 8,
    avatar: IMAGES.avatar_7,
    time: "9 PM",
    title: "Lincon Brown",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
  {
    id: 9,
    avatar: IMAGES.avatar_8,
    time: "9 PM",
    title: "Michael Scofield",
    description:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  },
];

export const ERROR_MESSAGE = {
  ticket: "Failed to fetch ticket API",
  ticketClose: "Ticket was closed, can't comment",
  ticketService: "Failed to Fetch list Service",
  tokenFailed: "Token invalid",
};

export const PARAM_SEARCH_STATUS = API.SEARCH + "?query=status:";
export const SEARCH_TICKET = {
  status: {
    list: [
      { id: 1, name: "open", value: "open" },
      { id: 2, name: "closed", value: "closed" },
      { id: 3, name: "pending", value: "pending" },
      { id: 4, name: "hold", value: "hold" },
      { id: 5, name: "solved", value: "solved" },
    ],
  },
  tags: {
    list: [
      { id: 1, name: "in_business_hours", value: "in_business_hours" },
      { id: 2, name: "out_business_hours", value: "out_business_hours" },
      { id: 3, name: "zopim_chat", value: "zopim_chat" },
      { id: 4, name: "web_widget", value: "web_widget" },
    ],
  },
  types: {
    list: [{ id: 1, name: "ticket", value: "ticket" }],
  },
};
export const ID_SERVICE = 900003515483;

// export const SEARCH_TICKET_PARAMS = "sort_by=created_at&query=type:ticket";
export const SEARCH_TICKET_PARAMS = "query=type:ticket";

export const LOADING = {
  FULL: "full",
  POPUP: "popup",
};

export const PER_PAGE = 10;
export const PER_PAGE_CUSTOMER = 1000;
export const SESSION_KEY = "isAuth";
export const PERSIST_KEY = "persist:root";
export const SESSION_ID = "sid";
export const ID_TOKEN_ZENDEKS = "id_token_zendesk";
// export const REQUESTER_ID = "perist:root"

export const AUTH_ID = "900299402906";
export const ACTIVE_API_KEY = "K2cgmeO4tYlMZYkFPq2K2ayYzYUs9hbrNf2099N3";
