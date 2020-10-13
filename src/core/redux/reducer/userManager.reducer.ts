import { USER_LOGIN, USER_REGISTER } from "./../types/userManager.types";

let payload = "";
if (localStorage.getItem("userLogin")) {
  payload = JSON.parse(localStorage.getItem("userLogin") || "{}").taiKhoan;
}

const initialState = {
  user: payload,
};

const userManagerReducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case USER_LOGIN: {
      state.user = action.payload;
      return { ...state };
    }
    case USER_REGISTER: {
      state.user = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default userManagerReducer;
