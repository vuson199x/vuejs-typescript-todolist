import Api from "../ApiService/apiConfig";

export default {
  getList(data: any): Promise<void> {
    console.log("data", data);
    return Api().get(
      `/api/tag/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}&sortName=${data.sortName}&sortType=${data.sortType}`
    );
  },
  deleteTag(id: string): Promise<void> {
    return Api().delete(`/api/tag/delete/${id}`);
  },
  postTag(data: any): Promise<void> {
    return Api().post(`/api/tag/create`, data);
  },
  putTag(payload: any): Promise<void> {
    return Api().put(`/api/tag/update/${payload.id}`, payload.data);
  },
  getListDetail(id: string): Promise<void> {
    return Api().get(`/api/tag/view/${id}`);
  },
};
