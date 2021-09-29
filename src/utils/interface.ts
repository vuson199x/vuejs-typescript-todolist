export interface ParamsInterface {
  userId?: string;
  page: number;
  size: number;
  sortName: string;
  sortType: string;
  keyword: string;
}

export interface PaginationInterface {
  totalPage: number[];
  currentPage: number;
  limit: number;
}
