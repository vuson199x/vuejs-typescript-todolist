import Api from "../ApiService/apiConfig";

interface loginInterface {
  username: string;
  password: string;
}

interface registerInterface {
  username: string;
  password: string;
  title: string;
}

export default {
  login(data: loginInterface): any {
    console.log("data", data);
    return Api().post("/api/auth/signin", data);
  },
  register(data: registerInterface): any {
    return Api().post("/api/auth/signup", data);
  },
};
