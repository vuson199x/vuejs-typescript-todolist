import Api from "@/ApiService/apiConfig";

export default {
  getList(data: any): Promise<void> {
    console.log("data", data);
    return Api().get(
      `/api/qa/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}&sortName=${data.sortName}&sortType=${data.sortType}`
    );
  },
  deleteProduct(id: string): Promise<void> {
    return Api().delete(`/api/qa/delete/${id}`);
  },
  postProduct(data: any): Promise<void> {
    return Api().post(`/api/qa/create`, data);
  },
  putProduct(payload: any): Promise<void> {
    return Api().put(`/api/qa/update/${payload.id}`, payload.data);
  },
  getListDetail(id: string): Promise<void> {
    return Api().get(`/api/qa/view/${id}`);
  },
};
