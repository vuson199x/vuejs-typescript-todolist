export interface CategoryInterface {
  id: string;
  name: string;
}

export interface CategoryList {
  categories: CategoryInterface[];
  count: number;
}
