import { SESSION_ID } from "@/utils/contants";

import swal from "sweetalert";
import { LoginInterface, RegisterInterface, UserState } from "../interface";
import AuthServices from "../../ApiService/auth";
import router from "../../router";
import Cookies from "js-cookie";
import { Observable } from "rxjs";
const state = {
  user: null,
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
    console.log("user123123123");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log("user", user);
    if (user) {
      state.user = user;
    }
  },
  login({ commit }: any, crendentials: LoginInterface): void {
    const observable = Observable.create((observer: any) => {
      AuthServices.login({ ...crendentials })
        .then((response: any) => {
          observer.next(response);
        })
        .catch((error: any) => {
          swal({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
          });
          observer.error(error);
        });
    });
    observable.subscribe({
      next: (data: any) => {
        state.user = data;
        router.push("/");
      },
    });
  },

  register({ commit }: any, crendentials: RegisterInterface): void {
    const observable = Observable.create((observer: any) => {
      AuthServices.register({ ...crendentials })
        .then((response: any) => {
          observer.next(response.message);
        })
        .catch((error: any) => {
          swal({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
          });
          observer.error(error);
        });
    });
    observable.subscribe({
      next: (data: any) => {
        swal({
          title: "Success",
          text: data,
          icon: "success",
        });
      },
    });
  },
  logout({ commit }: any): void {
    try {
      state.user = null;
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
