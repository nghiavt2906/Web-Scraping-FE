import * as types from "../action_types/user";

const INITIAL_STATE = {
  authenticated: false,
  username: "",
  accessToken: "",
};

const user = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log(payload);
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
    default:
      return state;
  }
};

export default user;
