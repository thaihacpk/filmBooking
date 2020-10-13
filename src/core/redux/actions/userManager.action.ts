import { USER_LOGIN } from "./../types/userManager.types";
import { USER_REGISTER } from "./../types/userManager.types";
export const userLoginAction = (payload: any) => {
  return {
    type: USER_LOGIN,
    payload, // name_dataUser
  };
};
export const userRegisterAction = (payload: any) => {
  return {
    type: USER_REGISTER,
    payload, // all_dataUser
  };
};
