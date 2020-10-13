import axios from "axios";
import { groupID, token } from "../config/setting";
import { bookTicketAPI, userLoginAPI } from "../config/api.constant";
import { userRegisterAPI } from "./../config/api.constant";

export const postUserLogin = (userLogin: any = {}) => {
  return axios.post(`${userLoginAPI}`, {
    taiKhoan: userLogin.user,
    matKhau: userLogin.password,
  });
};

export const postUserRegister = (userRegister: any = {}) => {
  return axios.post(`${userRegisterAPI}`, {
    taiKhoan: userRegister.user,
    matKhau: userRegister.password,
    email: userRegister.email,
    soDt: userRegister.phoneNumber,
    maNhom: groupID,
    maLoaiNguoiDung: "KhachHang",
    hoTen: userRegister.firstName + userRegister.lastName,
  });
};

export const postUserBookTicket = (ticket: any = {}) => {
  return axios.post(`${bookTicketAPI}`, ticket, {
    headers: { Authorization: "Bearer " + localStorage.getItem(token) },
  },);
};
