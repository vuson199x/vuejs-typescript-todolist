import { SESSION_ID } from "@/utils/contants";

import swal from "sweetalert";
import { LoginInterface, RegisterInterface, UserState } from "../interface";
import AuthServices from "../../ApiService/auth";
import router from "../../router";
import Cookies from "js-cookie";
const state: UserState = {
  user: {
    id: "",
    name: "",
    accessToken: "",
  },
  result: 0,
};
const getters = {};
const mutations = {
  // DO_SOMETHING() {
  //   console.log("Login từ Store123123123");
  // }
};
const actions = {
  getLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    console.log("user", user);
    if (user) {
      state.user = user;
    }
  },
  async login({ commit }: any, crendentials: LoginInterface): Promise<void> {
    try {
      const response = await AuthServices.login({ ...crendentials });
      state.user = response;
      router.push("/");
    } catch (error) {
      swal({
        title: "Lỗi",
        text: error.response.data.message,
        icon: "error",
      });
    }
  },
  async register(
    { commit }: any,
    crendentials: RegisterInterface
  ): Promise<void> {
    try {
      const response = await AuthServices.register({ ...crendentials });
      swal({
        title: "Thành công",
        text: response.message,
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Lỗi",
        text: error.response.data.message,
        icon: "error",
      });
    }
  },
  async logout({ commit }: any): Promise<void> {
    try {
      state.user = {
        id: "",
        name: "",
        accessToken: "",
      };
      localStorage.setItem("user", "");
      Cookies.set(SESSION_ID, "");
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
