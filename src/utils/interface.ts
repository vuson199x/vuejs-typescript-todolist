export interface User {
  id: string;
  name: string;
  accessToken: string;
}

export interface TagInterface {
  id: string;
  name: string;
  user_id: string;
  qas: string[];
}
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

export interface ProductInterface {
  title: string;
  description: string;
  tags: string[];
  url: string;
  id: string;
  category: string;
}

export interface ProductSubmitInterface {
  title: string;
  description: string;
  tags: string[];
  url: string;
  category: string;
  id?: string;
}
