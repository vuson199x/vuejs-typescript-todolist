import { ParamsInterface } from "@/utils/interface";
import Api from "../ApiService/apiConfig";

export default {
  getList(data: ParamsInterface): Promise<void> {
    console.log("data", data);
    return Api().get(
      `/api/category/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}&sortName=${data.sortName}&sortType=${data.sortType}`
    );
  },
  postCategory(data: string): Promise<void> {
    return Api().post(`/api/category/create`, data);
  },
  putCategory(payload: { id: string; data: string }): Promise<void> {
    return Api().put(`/api/category/update/${payload.id}`, payload.data);
  },
  deleteCategory(id: string): Promise<void> {
    return Api().delete(`/api/category/delete/${id}`);
  },
  getListDetail(id: string): Promise<void> {
    return Api().get(`/api/category/view/${id}`);
  },
};
