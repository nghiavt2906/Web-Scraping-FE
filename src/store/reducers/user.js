import * as types from "../action_types/user";

const INITIAL_STATE = {
  authenticated: false,
  username: "",
  accessToken: "",
  submittedReport: null,
  isProcessing: false,
};

const user = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
    case types.REFRESH_TOKEN:
      return {
        ...state,
        ...payload,
        authenticated: true,
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
    case types.TOGGLE_SUBMIT_BUTTON:
      return {
        ...state,
        isProcessing: !state.isProcessing,
      };
    case types.DISABLE_SUBMIT_BUTTON:
      return {
        ...state,
        isProcessing: true,
      };
    case types.ENABLE_SUBMIT_BUTTON:
      return {
        ...state,
        isProcessing: false,
      };
    default:
      return state;
  }
};

export default user;
