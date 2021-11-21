import React from "react";
import { notification } from "antd";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  COLOR_INFO,
  COLOR_SUCCESS,
  COLOR_WARNING,
  COLOR_ERROR,
} from "../../constants/colors";

const NOTIFICATION = {
  info: {
    icon: <FaInfoCircle />,
    color: COLOR_INFO,
  },
  success: {
    icon: <FaCheckCircle />,
    color: COLOR_SUCCESS,
  },
  warning: {
    icon: <FaExclamationCircle />,
    color: COLOR_WARNING,
  },
  error: {
    icon: <FaTimesCircle />,
    color: COLOR_ERROR,
  },
};

const Notification = (type, message = "", description = "", duration = 300) => {
  notification[type]({
    message,
    description,
    duration,
    icon: NOTIFICATION[type].icon,
    style: { backgroundColor: NOTIFICATION[type].color },
  });
};

export default Notification;
