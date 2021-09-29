export interface UpdateTag {
  id: string;
  name: string;
}
export interface Tag {
  id: string;
  name: string;
  user_id: string;
  qas: string[];
  updatedAt: string;
  createdAt: string;
}

export interface TagList {
  tags: Tag[];
  count: number;
}
