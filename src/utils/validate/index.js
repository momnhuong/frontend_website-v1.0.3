import _ from "lodash";
export const isVNMobilePhone = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
export const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;

export const checkVNPhone = (_, value) => {
  if (!value) {
    return Promise.reject();
  }

  if (!isVNMobilePhone.test(value)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(
      "Số điện thoại không hợp lệ hoặc không đúng định dạng"
    );
  }

  return Promise.resolve();
};

export const passwordType = (_, value) => {
  if (!value) {
    return Promise.reject();
  }
  if (!passRegex.test(value)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(
      "Mật khẩu lớn hơn hoặc bằng 8 ký tự, với ít nhất 1 ký tự là số và 1 ký tự đặc biệt"
    );
  }
  return Promise.resolve();
};
