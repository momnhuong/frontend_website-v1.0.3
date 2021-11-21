import * as types from "./actionTypes";
const initialState = {
  data: null,
  dataSuccess: {},
  dataFailed: {},
  updateProfile: null,
  updateProfileSuccess: {},
  updateProfileFailed: {},
};

export default function getProfile(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_PROFILE:
      return {
        ...state,
        data: action.data,
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        dataSuccess: action.dataSuccess,
      };
    case types.GET_PROFILE_FAILED:
      return {
        ...state,
        dataFailed: action.dataFailed,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        updateProfile: action.updateProfile,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileSuccess: action.updateProfileSuccess,
      };
    case types.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        updateProfileFailed: action.updateProfileFailed,
      };
    default:
      return state;
  }
}
