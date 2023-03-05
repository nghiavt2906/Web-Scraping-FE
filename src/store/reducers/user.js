import * as types from "../action_types/user";

const INITIAL_STATE = {
  authenticated: false,
  username: "",
  accessToken: "",
  submittedReport: null,
};

const user = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        authenticated: true,
      };
    case types.REFRESH_TOKEN:
      return {
        ...state,
        authenticated: true,
        accessToken: payload.accessToken,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE,
      };
    case types.FILE_SUBMIT_SUCCESS:
      return {
        ...state,
        submittedReport: payload,
      };
    default:
      return state;
  }
};

export default user;
