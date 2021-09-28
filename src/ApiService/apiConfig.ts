import { API_STATUS, BASE_URL_DEV, SESSION_ID } from "@/utils/contants";
import axios from "axios";
import request from "axios";
import Cookies from "js-cookie";

const initialization = () => {
  const instance = axios.create({
    baseURL: BASE_URL_DEV,
    timeout: 20000,
    headers: { "Content-Type": "application/json" },
    // withCredentials: true, //Nếu có cookies sẽ gửi n cùng với từng request
  });
  instance.defaults.headers.common = {
    Authorization: `Bearer ${Cookies.get(SESSION_ID)}`,
  };
  instance.interceptors.request.use(
    async (config) => {
      config.headers.token = Cookies.get(SESSION_ID);
      return config;
    },
    (error) => Promise.reject(error)
  );
  instance.interceptors.response.use((response) => {
    const data = response.data;
    if (
      (data && data.code === API_STATUS.RE_LOGIN) ||
      data.code === API_STATUS.NOT_FOUND
    ) {
      Cookies.set(SESSION_ID, "");
      localStorage.setItem("user", "");
    } else if (data.accessToken) {
      localStorage.setItem("user", JSON.stringify(data));
      Cookies.set(SESSION_ID, data.accessToken);
    }
    // else if (data && data.status !== API_CODE.SUCCESS) {
    //   swal({
    //     title: "Lỗi",
    //     text: data.message || "Đã có lỗi xảy ra! Vui lòng thử lại",
    //     icon: "error"
    //   });
    // }
    return data;
  });
  return instance;
};
export default initialization;
